import { useState } from 'react';

// ======= utils, types ======= //
import { Ticket } from '../types/Ticket.type'
import useRepository from 'src/hooks/useRepositiry';
import transformPrice from 'src/utils/transform-price';

// ======= store ======= //
import { useAppDispatch, useAppSelector } from 'src/storeTypes';
import { getUser } from '../store/user.action';
import { sessionSelector } from 'src/app/auth/store/auth.selector';

// ======= mui ======= //
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { ClearIcon } from '@mui/x-date-pickers';

// ======= components ======= //
import AlertMessage from 'src/components/alert-message';
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
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: 20 }}>
            Delete ticket from cart ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleClose} variant='contained' color='success' className='disagreeBtn'>Disagree</Button>
          <LoadingButton loading={isLoading} variant='contained' color='error' onClick={handleAgree} autoFocus>
            Agree
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
