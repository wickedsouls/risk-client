import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { svg } from '../../assets/svg/svg';
import { AuthButton } from '../../components/home/AuthButton';
import { Logo } from '../../components/common/Logo';
import { navigationPaths } from '../../config/navigationPaths';

const cx = classNames.bind(styles);

export const Home = () => {
  return (
    <div className={cx('home-page')}>
      <Logo className={cx('logo')} />
      <div className={cx('map-wrapper')}>
        <AuthButton
          to={navigationPaths.login}
          onClick={() => null}
          text="Login"
          className={cx('button', 'button--login')}
        />
        <AuthButton
          to={navigationPaths.register}
          onClick={() => null}
          text="Register"
          className={cx('button', 'button--register')}
        />
        <AuthButton
          to={navigationPaths.mainRoom}
          onClick={() => null}
          text="Play As Guest"
          className={cx('button', 'button--guest')}
        />
        <img src={svg.homeMap} alt="" className={cx('map')} />
      </div>
    </div>
  );
};
