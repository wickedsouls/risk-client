import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import {svg} from "../../assets/svg/svg";
const cx = classNames.bind(styles);

export const Home = () => {
  return (
    <div className={cx('home-page')}>
        <h1 className={cx('title')}>
          <strong>RISK</strong>
          <br/>
          <span>Game Online</span>
        </h1>
      <img src={svg.homeMap} alt="" className={cx('map')}/>
    </div>
  );
};
