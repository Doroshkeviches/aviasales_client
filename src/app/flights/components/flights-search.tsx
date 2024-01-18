import { useEffect, useState } from 'react'
import dayjs from 'dayjs';

// ======= store ======= //
import { useAppDispatch, useAppSelector } from 'src/storeTypes'
import { getCities, getFlights } from '../store/flghts.action'
import { citiesErrorsSelector, citiesPendingSelector, citiesSelector, flightsErrorsSelector } from '../store/flights.selector'

// ======= mui ======= //
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Autocomplete, TextField, Button, FormControl, CircularProgress, Typography, Stack } from '@mui/material'

// ======= components ======= //
import AlertMessage from 'src/components/alert-message';
import { searchByOptions } from '../enum/sortedBy.enum';



export default function FlightsSearch() {
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [returnDate, setReturnDate] = useState<Date | null>(null)
    const [from_city, setFrom_city] = useState<string | null>(null)
    const [to_city, setTo_city] = useState<string | null>(null)
    const [validationErrors, setValidationErrors] = useState<string | null>(null)
    const [sortedBy, setSortedBy] = useState<string | null>(searchByOptions[0])

    const dispatch = useAppDispatch()
    const errors_city = useAppSelector(citiesErrorsSelector)
    const pending_city = useAppSelector(citiesPendingSelector)
    const cities = useAppSelector(citiesSelector)
    const errors_flights = useAppSelector(flightsErrorsSelector)
    const tomorrow = dayjs().add(1, 'day');

    useEffect(() => {
        dispatch(getCities())
    }, [])

    if (pending_city) {
        return <CircularProgress />
    }
    const validateSeatch = () => { // кастомная валидация , сомнительно но окей
        setValidationErrors(null)
        if (!startDate) {
            setValidationErrors('start date is required')
            return false
        }
        if (!from_city || !to_city) {
            setValidationErrors('start city and end city are required')

            return false
        }
        if (from_city === to_city) {
            setValidationErrors('start city cannot be same as end city')
            return false
        }
        return true
    }
    const handleGetPath = () => {
        let isReturn = false
        if (returnDate) {
            isReturn = true
        }
        const isValid = validateSeatch()
        if (!isValid) {
            return
        }

        const body = {
            from_city: from_city!,
            to_city: to_city!,
            start_flight_date: startDate!,
            isReturn,
            return_flight_date: returnDate,
            sortedBy
        }
        dispatch(getFlights(body))
    }
    return (
        <>
            <FormControl error={!!validationErrors} className='form-control-search'>
                <Typography variant='h1' className='main'>FLIGHTSSALES</Typography>
                <Typography variant='h3' className='main'>We are here to help you find tickets</Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <Stack className='cities-search-stack'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={cities}
                            renderInput={(params) => <TextField {...params}
                                label="Departure City"
                                placeholder='Pick departure city'
                                InputLabelProps={{ shrink: true }} />}
                            value={from_city}
                            onChange={(event: any, newValue: string | null) => {
                                setFrom_city(newValue);
                            }}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={cities}
                            renderInput={(params) => <TextField {...params}
                                label="Arrival City"
                                placeholder='Pick arrival city'
                                InputLabelProps={{ shrink: true }} />}
                            value={to_city}
                            onChange={(event: any, newValue: string | null) => {
                                setTo_city(newValue);
                            }}
                        />
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            defaultValue={tomorrow.toDate()}
                            onChange={(newValue: Date | null) => setStartDate(newValue)}
                            slotProps={{ textField: { InputLabelProps: { shrink: true }, placeholder: 'Pick start date' } }} />
                        <DatePicker
                            label="Finish date"
                            value={returnDate}
                            onChange={(newValue: Date | null) => setReturnDate(newValue)}
                            slotProps={{ textField: { InputLabelProps: { shrink: true } } }} />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={searchByOptions}
                            renderInput={(params) => <TextField {...params}
                                label="Search by"
                                placeholder='Pick your search parameter'
                                InputLabelProps={{ shrink: true }} />}
                            value={sortedBy}
                            onChange={(event: any, newValue: string | null) => {
                                setSortedBy(newValue);
                            }}
                        />
                    </Stack>
                </LocalizationProvider>

                <Button
                    onClick={handleGetPath} fullWidth sx={{ marginTop: 4 }}
                    variant='contained' color='primary'
                    className='flight-search'>SEARCH
                </Button>

                {validationErrors ? <AlertMessage errorMessage={validationErrors} /> : null}
                {errors_flights ? <AlertMessage errorMessage={errors_flights} /> : null}
                {errors_city ? <AlertMessage errorMessage={errors_city} /> : null}
            </FormControl>
        </>
    )
}