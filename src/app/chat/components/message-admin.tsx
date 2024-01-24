import { Card, CardContent, Typography } from '@mui/material'
import transformDate from 'src/utils/transform-date'

interface Props {
    message: string,
    first_name: string,
    last_name: string,
    created_at: Date
}

const MessageAdmin = ({ message, first_name, last_name, created_at }: Props) => {
    const [date, time] = transformDate({ date: created_at })

    return (
        <Card sx={{ marginRight: 'auto', marginBottom: 1, width: '45%' }}>
            <CardContent className='message' sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' className='message-user' >
                    {first_name}
                </Typography>
                <Typography variant='h4'>
                    {message}
                </Typography>
                <Typography variant='t6' sx={{ alignSelf: 'end' }} >
                    {date + ' ' + time}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MessageAdmin