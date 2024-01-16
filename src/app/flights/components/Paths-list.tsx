// ======= store ======= //
import { useAppSelector } from 'src/storeTypes'
import { flightsErrorsSelector, flightsPendingSelector, flightsSelector } from '../store/flights.selector'

// ======= mui ======= //
import { CircularProgress, Stack } from '@mui/material'

// ======= components ======= //
import FlightList from './flights-list'
import AlertMessage from 'src/components/alert-message'

export default function PathsList() {
    const errors_flights = useAppSelector(flightsErrorsSelector)
    const pending_flights = useAppSelector(flightsPendingSelector)
    const flights = useAppSelector(flightsSelector)

    if (pending_flights) {
        return <CircularProgress />
    }
    return (
        <>
            {errors_flights ? <AlertMessage errorMessage={errors_flights} /> : null}
            <Stack className='paths-stack'>
                {flights.map((flightList) => {
                    return <FlightList key={flightList.id} flightList={flightList} />
                })}
            </Stack>
        </>
    )
}
