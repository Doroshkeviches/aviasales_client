import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "src/storeTypes"
import { getTickets } from "./store/cart.actions"
import { cartTicketsErrorsSelector, cartTicketsPendingSelector, cartTicketsSelector } from "./store/cart.selector"
import CartTicketComponent from "./components/cart-ticket.component"
import { LoadingButton } from "@mui/lab"
import useRepository from "src/hooks/useRepositiry"

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
            {tickets.length ? tickets?.map(it => {
                return <CartTicketComponent ticket={it} />
            })
                :
                <div>NO TICKETS IN CART</div>}
            <LoadingButton loading={isLoading} disabled={!tickets.length} onClick={handleCreateOrder}>Create Order</LoadingButton>
        </>
    )
}
