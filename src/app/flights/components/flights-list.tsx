// ======= utils, types ======= //
import { Flight } from '../types/Flight.type'
import { Paths } from '../types/Paths.type'
import transformDate from 'src/utils/transform-date'

// ======= mui ======= //
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Stack, Typography } from '@mui/material'

// ======= components ======= //
import FlightItem from './flight-item'
import transformPrice from 'src/utils/transform-price';
interface Props {
    flightList: Paths
}

export default function FlightsList({ flightList }: Props) {
    const [start_date, start_time, end_date, end_time] = transformDate(flightList)
    const totalPrice = transformPrice(flightList.totalPrice)

    return (
        <>
            <Stack direction='row' className='flights-element-stack'>
                <Stack className='price-stack' gap={3}>
                    <Typography variant='h1'>{totalPrice}</Typography>
                    {/* <Button variant='contained' color='success'>BUY</Button> */}
                </Stack>
                <Stack direction='row' className='path-stack'>
                    <Stack alignItems={'center'} textAlign={'center'}>
                        <Typography variant='h2'>{start_time}</Typography>
                        <Typography variant='h5'>{start_date}</Typography>
                        <Typography variant='h5'>{flightList.from_city}</Typography>
                    </Stack>
                    <Stack direction='column' className='path-stack-outlook'>
                        <Stack direction={'row'} justifyContent={'space-between'} sx={{ marginBottom: '2px' }}>
                            <FlightTakeoffIcon />
                            <FlightLandIcon />
                        </Stack>
                        <Stack direction='row' className='path-transfers-stack'>
                            {flightList.paths.map((flight: Flight) => {
                                return <FlightItem key={flight.id} flight={flight} />
                            })}
                        </Stack>
                    </Stack>
                    <Stack alignItems={'center'} textAlign={'center'}>
                        <Typography variant='h2'>{end_time}</Typography>
                        <Typography variant='h5'>{end_date}</Typography>
                        <Typography variant='h5'>{flightList.to_city}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}
