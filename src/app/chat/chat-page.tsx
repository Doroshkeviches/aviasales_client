import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { useAppSelector } from 'src/storeTypes';
import { sessionSelector } from '../auth/store/auth.selector';
import { Button, Stack, TextField } from '@mui/material';
import MessageAdmin from './components/message-admin';
import MessageClient from './components/message-client';
// import { messages } from './mock-messages';

const URL = 'http://localhost:4444';
const token = localStorage.getItem('refresh-token')
const socket = io(URL, {
    extraHeaders: {
        Authorization: `Bearer ${token}`
    }
});

export default function ChatPage() {
    const [messages, setMessages] = useState<any[]>([])
    const session = useAppSelector(sessionSelector)
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
    return (
        <Stack className='chat-stack'>
            <Stack className='messages-stack'>
                {messages.map(mes => {
                    return mes.id === 'Admin' ? <MessageAdmin {...mes} /> : <MessageClient {...mes} />
                })}
            </Stack>
            <Stack direction={'row'} sx={{ margin: 'auto 0 10px', width: '100%', position: 'static' }}>
                <TextField
                    fullWidth
                    className='whitesmoke'
                    id="message"
                    name="message"
                    placeholder='Enter your message'
                />
                <Button variant='contained' color='primary' sx={{ width: '20%' }}>Send</Button>
            </Stack>
        </Stack>
    )
}
