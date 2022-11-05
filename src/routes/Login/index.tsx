import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Logo } from '../../components/common/Logo';
import { AuthCard } from '../../components/common/AuthCard';
import { TextInput } from '../../components/common/TextInput';
import { Button } from '../../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { navigationPaths } from '../../config/navigationPaths';

const cx = classNames.bind(styles);

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className={cx('login')}>
      <Logo className={cx('logo')} />
      <AuthCard className={cx('card')} title="Login">
        <TextInput className={cx('input')} placeholder="Email or Username" />
        <TextInput className={cx('input')} placeholder="Password" />
        <Button
          onClick={() => navigate(navigationPaths.mainRoom)}
          text="Enter"
          className={cx('button--enter')}
          color="dark"
        />
        <div className={cx('or')}>Or</div>
        <Button
          onClick={() => navigate(navigationPaths.mainRoom)}
          text="Login with Google"
          className={cx('button--social')}
          color="dark"
        />
        <Button
          onClick={() => navigate(navigationPaths.mainRoom)}
          text="Login with Facebook"
          className={cx('button--social')}
          color="dark"
        />
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
