import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Player } from '../../../store/game';
import { playerColors } from '../../../common/playerColors';

const cx = classNames.bind(styles);

interface Props {
  players?: Player[];
  currentPlayerId?: string;
}

export const PlayerList: React.FC<Props> = ({ players, currentPlayerId }) => {
  if (!players || !currentPlayerId) return null;
  const renderPlayers = () => {
    return players.map((player) => {
      const color = playerColors[player.color || ''];
      return (
        <div
          className={cx(
            'player',
            currentPlayerId === player.id && 'player--active',
          )}
          style={{
            borderRight: `6px solid ${color}`,
          }}
          key={player.id}
        >
          <div className={cx('avatar')} />
          <div className={cx('title')}>Gladiator</div>
          <div className={cx('name')}>{player.username}</div>
          <div className={cx('armies')}>Armies next turn: 3</div>
        </div>
      );
    });
  };
  return <div className={cx('players-list')}>{renderPlayers()}</div>;
};
