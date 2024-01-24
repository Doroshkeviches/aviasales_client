import { Card, CardContent, Typography } from '@mui/material'

interface Props {
    id: string,
    message: string,
    first_name: string,
    last_name: string,
    created_at?: string
}

const MessageAdmin = ({ message, first_name, last_name, id, created_at }: Props) => {
    return (
        <Card sx={{ marginRight: 'auto', marginBottom: 1, width: '45%' }}>
            <CardContent className='message'>
                <Typography variant='h6'  className='message-user' >
                    {id}
                </Typography>
                <Typography variant='h6' >
                    {message}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MessageAdmin