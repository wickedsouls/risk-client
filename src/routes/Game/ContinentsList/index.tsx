import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { gameState } from '../../../store/game';
import values from 'lodash/values';

const cx = classNames.bind(styles);

export const ContinentsList = () => {
  const { activeGame } = useSelector(gameState);
  if (!activeGame?.map?.continents) return null;
  const continents = values(activeGame.map.continents).map((continent) => {
    return (
      <div key={continent.name} className={cx('continent')}>
        <span className={cx('name')}>{continent.name}:</span>
        <strong className={cx('reward')}>{continent.reward}</strong>
      </div>
    );
  });
  return <div className={cx('container')}>{continents}</div>;
};
