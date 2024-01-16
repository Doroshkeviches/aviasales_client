import { Flight } from "./Flight.type";

export interface Ticket {
    id: string,
    holder_first_name: string,
    holder_last_name: string,
    flight_id: string,
    user_id: string,
    status: string,
    flight: Flight
}