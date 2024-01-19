// ======= utils, types ======= //
import { Ticket } from '../types/Ticket.type'
import useRepository from 'src/hooks/useRepositiry';
import transformPrice from 'src/utils/transform-price';

// ======= mui ======= //
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material'

// ======= components ======= //
import AlertMessage from 'src/components/alert-message';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { getTickets } from 'src/app/cart/store/cart.actions';
import { useAppDispatch, useAppSelector } from 'src/storeTypes';
import { ClearIcon } from '@mui/x-date-pickers';
import { getActiveTicketsByUserId, getUser } from '../store/user.action';
import { sessionSelector } from 'src/app/auth/store/auth.selector';

interface Props {
  ticket: Ticket
}
export default function TicketComponent({ ticket }: Props) {

  const totalPrice = transformPrice(ticket.flight.price)
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false)
  const [isLoading, errors, data, fetchData] = useRepository()
  const dispatch = useAppDispatch()
  const session = useAppSelector(sessionSelector)

  const handleAgree = async () => {
    await fetchData(`/ticket/ordered/${ticket.id}`, 'delete')
    dispatch(getUser(session?.id!))
    handleClose()
  }

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
        {
          ticket.status === 'Ordered' ?
            <CardActions>
              <ClearIcon onClick={() => setOpen(true)} />
            </CardActions>
            :
            null
        }

      </Card>
      {errors ? <AlertMessage errorMessage={errors} /> : null}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            delete ticket ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <LoadingButton loading={isLoading} onClick={handleAgree} autoFocus>
            Agree
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
