import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../../components/common/Button';
import { Player } from '../../../store/game';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
  players?: Player[];
  maxPlayers?: number;
  allPlayersRequired?: boolean;
}
export const EmptySpots: React.FC<Props> = ({
  className,
  players,
  maxPlayers,
  allPlayersRequired,
}) => {
  const renderEmptySpots = () => {
    if (!players || !maxPlayers) return null;
    const slots = [];
    for (let i = 0; i < maxPlayers - players.length; i++) {
      slots.push(
        <div className={cx('empty', className)} key={i}>
          <Button onClick={() => null} className={cx('button')} color="light">
            Invite a friend
          </Button>
          {allPlayersRequired && (
            <div className={cx('waiting')}>Waiting for player..</div>
          )}
        </div>,
      );
    }
    return slots;
  };
  return <>{renderEmptySpots()}</>;
};
