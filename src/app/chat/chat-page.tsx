import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import { useAppSelector } from 'src/storeTypes';
import { sessionSelector } from '../auth/store/auth.selector';
import { Button, Stack, TextField } from '@mui/material';
import MessageAdmin from './components/message-admin';
import MessageClient from './components/message-client';
import { userSelector } from '../user/store/user.selector';

const URL = 'http://localhost:4444';
const token = localStorage.getItem('refresh-token')
const socket = io(URL, {
    extraHeaders: {
        Authorization: `Bearer ${token}`
    }
});

export default function ChatPage() {
    const [messages, setMessages] = useState<any[]>([])
    const [value, setValue] = useState<string>('')
    const [socketErrors, setSocketErrors] = useState('')
    const chatRef = useRef<HTMLDivElement>(null)
    const session = useAppSelector(sessionSelector)
    const user = useAppSelector(userSelector)

    useEffect(() => {
        console.log(session)
        socket.emit('connect-user')
        socket.emit('join-room', { room_id: session?.id })
        socket.emit('get-messages', { room_id: session?.id })
        socket.on('exception', (exception) => {
            setSocketErrors(exception.message)
        })
        socket.on('messages', (messages) => {
            console.log(messages, 'prev message')
            setMessages(messages)
        })
        socket.on('message', (message) => {
            console.log(message)
            setMessages(prev => [...prev, message])
        })
        chatRef.current?.scrollIntoView()
    }, [])
    useEffect(() => {
        chatRef.current?.scrollIntoView() //прокрутка до нового сообщения типо работает но выглядит не супер )) на невысоких устройствах ваще говно
    }, [messages])
    const handleSendMessage = () => {
        const body = {
            message: value,
            first_name: 'asd',
            last_name: 1,
            room_id: session?.id,
            user_id: session?.id,
            created_at: 1
        }
        console.log(body)
        socket.emit('message', body)
        setValue('')
    }
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

    return (
        <Stack className='chat-stack'>
            <Stack className='messages-stack'>
                {messages.map(mes => {
                    return mes.id === session?.id ? <MessageAdmin {...mes} /> : <MessageClient {...mes} />
                })}
                <div ref={chatRef}></div>
            </Stack>
            <Stack direction={'row'} sx={{ margin: 'auto 0 10px', width: '100%', position: 'static' }}>
                <TextField
                    value={value}
                    onChange={handleChangeInput}
                    fullWidth
                    className='whitesmoke'
                    id="message"
                    name="message"
                    placeholder='Enter your message'
                />
                <Button onClick={handleSendMessage} variant='contained' color='primary' sx={{ width: '20%' }}>Send</Button>
            </Stack>
            {socketErrors}
        </Stack>
    )
}
