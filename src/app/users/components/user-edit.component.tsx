import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'

// ======= store ======= //
import { useAppDispatch } from 'src/storeTypes';
import { updateUser } from '../store/users.action';

// ======= utils, types ======= //
import { User } from '../types/User.type';

// ======= mui ======= //
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { TextField, Button, CircularProgress } from '@mui/material';

interface Props {
  user: User | null
}
export default function UserEdit({ user }: Props) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    first_name: Yup.string().required('No first name provided.'),
    last_name: Yup.string().required('No last name provided.')
  });

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name
    },
    validationSchema: SigninSchema,
    onSubmit: async (value) => {
      const body = { ...user, ...value }
      dispatch(updateUser(body))
      setIsDisabled(true)
    },
  });
  console.log(user)
  return (
    <>
      <form onSubmit={formik.handleSubmit} style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '40%',
        alignItems: 'center',
        padding: '0px 10px',
        textAlign: 'center',
        gap: '10px'
      }}>
        <TextField
          className='edit'
          variant='outlined'
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isDisabled}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className='edit'
          fullWidth
          id="first_name"
          name="first_name"
          label="First Name"
          type="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isDisabled}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
        />
        <TextField
          className='edit'
          fullWidth
          id="last_name"
          name="last_name"
          label="Last Name"
          type="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isDisabled}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />
        {isDisabled ?
          <ModeEditIcon onClick={() => setIsDisabled(false)} />
          :
          <Button variant='contained' color='success' fullWidth type="submit">
            {false ? <CircularProgress /> : 'SUBMIT'}
          </Button>
        }
      </form>
    </>
  )
}
