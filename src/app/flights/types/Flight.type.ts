export interface Flight {
    id: string;
    from_city_id: string;
    to_city_id: string;
    start_flight_date: Date;
    end_flight_date: Date;
    status: string
    price: number
    available_seats: number
    plane_id: string
    from_city: {
        id: string,
        title: string
    },
    to_city: {
        id: string,
        title: string
    },
    plane: {
        id: string,
        title: string,
        seats: number
    }
}