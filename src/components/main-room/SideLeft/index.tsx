import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../common/Button';

const cx = classNames.bind(styles);

export const SideLeft = () => {
  return (
    <div className={cx('side-left')}>
      <h2 className={cx('side-title')}>Profile</h2>
      <div className={cx('player')}>
        <div className={cx('image')} />
      </div>
      <ul className={cx('stats')}>
        <li>
          <span>Rating</span>
          <span>2055</span>
        </li>
        <li>
          <span>Games played</span>
          <span>89</span>
        </li>
        <li>
          <span>Players eliminated</span>
          <span>23</span>
        </li>
        <li>
          <span>Lands conquered</span>
          <span>122</span>
        </li>
      </ul>
      <Button
        onClick={() => null}
        text="Chance profile"
        className={cx('button', 'button--profile')}
        color="dark"
      />
      <Button
        onClick={() => null}
        text="Achievements"
        className={cx('button', 'button--achievements')}
        color="dark"
      />
      <div className={cx('info-box')}>
        <h3 className={cx('title')}>Info</h3>
      </div>
    </div>
  );
};
