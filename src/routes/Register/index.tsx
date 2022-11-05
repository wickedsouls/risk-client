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

export const Register = () => {
  const navigate = useNavigate();
  return (
    <div className={cx('register')}>
      <Logo className={cx('logo')} />
      <AuthCard className={cx('card')} title="Register">
        <TextInput className={cx('input')} placeholder="Username" />
        <TextInput className={cx('input')} placeholder="Email" />
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
          text="Register with Google"
          className={cx('button--social')}
          color="dark"
        />
        <Button
          onClick={() => navigate(navigationPaths.mainRoom)}
          text="Register with Facebook"
          className={cx('button--social')}
          color="dark"
        />
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
