import { ChangeEvent, useEffect, useState } from 'react'
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

    const session = useAppSelector(sessionSelector)
    const user = useAppSelector(userSelector)

    useEffect(() => {
        console.log(session)
        socket.emit('connect-user')
        socket.emit('join-room', { room_id: session?.id })
        socket.emit('get-messages', { room_id: session?.id })

        socket.on('messages', (messages) => {
            console.log(messages, 'prev message')
            setMessages(messages)
        })
        socket.on('message', (message) => {
            setMessages(prev => [...prev, message])
        })
    }, [])

    const handleSendMessage = () => {
        const body = {
            message: value,
            first_name: user?.first_name,
            last_name: user?.last_name,
            room_id: session?.id,
            user_id: session?.id,
            created_at: Date.now()
        }
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
        </Stack>
    )
}
