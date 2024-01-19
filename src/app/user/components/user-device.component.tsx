import React from 'react'
import { Device } from '../types/Device.type'
import { Button, Stack, Typography } from '@mui/material'
import useRepository from 'src/hooks/useRepositiry'
import { useAppDispatch } from 'src/storeTypes'
import { getUserDevices } from '../store/user.action'
interface Props {
    device: Device
}
export default function UserDeviceComponent({ device }: Props) {
    const [isLoading, errors, data, fetchData] = useRepository()
    const dispatch = useAppDispatch()
    const handleDeleteSelectDevice = async () => {
        const body = { device_id: device.device_id }
        const res = await fetchData('/devices/signout-selected-session', 'post', body)
        if (res.data) {
            dispatch(getUserDevices())
        }
    }
    return (
        <Stack direction='row' alignItems='center' gap={3}>
            <Typography variant='h4' className='main'>DEVICE: {device.id}</Typography>
            <Button variant='contained' color='error' onClick={handleDeleteSelectDevice}>delete</Button>
        </Stack>
    )
}
