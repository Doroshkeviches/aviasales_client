// ======= types ======= //
import transformPrice from 'src/utils/transform-price'
import { Flight } from '../types/Flight.type'

// ======= mui ======= //
import { Card, CardContent, Stack, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation();
  
  const totalPrice = transformPrice(flight.price)
  
  return (
    <Stack direction='row' className='plane-icon-stack'>
      <Tooltip color="inherit" placement="top" title={
        <Card className='flight-card'>
          <CardContent className='card-content'>
          <Typography variant='h4'>{t('flight.from')}: {flight.from_city.title}</Typography>
            <Typography variant='h4'>{t('flight.to')}: {flight.to_city.title}</Typography>
            <Typography variant='h4'>{t('flight.start')}: {start_date}</Typography>
            <Typography variant='h4'>{t('flight.end')}: {end_date}</Typography>
            <Typography variant='h4'>{t('flight.plane')}: {flight.plane.title}</Typography>
            <Typography variant='h4'>{t('flight.available_seats')}: {flight.available_seats}</Typography>
            <Typography variant='h4'>{t('flight.price')}: {totalPrice}</Typography>
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
