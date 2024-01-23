import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { useAppSelector } from 'src/storeTypes';
import { sessionSelector } from '../auth/store/auth.selector';

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
        <div>
            {messages.map(mes => {
                return <div>{mes.message}</div>
            })}
        </div>
    )
}
