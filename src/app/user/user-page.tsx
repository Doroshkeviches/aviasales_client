import { useEffect } from 'react'

// ======= utils, helpers ======= //
import { useTranslation } from 'react-i18next'

// ======= store ======= //
import { useAppDispatch, useAppSelector } from 'src/storeTypes'
import { getUser, getUserDevices } from './store/user.action'
import { userErrorsSelector, userPendingSelector, devicesSelector, userSelector } from './store/user.selector'
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
    const user_errors = useAppSelector(userErrorsSelector)
    const user_pending = useAppSelector(userPendingSelector)
    const devices = useAppSelector(devicesSelector)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(getUser(session?.id!))
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
                    {user_pending ? <CircularProgress sx={{ position: 'absolute' }} /> : null}
                    {user?.tickets.length ? user?.tickets.map(ticket => {
                        return <TicketComponent key={ticket.id} ticket={ticket} />
                    })
                        :
                        <Typography variant='h3' className='main'>{t('profile.no_tickets')}</Typography>
                    }
                </Stack>
            </Stack>
            {user_errors ? <AlertMessage errorMessage={user_errors} /> : null}
        </Container>
    )
}
