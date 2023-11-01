import { useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
});

function Login() {
  const dispatch = useDispatch();
  
  const { user, isLoading, isAuth ,isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {  
    if (message?.error) {
      if (Array.isArray(message.error)) {
        message.error.forEach((errorMessage) => {
          toast.error(errorMessage);
        });
      } else {
        toast.error(message.error);
      }
    }
    if (message?.message ) {
      toast.success(message.message);
        }
        dispatch(reset());
  }, [user, isLoading, isAuth ,isError, isSuccess, message, dispatch]);

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start</p>
      </section>

      <section className='form'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <div className='form-group'>
              <Field type='email' className='form-control' id='email' name='email' placeholder='Enter your email' />
              <ErrorMessage name='email' component='div' className='error' />
            </div>
            <div className='form-group'>
              <Field type='password' className='form-control' id='password' name='password' placeholder='Enter password' />
              <ErrorMessage name='password' component='div' className='error' />
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
}

export default Login;