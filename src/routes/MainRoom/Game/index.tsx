import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { svg } from '../../../assets/svg/svg';
import { Button } from '../../../components/common/Button';
import { Maps } from '../../../config/constants';
import { GameStatus, Player } from '../../../store/game/types';

const cx = classNames.bind(styles);

interface Props {
  state: GameStatus;
  maxPlayers: number;
  registeredPlayers: number;
  map: Maps;
  gameId: string;
  isPrivate?: boolean;
  onJoin: () => void;
}
export const Game: React.FC<Props> = ({
  state,
  maxPlayers,
  registeredPlayers,
  map,
  isPrivate,
  onJoin,
  gameId,
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
      <div className={cx('game-id')}>{gameId}</div>
      <div className={cx('controls')}>
        {isPrivate && state === GameStatus.Registering && (
          <img src={svg.lock} alt="" className={cx('icon')} />
        )}
        {state === GameStatus.Registering && (
          <Button onClick={onJoin} className={cx('button')} color="light">
            Join
          </Button>
        )}
      </div>
    </div>
  );
};
