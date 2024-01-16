export interface GetFlights {
    from_city: string,
    to_city: string,
    start_flight_date: Date,
    isReturn: boolean,
    return_flight_date: Date | null,
    sortedBy: string | null,
}