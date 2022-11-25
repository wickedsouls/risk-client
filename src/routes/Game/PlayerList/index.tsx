import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { GameCard, Player, PlayerStatus } from '../../../store/game';
import { playerColors } from '../../../common/playerColors';
import { svg } from '../../../assets/svg/svg';
import { User } from '../../../store/user';

const cx = classNames.bind(styles);

interface Props {
  players?: Player[];
  currentPlayerId?: string;
  user: Partial<User>;
}

export const PlayerList: React.FC<Props> = ({
  players,
  user,
  currentPlayerId,
}) => {
  if (!players || !currentPlayerId) return null;
  const renderPlayers = () => {
    return players.map((player) => {
      const playerIsUser = user.id === player.id;
      const color = playerColors[player.color || ''];
      const cards = player.cards?.map((card, i) => {
        const cards = {
          [GameCard.Jack]: svg.cardJack,
          [GameCard.Queen]: svg.cardQueen,
          [GameCard.King]: svg.cardKing,
          [GameCard.Ace]: svg.cardAce,
        };
        const style = {
          left: i * 19 + 20 + 'px',
          bottom: playerIsUser ? '-20px' : '-10px',
        };
        return (
          <img
            key={i}
            src={playerIsUser ? cards[card] : svg.cardCovered}
            className={cx('card')}
            style={style}
            alt=""
          />
        );
      });
      return (
        <div
          className={cx(
            'player',
            currentPlayerId === player.id && 'player--active',
            player.status === PlayerStatus.Defeat && 'player--eliminated',
            player.status === PlayerStatus.Surrender && 'player--eliminated',
          )}
          style={{
            borderRight: `6px solid ${color}`,
          }}
          key={player.id}
        >
          {cards}
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
