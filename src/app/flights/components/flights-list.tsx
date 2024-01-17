// ======= utils, types ======= //
import { Flight } from '../types/Flight.type'
import { Paths } from '../types/Paths.type'
import transformDate from 'src/utils/transform-date'

// ======= mui ======= //
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Button, Fade, Modal, Stack, TextField, Typography } from '@mui/material'

import * as Yup from 'yup'

// ======= components ======= //
import FlightItem from './flight-item'
import transformPrice from 'src/utils/transform-price';
import { useState } from 'react';
import { useFormik } from 'formik';
import { signin } from 'src/app/auth/store/auth.actions';
import { RoutesConstant } from 'src/constants/RoutesConstants.enum';
import { useNavigate } from 'react-router';
import FormWrapper from 'src/app/auth/components/form-wrapper';
interface Props {
    flightList: Paths
}

export default function FlightsList({ flightList }: Props) {
    const [start_date, start_time, end_date, end_time] = transformDate(flightList)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const totalPrice = transformPrice(flightList.totalPrice)

    const SigninSchema = Yup.object().shape({
        holder_first_name: Yup.string().required('Required'),
        holder_last_name: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            holder_first_name: '',
            holder_last_name: '',
        },
        validationSchema: SigninSchema,
        onSubmit: async (value) => {
            console.log({ ...value, flights: flightList.paths.map(it => it.id) })
        },
    });

    return (
        <>
            <Stack direction='row' className='flights-element-stack'>
                <Stack className='price-stack' gap={3}>
                    <Typography variant='h1'>{totalPrice}</Typography>
                    <Button variant='contained' onClick={handleOpen} color='success'>BUY</Button>
                    <Modal
                        aria-labelledby="spring-modal-title"
                        aria-describedby="spring-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                    >
                        <Fade in={open} >
                            <div style={{
                                position: 'absolute', backgroundColor: 'white', top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                padding: 50
                            }}>
                                <FormWrapper onSubmit={formik.handleSubmit}>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id="holder_first_name"
                                        name="holder_first_name"
                                        label="holder_first_name"
                                        placeholder='Enter your holder_first_name'
                                        InputLabelProps={{ shrink: true }}
                                        value={formik.values.holder_first_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.holder_first_name && Boolean(formik.errors.holder_first_name)}
                                        helperText={formik.touched.holder_first_name && formik.errors.holder_first_name}
                                    />
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id="holder_last_name"
                                        name="holder_last_name"
                                        label="holder_last_name"
                                        placeholder='Enter your holder_last_name'
                                        InputLabelProps={{ shrink: true }}
                                        value={formik.values.holder_last_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.holder_last_name && Boolean(formik.errors.holder_last_name)}
                                        helperText={formik.touched.holder_last_name && formik.errors.holder_last_name}
                                    />
                                    <Button type="submit">create offer</Button>
                                </FormWrapper>

                            </div>
                        </Fade>
                    </Modal>
                </Stack>
                <Stack direction='row' className='path-stack'>
                    <Stack alignItems={'center'} textAlign={'center'}>
                        <Typography variant='h2'>{start_time}</Typography>
                        <Typography variant='h5'>{start_date}</Typography>
                        <Typography variant='h5'>{flightList.from_city}</Typography>
                    </Stack>
                    <Stack direction='column' className='path-stack-outlook'>
                        <Stack direction={'row'} justifyContent={'space-between'} sx={{ marginBottom: '2px' }}>
                            <FlightTakeoffIcon />
                            <FlightLandIcon />
                        </Stack>
                        <Stack direction='row' className='path-transfers-stack'>
                            {flightList.paths.map((flight: Flight) => {
                                return <FlightItem key={flight.id} flight={flight} />
                            })}
                        </Stack>
                    </Stack>
                    <Stack alignItems={'center'} textAlign={'center'}>
                        <Typography variant='h2'>{end_time}</Typography>
                        <Typography variant='h5'>{end_date}</Typography>
                        <Typography variant='h5'>{flightList.to_city}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}
