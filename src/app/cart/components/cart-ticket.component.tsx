import { Ticket } from '../types/Ticket.type'
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import useRepository from 'src/hooks/useRepositiry';
import { useAppDispatch } from 'src/storeTypes';
import { getTickets } from '../store/cart.actions';
import { LoadingButton } from '@mui/lab';
import AlertMessage from 'src/components/alert-message';
interface Props {
    ticket: Ticket
}
export default function CartTicketComponent({ ticket }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => setOpen(false)
    const [isLoading, errors, data, fetchData] = useRepository()
    const dispatch = useAppDispatch()
    const handleAgree = async () => {
        await fetchData(`/ticket/${ticket.id}`, 'delete')
        dispatch(getTickets())
        handleClose()
    }
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
                    <Typography variant='h5' paddingTop={'3px'}>
                        TO: {ticket.status}
                    </Typography>
                </CardContent>
                <CardActions>
                    <ClearIcon onClick={() => setOpen(true)} />
                </CardActions>
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
