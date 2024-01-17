import { useEffect } from 'react'

// ======= store ======= //
import { useAppDispatch, useAppSelector } from 'src/storeTypes'
import { getUser } from './store/user.action'
import { userSelector, userErrorsSelector, userPendingSelector } from './store/user.selector'
import { sessionSelector } from '../auth/store/auth.selector'

// ======= mui ======= //
import { CircularProgress, Container, Stack, Typography } from '@mui/material'

// ======= components ======= //
import AlertMessage from '../../components/alert-message'
import TicketComponent from './components/ticket.component'

export default function UserPage() {
    const session = useAppSelector(sessionSelector)
    const user = useAppSelector(userSelector)
    const user_errors = useAppSelector(userErrorsSelector)
    const user_pending = useAppSelector(userPendingSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser(session?.id!))
    }, [])

    return (
        <Container sx={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Stack className='tickets-search-stack'>
                <Typography variant='h1' className='main'>{user?.first_name} {user?.last_name}</Typography>
                <Stack className='users-stack'>
                    {user_pending ? <CircularProgress sx={{ position: 'absolute' }} /> : null}
                    {user?.tickets.length ? user?.tickets.map(ticket => {
                        return <TicketComponent key={ticket.id} ticket={ticket} />
                    })
                        :
                        <div>No tickets</div>
                    }
                </Stack>
            </Stack>
            {user_errors ? <AlertMessage errorMessage={user_errors} /> : null}
        </Container>
    )
}
