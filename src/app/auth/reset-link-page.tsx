import { useNavigate } from 'react-router';

// ======= store ======= //
import { useAppDispatch, useAppSelector } from 'src/storeTypes';
import { resetTokenErrorsSelector, resetTokenPendingSelector } from './store/auth.selector';

// ======= mui ======= //
import { Button, CircularProgress, Container, Stack, Typography } from '@mui/material';

// ======= components ======= //
import AlertMessage from '../../components/alert-message';
import { RoutesConstant } from 'src/constants/RoutesConstants.enum';
import FormWrapper from './components/form-wrapper';


export default function ResetLinkPage() {
    const navigate = useNavigate()
    // const dispatch = useAppDispatch()
    const pending = useAppSelector(resetTokenPendingSelector)
    const errors = useAppSelector(resetTokenErrorsSelector)
    const Link = sessionStorage.getItem('reset-token')
    
    const navigateLink = ()=> {
        navigate(RoutesConstant.reset_password)
    }


    return (
        <Container className='auth'>
            <Stack className='auth-stack'>
                <FormWrapper onSubmit={navigateLink}>
                    <Typography variant='h1' className='main'>{Link}</Typography>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        {pending ? <CircularProgress /> : 'CONTINUE'}
                    </Button>
                    {errors ? <AlertMessage errorMessage={errors} /> : null}
                </FormWrapper>
            </Stack>
        </ Container>
    )
}
