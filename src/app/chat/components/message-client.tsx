import { Card, CardContent, Typography } from '@mui/material'

interface Props {
    message: string,
    first_name: string,
    last_name: string,
    created_at: string
}

const MessageClient = ({ message, first_name, last_name }: Props) => {
    return (
        <Card sx={{ marginLeft: 'auto', marginBottom: 1, width: '45%' }}>
            <CardContent className='message'>
                <Typography variant='h6' className='message-user' >
                    {first_name}
                </Typography>
                <Typography variant='h6' >
                    {message}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MessageClient