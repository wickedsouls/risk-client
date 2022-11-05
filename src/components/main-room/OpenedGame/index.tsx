import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { svg } from '../../../assets/svg/svg';
import { Button } from '../../common/Button';
import { Maps } from '../../../config/constants';

const cx = classNames.bind(styles);

interface Props {
  state: 'registering' | 'in-progress' | 'completed';
  maxPlayers: number;
  registeredPlayers: number;
  map: Maps;
  isPrivate?: boolean;
  onJoin: () => void;
}
export const OpenedGame: React.FC<Props> = ({
  state,
  maxPlayers,
  registeredPlayers,
  map,
  isPrivate,
  onJoin,
}) => {
  return (
    <div className={cx('game')}>
      <div className={cx('state')}>{state}</div>
      <div className={cx('players')}>
        {registeredPlayers}/{maxPlayers}
      </div>
      <div className={cx('map')}>
        <img src={svg.earth} className={cx('icon')} alt="" />
        {map}
      </div>
      <div className={cx('controls')}>
        {isPrivate && state === 'registering' && (
          <img src={svg.lock} alt="" className={cx('icon')} />
        )}
        {state === 'registering' && (
          <Button
            onClick={onJoin}
            text="Join"
            className={cx('button')}
            color="light"
          />
        )}
      </div>
    </div>
  );
};
