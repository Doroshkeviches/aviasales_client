// import { Ticket } from "./Ticket.type";
import { Plane } from "./Plane.type";
import { City } from "./City.type";

export interface Flight {
    id: string,
    from_city_id: string,
    to_city_id: string,
    from_city: City,
    to_city: City,
    start_flight_date: Date,
    end_flight_date: Date,
    status: string,
    price: number,
    available_seats: number,
    plane: Plane,
    plane_id: string,
}