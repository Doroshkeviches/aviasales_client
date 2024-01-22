import { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert';

interface Props {
    errorMessage: string | null
}

export default function AlertMessage({ errorMessage }: Props) {
    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    )
}

