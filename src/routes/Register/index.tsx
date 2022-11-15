import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Logo } from '../../components/common/Logo';
import { AuthCard } from '../../components/common/AuthCard';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { navigationPaths } from '../../config/navigationPaths';
import { Formik, Form } from 'formik';
import { TextInput } from '../../components/formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { authState, register } from '../../store/auth';
import { useRedirectAuthenticated } from '../../hooks/useRedirectAuthenticated';

const validationSchema = Yup.object({
  username: Yup.string()
    .max(20, 'Username is too long')
    .min(3, 'Username is too short')
    .required('Username is required'),
  email: Yup.string()
    .max(50, 'Email is tool long')
    .min(3, 'Email is too short')
    .required('Email is required'),
  password: Yup.string()
    .max(50, 'Password is tool long')
    .min(3, 'Password is too short')
    .required('Password is required'),
});

const cx = classNames.bind(styles);

export const Register = () => {
  const dispatch = useDispatch();
  const { registrationInProgress, registrationError } = useSelector(authState);

  useRedirectAuthenticated();

  return (
    <div className={cx('register')}>
      <Logo className={cx('logo')} />
      <AuthCard className={cx('card')} title="Register">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ username: '', email: '', password: '' }}
          onSubmit={async (values) => dispatch(register(values))}
          validationSchema={validationSchema}
        >
          <Form>
            <TextInput
              name="username"
              className={cx('input')}
              placeholder="Username"
            />
            <TextInput
              name="email"
              className={cx('input')}
              placeholder="Email"
            />
            <TextInput
              name="password"
              type="password"
              className={cx('input')}
              placeholder="Password"
            />
            <Button
              isLoading={registrationInProgress}
              type="submit"
              className={cx('button--enter')}
              color="dark"
            >
              Register
            </Button>
            {registrationError && (
              <div className={cx('error')}>{registrationError.message}</div>
            )}
          </Form>
        </Formik>
        <div className={cx('or')}>Or</div>
        <Button className={cx('button--social')} color="dark">
          Register with Google
        </Button>
        <Button className={cx('button--social')} color="dark">
          Register with Facebook
        </Button>
        <div className={cx('no-account-wrapper')}>
          <div className={cx('no-account')}>Already have an account?</div>
          <Link to={navigationPaths.login} className={cx('no-account')}>
            Login here!
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};
