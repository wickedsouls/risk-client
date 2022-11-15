import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Logo } from '../../components/common/Logo';
import { AuthCard } from '../../components/common/AuthCard';
import { TextInput } from '../../components/formik';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { login } from '../../store/auth';
import { navigationPaths } from '../../config/navigationPaths';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { authState } from '../../store/auth';
import { useRedirectAuthenticated } from '../../hooks/useRedirectAuthenticated';

const cx = classNames.bind(styles);

const validationSchema = Yup.object({
  username: Yup.string().required('Username or email ir required'),
  password: Yup.string().required('Password is required'),
});

export const Login = () => {
  const dispatch = useDispatch();
  const { loginInProgress, loginError } = useSelector(authState);

  useRedirectAuthenticated();

  return (
    <div className={cx('login')}>
      <Logo className={cx('logo')} />
      <AuthCard className={cx('card')} title="Login">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          initialValues={{ username: 'wicked', password: 'secret' }}
          onSubmit={async (values) => dispatch(login(values))}
        >
          <Form className={cx('form')}>
            <TextInput
              name="username"
              className={cx('input')}
              placeholder="Username or Email"
            />
            <TextInput
              name="password"
              className={cx('input')}
              placeholder="Password"
              type="password"
            />
            <Button
              isLoading={loginInProgress}
              type="submit"
              className={cx('button--enter')}
              color="dark"
            >
              Enter
            </Button>
            {loginError && (
              <div className={cx('error')}>{loginError.message}</div>
            )}
          </Form>
        </Formik>
        <div className={cx('or')}>Or</div>
        <Button className={cx('button--social')} color="dark">
          Login with Google
        </Button>
        <Button className={cx('button--social')} color="dark">
          Login with Facebook
        </Button>
        <div className={cx('no-account-wrapper')}>
          <div className={cx('no-account')}>Don&apos;t have an account?</div>
          <Link to={navigationPaths.register} className={cx('no-account')}>
            Register here!
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};
