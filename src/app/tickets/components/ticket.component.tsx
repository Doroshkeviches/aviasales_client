import { useState } from 'react'

// ======= utils, types ======= //
import { Ticket } from '../types/Ticket.type'
import useRepository from 'src/hooks/useRepositiry';
import { ticket_status_enum } from '../helpers/ticket-status.enum';
import transformPrice from 'src/utils/transform-price';

// ======= mui ======= //
import { Card, CardContent, Typography, CardActions, Button, CircularProgress, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// ======= components ======= //
import AlertMessage from 'src/components/alert-message';

interface Props {
  ticket: Ticket
}
export default function TicketComponent({ ticket }: Props) {
  const [ticketItem, setTicketItem] = useState<Ticket>(ticket)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [selectItem, setSelectItem] = useState<string>(ticket.status)
  const [isLoading, errors, data, fetchData] = useRepository()

  const handleSubmit = async () => {
    const body = { id: ticket.id, status: selectItem }
    const updatedTicket = await fetchData('/ticket/updateStatus', 'put', body)
    setTicketItem(updatedTicket)
    setIsDisabled(true)
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    setSelectItem(e.target.value)
  }

  const totalPrice = transformPrice(ticket.flight.price)

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
          <Select
            disabled={isDisabled}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectItem}
            className='ticket-status-select'
            onChange={handleSelectChange}
            sx={{ marginTop: 2 }}
          >
            {ticket_status_enum.map(item => {
              return <MenuItem key={item} value={item}>{item}</MenuItem>
            })}
          </Select>
        </CardContent>
        <CardActions>
          {isDisabled ?
            <ModeEditIcon onClick={() => setIsDisabled(false)} />
            :
            <Button onClick={handleSubmit} variant='contained' color='success' fullWidth type="submit">
              {isLoading ? <CircularProgress /> : 'SUBMIT'}
            </Button>
          }
        </CardActions>
      </Card>
      {errors ? <AlertMessage errorMessage={errors} /> : null}
    </>
  )
}
