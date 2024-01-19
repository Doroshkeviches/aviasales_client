import { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signout } from './utils/signout';

// ======= store ======= //
import { signin, signup } from './store/auth.actions';
import { sessionErrorsSelector, sessionPendingSelector, sessionSelector } from './store/auth.selector';
import { useAppDispatch, useAppSelector } from 'src/storeTypes';

// ======= mui ======= //
import { CircularProgress, Container, IconButton, Stack, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// ======= components ======= //
import AlertMessage from '../../components/alert-message';
import { RoutesConstant } from 'src/constants/RoutesConstants.enum';
import FormWrapper from './components/form-wrapper';
import { password_regular } from './utils/password-reg';
import { FormError } from './utils/forms-errors.enum';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const errors = useAppSelector(sessionErrorsSelector)
    const pending = useAppSelector(sessionPendingSelector)
    const session = useAppSelector(sessionSelector)
    const navigate = useNavigate();
    const min_name_lenght = 2

    useEffect(() => {
        if (session) {
            signout(dispatch)
        }
    }, [])

    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .email(FormError.invalid_email)
            .required(FormError.required),
        password: Yup.string()
            .required(FormError.required_password)
            .matches(
                password_regular,
                FormError.simple_password
            ),
        first_name: Yup.string().required(FormError.no_first_name).min(min_name_lenght),
        last_name: Yup.string().required(FormError.no_last_name).min(min_name_lenght)


    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            first_name: '',
            last_name: ''
        },
        validationSchema: SigninSchema,
        onSubmit: async (value) => {
            const result = await dispatch(signup(value)).unwrap()
            if (result) {
                navigate(RoutesConstant.flights)
            }
        },
    });

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const handleNavigateToForgetPassword = () => {
        navigate(RoutesConstant.forget_password)
    }

    const handleNavigateToSignIn = () => {
        navigate(RoutesConstant.sign_in)
    }
    return (
        <Container className='auth'>
            <Stack className='auth-stack'>
                <FormWrapper onSubmit={formik.handleSubmit}>
                    <Typography variant='h1' className='main'>SIGN UP</Typography>
                    <TextField
                        className='whitesmoke'
                        variant='outlined'
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
                    <TextField
                        className='whitesmoke'
                        variant='outlined'
                        fullWidth
                        id="first_name"
                        name="first_name"
                        label="first_name"
                        placeholder='Enter your first_name'
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                    />
                    <TextField
                        className='whitesmoke'
                        variant='outlined'
                        fullWidth
                        id="last_name"
                        name="last_name"
                        label="last_name"
                        placeholder='Enter your last_name'
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && formik.errors.last_name}
                    />
                    <TextField
                        className='whitesmoke'
                        variant='outlined'
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        placeholder='Enter your password'
                        InputLabelProps={{ shrink: true }}
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>,
                        }}
                    />
                    <Typography variant="h5" className='forget-password' onClick={handleNavigateToForgetPassword}>Forgot password?</Typography>
                    {/* <Typography variant="h5" className='forget-password' onClick={handleNavigateToSignUp}>Have an account? Log in</Typography> */}
                    <LoadingButton loading={pending} loadingIndicator={<CircularProgress />} variant="contained" fullWidth type="submit" sx={{ height: 50 }}>
                        SIGN UP
                    </LoadingButton>
                    <Typography variant="h5" className='personal-info' onClick={handleNavigateToSignIn}>Have an account? Sign in!</Typography>
                </FormWrapper>
                {errors ? <AlertMessage errorMessage={errors} /> : null}
            </Stack>
        </Container>
    )
}
