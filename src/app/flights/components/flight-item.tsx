// ======= types ======= //
import { Flight } from '../types/Flight.type'

// ======= mui ======= //
import { Card, CardContent, Stack, Tooltip, Typography } from '@mui/material'

interface Props {
  flight: Flight
}
const transform_flight_date_to_date = (date: Date) => {
  const new_date = new Date(date.valueOf()).toLocaleString()
  return new_date
}
export default function FlightItem({ flight }: Props) {

  const start_date = transform_flight_date_to_date(flight.start_flight_date)
  const end_date = transform_flight_date_to_date(flight.end_flight_date)

  return (
    <Stack direction='row' className='plane-icon-stack'>
      <Tooltip color="inherit" placement="top" title={
        <Card className='flight-card'>
          <CardContent className='card-content'>
            <Typography variant='h4'>From: {flight.from_city.title}</Typography>
            <Typography variant='h4'>To: {flight.to_city.title}</Typography>
            <Typography variant='h4'>Start: {start_date}</Typography>
            <Typography variant='h4'>End: {end_date}</Typography>
            <Typography variant='h4'>Plane: {flight.plane.title}</Typography>
            <Typography variant='h4'>Available Seats: {flight.available_seats}</Typography>
            <Typography variant='h4'>Price: {flight.price}</Typography>
          </CardContent>
        </Card>
      }>
        <Stack sx={{ width: "100%", alignItems: 'center', gap: 0.2 }}>
          <Stack className='elem-transfer-path'>
          </Stack>
        </Stack>
      </Tooltip >
    </Stack >
  )
}
