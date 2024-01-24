import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import { useAppSelector } from 'src/storeTypes';
import { sessionSelector } from '../auth/store/auth.selector';
import { Button, Stack, TextField } from '@mui/material';
import MessageAdmin from './components/message-admin';
import MessageClient from './components/message-client';
import AlertMessage from 'src/components/alert-message';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    useEffect(() => {
        socket.emit('connect-user')
        socket.emit('join-room', { room_id: session?.id })
        socket.emit('get-messages', { room_id: session?.id })
        socket.on('exception', (exception) => {
            setSocketErrors(exception.message)
        })
        socket.on('messages', (messages) => {
            setMessages(messages)
        })
        socket.on('message', (message) => {
            setMessages(prev => [...prev, message])
        })
        chatRef.current?.scrollIntoView()
    }, [])

    useEffect(() => {
        chatRef.current?.scrollIntoView() //прокрутка до нового сообщения типо работает но выглядит не супер )) на невысоких устройствах ваще говно
    }, [messages])

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault()
        setSocketErrors('')
        const body = {
            message: value,
            room_id: session?.id,
            user_id: session?.id,
        }
        socket.emit('message', body)
        setValue('')
    }
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

    return (
        <Stack className='chat-stack'>
            <Stack className='messages-stack'>
                {messages.map(mes => {
                    return mes.user_id === session?.id ? <MessageClient {...mes} key={mes.id} /> : <MessageAdmin {...mes} key={mes.id} />
                })}
                <Stack ref={chatRef}></Stack>
            </Stack>
            <form onSubmit={handleSendMessage} style={{ margin: 'auto 0 10px', width: '100%', position: 'static' }}>
                <Stack direction={'row'}>
                    <TextField
                        value={value}
                        onChange={handleChangeInput}
                        fullWidth
                        className='whitesmoke'
                        id="message"
                        name="message"
                        placeholder={t('chat.message_placeholder')}
                    />
                    <Button type='submit' variant='contained' color='primary' sx={{ width: '30%', boxSizing: 'border-box' }}>
                        {t('chat.send_button')}
                    </Button>

                </Stack></form>
            {socketErrors ? <AlertMessage errorMessage={socketErrors} /> : null}
        </Stack>
    )
}
