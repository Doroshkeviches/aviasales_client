import { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signout } from 'src/utils/signout';

// ======= store ======= //
import { signin } from './store/auth.actions';
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

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const errors = useAppSelector(sessionErrorsSelector)
    const pending = useAppSelector(sessionPendingSelector)
    const session = useAppSelector(sessionSelector)
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            signout(dispatch)
        }
    }, [])

    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .required('No password provided.')
            .matches(
                password_regular,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),

    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: SigninSchema,
        onSubmit: async (value) => {
            const result = await dispatch(signin(value)).unwrap()
            if (result) {
                navigate(RoutesConstant.flights)
            }
        },
    });

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const handleNavigate = () => {
        navigate(RoutesConstant.forget_password)
    }
    const handleNavigateToSignUp =()=> {
        navigate(RoutesConstant.sign_up)
    }

    return (
        <Container className='auth'>
            <Stack className='auth-stack'>
                <FormWrapper onSubmit={formik.handleSubmit}>
                    <Typography variant='h1' className='main'>SIGN IN</Typography>
                    <TextField
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
                    <Typography variant="h5" className='forget-password' onClick={handleNavigate}>Forgot password?</Typography>
                    <LoadingButton loading={pending} loadingIndicator={<CircularProgress />} variant="contained" fullWidth type="submit" sx={{ height: 50 }}>
                        SIGN IN
                    </LoadingButton>
                    <Typography variant="h5" className='personal-info' onClick={handleNavigateToSignUp}>Don't have an account? Sign Up!</Typography>
                </FormWrapper>
                {errors ? <AlertMessage errorMessage={errors} /> : null}
            </Stack>
        </Container>
    )
}
