import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { endTurn, finishAttack, Player, TurnState } from '../../../store/game';
import { useDispatch } from 'react-redux';
import { svg } from '../../../assets/svg/svg';

const cx = classNames.bind(styles);

interface Props {
  myTurn?: boolean;
  armiesThisTurn?: number;
  gameId: string;
  turnState?: TurnState;
  currentPlayer: Player;
}

export const GameControls: React.FC<Props> = ({
  gameId,
  myTurn,
  armiesThisTurn,
  turnState,
  currentPlayer,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={cx('game-controls')}>
      {!myTurn && (
        <div className={cx('other-player')}>
          <strong className={cx('name', `name--${currentPlayer.color}`)}>
            {currentPlayer.username}
          </strong>{' '}
          is now in command!
        </div>
      )}
      {myTurn && turnState === TurnState.Move && (
        <div className={cx('move')}>
          <div
            onClick={() => dispatch(endTurn({ gameId }))}
            className={cx('button', `button--${currentPlayer.color}`)}
          >
            End turn
          </div>
          <div className={cx('text')}>
            Select the zone you want to move your army from
          </div>
          <div className={cx('text')}>
            Click on your connecting land to move up to 7 armies
          </div>
        </div>
      )}
      {myTurn && turnState === TurnState.Attack && (
        <div className={cx('attack')}>
          <div className={cx('row')}>
            <div
              onClick={() => dispatch(endTurn({ gameId }))}
              className={cx('button', `button--${currentPlayer.color}`)}
            >
              End turn
            </div>
            <div
              onClick={() => dispatch(finishAttack())}
              className={cx('button', `button--${currentPlayer.color}`)}
            >
              Move armies
            </div>
          </div>
          <div className={cx('text')}>
            Select the zone you want to attack from
          </div>
          <div className={cx('text')}>Click on enemy land to attack</div>
        </div>
      )}
      {myTurn && armiesThisTurn !== 0 && (
        <div className={cx('armies-remaining')}>
          <div className={cx('title')}>Armies remaining</div>
          <div className={cx('row')}>
            {new Array(armiesThisTurn).fill(null).map((_, i) => {
              return (
                <img
                  key={i}
                  src={svg.rifleman}
                  className={cx('rifleman')}
                  alt=""
                />
              );
            })}
          </div>
          <div className={cx('info')}>
            Click on your lands to place the armies
          </div>
        </div>
      )}
    </div>
  );
};
