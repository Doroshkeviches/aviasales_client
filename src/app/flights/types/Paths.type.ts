import { Flight } from "./Flight.type";

export interface Paths {
    id: string,
    totalPrice: number,
    from_city: string,
    to_city: string,
    start_date: Date,
    end_date: Date,
    paths: Flight[]
}