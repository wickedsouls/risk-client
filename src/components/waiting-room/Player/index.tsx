import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { svg } from '../../../assets/svg/svg';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
  name: string;
  rating: number;
  title: string;
}
export const Player: React.FC<Props> = ({ className, name, rating, title }) => {
  return (
    <div className={cx('player', className)}>
      <div className={cx('image')}>
        <img src={svg.rifleman} className={cx('icon')} alt="" />
      </div>
      <div className={cx('info')}>
        <div className={cx('title')}>{title}</div>
        <div className={cx('name')}>{name}</div>
        <div className={cx('rating')}>Rating: {rating}</div>
        <div className={cx('achievements')}>
          <img src={svg.badge} className={cx('icon')} alt="" />
          <img src={svg.badge} className={cx('icon')} alt="" />
          <img src={svg.badge} className={cx('icon')} alt="" />
        </div>
      </div>
    </div>
  );
};
