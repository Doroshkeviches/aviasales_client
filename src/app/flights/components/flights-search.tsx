import { useEffect, useState } from 'react'
import dayjs from 'dayjs';

// ======= utils, helpers ======= //
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getCities())
    }, [])

    if (pending_city) {
        return <CircularProgress />
    }
    const validateSeatch = () => { // кастомная валидация 
        setValidationErrors(null)
        if (!startDate) {
            setValidationErrors('Start date is required')
            return false
        }
        if (!from_city || !to_city) {
            setValidationErrors('Start city and end city are required')

            return false
        }
        if (from_city === to_city) {
            setValidationErrors('Start city cannot be same as end city')
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
                <Typography variant='h3' className='main'>{t('flights.title')}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <Stack className='cities-search-stack'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={cities}
                            renderInput={(params) => <TextField {...params}
                                className='whitesmoke'
                                variant='outlined'
                                label={t('flights.departure_city')}
                                placeholder={t('flights.departure_city_placeholder')}
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
                                className="whitesmoke"
                                variant='outlined'
                                label={t('flights.arrival_city')}
                                placeholder={t('flights.arrival_city_placeholder')}
                                InputLabelProps={{ shrink: true }} />}
                            value={to_city}
                            onChange={(event: any, newValue: string | null) => {
                                setTo_city(newValue);
                            }}
                        />
                        <DatePicker
                            label={t('flights.start_date')}
                            className='whitesmoke'
                            sx={{
                                borderColor: 'whitesmoke',
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'whitesmoke',
                                },
                            }}
                            value={startDate}
                            defaultValue={tomorrow.toDate()}
                            onChange={(newValue: Date | null) => setStartDate(newValue)}
                            slotProps={{ textField: { InputLabelProps: { shrink: true }, placeholder: t('flights.start_date_placeholder') } }} />
                        <DatePicker
                            label={t('flights.finish_date')}
                            className='whitesmoke'
                            sx={{
                                borderColor: 'whitesmoke',
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'whitesmoke',
                                },
                            }}
                            value={returnDate}
                            onChange={(newValue: Date | null) => setReturnDate(newValue)}
                            slotProps={{ textField: { InputLabelProps: { shrink: true } } }} />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={searchByOptions}
                            renderInput={(params) => <TextField {...params}
                                label={t('flights.search_by')}
                                className='whitesmoke'
                                placeholder={t('flights.search_placeholder')}
                                InputLabelProps={{ shrink: true }} />}
                            value={sortedBy}
                            onChange={(event: any, newValue: string | null) => {
                                setSortedBy(newValue);
                            }}
                        />
                    </Stack>
                </LocalizationProvider>
                {validationErrors ? <Typography variant='h5' className='red-text'>{validationErrors}</Typography> : null}
                {errors_city ? <Typography variant='h5' className='red-text'>{errors_city}</Typography> : null}

                <Button
                    onClick={handleGetPath} fullWidth sx={{ marginTop: 4 }}
                    variant='contained' color='primary'
                    className='flight-search'>{t('flights.search_button')}
                </Button>
                {errors_flights ? <AlertMessage errorMessage={errors_flights} /> : null}
            </FormControl>
        </>
    )
}