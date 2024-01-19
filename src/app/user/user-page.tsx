import { useEffect } from 'react'

// ======= store ======= //
import { useAppDispatch, useAppSelector } from 'src/storeTypes'
import { getActiveTicketsByUserId, getUser, getUserDevices } from './store/user.action'
import { userTicketsSelector, userTicketsErrorsSelector, userTicketsPendingSelector, devicesSelector, userSelector } from './store/user.selector'
import { sessionSelector } from '../auth/store/auth.selector'

// ======= mui ======= //
import { CircularProgress, Container, Stack, Typography } from '@mui/material'

// ======= components ======= //
import AlertMessage from '../../components/alert-message'
import TicketComponent from './components/ticket.component'
import UserDeviceComponent from './components/user-device.component'

export default function UserPage() {
    const session = useAppSelector(sessionSelector)
    const user = useAppSelector(userSelector)
    const user_tickets = useAppSelector(userTicketsSelector)
    const user_tickets_errors = useAppSelector(userTicketsErrorsSelector)
    const user_tickets_pending = useAppSelector(userTicketsPendingSelector)
    const devices = useAppSelector(devicesSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser(session?.id!))
        dispatch(getActiveTicketsByUserId(session?.id!))
        dispatch(getUserDevices())
    }, [])

    return (
        <Container sx={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Stack className='tickets-search-stack'>
                <Typography variant='h1' className='main'>{user?.first_name} {user?.last_name}</Typography>
                {devices.map(device => {
                    return <UserDeviceComponent key={device.id} device={device} />
                })}
                <Stack className='users-stack'>
                    {user_tickets_pending ? <CircularProgress sx={{ position: 'absolute' }} /> : null}
                    {user_tickets.length ? user_tickets.map(ticket => {
                        return <TicketComponent key={ticket.id} ticket={ticket} />
                    })
                        :
                        <Typography variant='h3'>NO TICKETS</Typography>
                    }
                </Stack>
            </Stack>
            {user_tickets_errors ? <AlertMessage errorMessage={user_tickets_errors} /> : null}
        </Container>
    )
}
