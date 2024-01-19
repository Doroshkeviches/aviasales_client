// ======= utils, types ======= //
import { Ticket } from '../types/Ticket.type'
import useRepository from 'src/hooks/useRepositiry';
import transformPrice from 'src/utils/transform-price';

// ======= mui ======= //
import { Card, CardContent, Typography } from '@mui/material'

// ======= components ======= //
import AlertMessage from 'src/components/alert-message';

interface Props {
  ticket: Ticket
}
export default function TicketComponent({ ticket }: Props) {
  const [isLoading, errors, data, fetchData] = useRepository()

  const totalPrice = transformPrice(ticket.flight.price)

  const ticketStatusColor = ticket.status === 'Ordered' ? 'blue-text' : ticket.status === 'Canceled' ? 'red-text' : 'green-text'

  return (
    <>
      <Card className='ticket-card'>
        <CardContent>
          <Typography variant='h2' >
            {ticket.holder_first_name} {ticket.holder_last_name}
          </Typography>
          <Typography variant='h5' paddingTop={'3px'}>
            FROM: {ticket.flight.from_city.title}
          </Typography>
          <Typography variant='h5' paddingTop={'3px'}>
            TO: {ticket.flight.to_city.title}
          </Typography>
          <Typography variant="h5" paddingTop={'3px'}>
            PRICE: {totalPrice}
          </Typography>
          <Typography variant="h5" paddingTop={'3px'} className={ticketStatusColor}>
            STATUS: {ticket.status}
          </Typography>
        </CardContent>
      </Card >
      {errors ? <AlertMessage errorMessage={errors} /> : null}
    </>
  )
}
