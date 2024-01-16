import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router';

// ======= store ======= //
import { forgotPassword } from './store/auth.actions';
import { useAppDispatch, useAppSelector } from 'src/storeTypes';
import { resetTokenErrorsSelector, resetTokenPendingSelector } from './store/auth.selector';

// ======= mui ======= //
import { Button, CircularProgress, Container, Stack, TextField, Typography } from '@mui/material';

// ======= components ======= //
import AlertMessage from '../../components/alert-message';
import { RoutesConstant } from 'src/constants/RoutesConstants.enum';
import FormWrapper from './components/form-wrapper';


export default function ForgorPasswordPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const pending = useAppSelector(resetTokenPendingSelector)
    const errors = useAppSelector(resetTokenErrorsSelector)

    const SigninSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: SigninSchema,
        onSubmit: async (value) => {
            const result = await dispatch(forgotPassword(value)).unwrap()
            if (result) {
                sessionStorage.setItem('reset-token', result.token)
                navigate(RoutesConstant.reset_link)
            }
        },
    });


    return (
        <Container className='auth'>
            <Stack className='auth-stack'>
                <FormWrapper onSubmit={formik.handleSubmit}>
                    <Typography variant='h1' className='main'>ENTER YOUR EMAIL</Typography>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        placeholder='Enter your email'
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        {pending ? <CircularProgress /> : 'CONTINUE'}
                    </Button>
                    {errors ? <AlertMessage errorMessage={errors} /> : null}
                </FormWrapper>
            </Stack>
        </ Container>
    )
}
