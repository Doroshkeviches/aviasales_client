import { useEffect } from "react"
import useRepository from "src/hooks/useRepositiry"

// ======= store ======= //
import { useAppDispatch, useAppSelector } from "src/storeTypes"
import { getTickets } from "./store/cart.actions"
import { cartTicketsErrorsSelector, cartTicketsPendingSelector, cartTicketsSelector } from "./store/cart.selector"

// ======= mui ======= //
import { CircularProgress, Stack, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"

// ======= components ======= //
import CartTicketComponent from "./components/cart-ticket.component"
import AlertMessage from "src/components/alert-message"

export default function CartPage() {
    const dispatch = useAppDispatch()
    const tickets = useAppSelector(cartTicketsSelector)
    const cart_errors = useAppSelector(cartTicketsErrorsSelector)
    const cart_pending = useAppSelector(cartTicketsPendingSelector)
    const [isLoading, errors, data, fetchData] = useRepository()

    useEffect(() => {
        dispatch(getTickets())
    }, [])
    const handleCreateOrder = async () => {
        const res = await fetchData('/ticket/ordered', 'post')
        if (res.data) {
            dispatch(getTickets())
        }
    }
    return (
        <>
            <Stack className='users-stack'>
                {cart_pending ? <CircularProgress sx={{ position: 'absolute' }} /> : null}
                {tickets.length ? tickets?.map(it => {
                    return <CartTicketComponent key={it.id} ticket={it} />
                })
                    :
                    <Typography variant='h3'>NO TICKETS IN CART</Typography>}
                <LoadingButton loading={isLoading} variant="contained" disabled={!tickets.length} onClick={handleCreateOrder}>Create Order</LoadingButton>
            </Stack>
            {cart_errors ? <AlertMessage errorMessage={cart_errors} /> : null}
        </>
    )
}
