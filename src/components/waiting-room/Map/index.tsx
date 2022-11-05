import React from 'react';
import map from '../../../assets/img/map.png';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const Map = () => {
  return (
    <div className={cx('map')} style={{ backgroundImage: `url(${map})` }}>
      <div className={cx('info')}>
        <h1 className={cx('title')}>The Earth</h1>
        <ul className={cx('list')}>
          <li>Asia: 9</li>
          <li>North America: 7</li>
          <li>Europe: 5</li>
          <li>Africa: 3</li>
          <li>South America: 2</li>
          <li>Australia: 2</li>
        </ul>
      </div>
      <div className={cx('data')}>
        <span>Continents: 6</span>
        <span>Regions: 52</span>
      </div>
    </div>
  );
};
