// ======= utils, types ======= //
import { User } from '../types/User.type'
import { useNavigate } from 'react-router'

// ======= mui ======= //
import { Card, CardContent, Typography, CardActions } from '@mui/material'
import { RoutesConstant } from 'src/constants/RoutesConstants.enum'
interface Props {
  user: User
}

export default function UserCard({ user }: Props) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(RoutesConstant.user_id)
  }

  return (
    <>
      <Card className='user-card'>
        <CardContent>
          <Typography variant='h2'>
            {user.last_name} {user.first_name}
          </Typography>
          <Typography variant='h5' paddingTop={'3px'}>
            Email: {user.email}
          </Typography>
          <Typography variant="h5" paddingTop={'3px'}>
            Tickets purchaced: {user.tickets.length}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: "16px" }}>
          <Typography variant="h5" className='personal-info' onClick={handleNavigate}>
            Watch Personal Info
          </Typography>
        </CardActions>
      </Card>
    </>
  )
}
