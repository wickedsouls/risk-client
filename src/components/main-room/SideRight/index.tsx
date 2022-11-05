import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const SideRight = () => {
  return (
    <div className={cx('side-right')}>
      <h2 className={cx('title')}>Season 1</h2>
      <h3 className={cx('ratings-name')}>Rating</h3>
      <div className={cx('ratings', 'ratings--points')}>
        <div className={cx('line')} />
        <div className={cx('line')} />
        <div className={cx('line')} />
        <div className={cx('line')} />
      </div>
      <h3 className={cx('ratings-name')}>Players killed</h3>
      <div className={cx('ratings', 'ratings--kills')}>
        <div className={cx('line')} />
        <div className={cx('line')} />
        <div className={cx('line')} />
      </div>
      <h3 className={cx('ratings-name')}>Regions conquered</h3>
      <div className={cx('ratings', 'ratings--regions')}>
        <div className={cx('line')} />
        <div className={cx('line')} />
        <div className={cx('line')} />
      </div>
    </div>
  );
};
