import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import {
  clearActiveGame,
  endTurn,
  finishAttack,
  Game,
  leaveGame,
  Player,
  PlayerStatus,
  TurnState,
  useCards,
} from '../../../store/game';
import { useDispatch, useSelector } from 'react-redux';
import { svg } from '../../../assets/svg/svg';
import { useGetMyPlayerData } from '../../../hooks/useGetMyPlayerData';
import { useNavigate } from 'react-router-dom';
import { navigationPaths } from '../../../config/navigationPaths';

const cx = classNames.bind(styles);

interface Props {
  myTurn?: boolean;
  armiesThisTurn?: number;
  gameId: string;
  timeout?: number;
  turnState?: TurnState;
  currentPlayer: Player;
}

export const GameControls: React.FC<Props> = ({
  myTurn,
  armiesThisTurn,
  turnState,
  currentPlayer,
  timeout,
}) => {
  const dispatch = useDispatch();
  const player = useGetMyPlayerData();
  const navigate = useNavigate();

  const cards = currentPlayer.cards;

  if (
    player?.status === PlayerStatus.Surrender ||
    player?.status === PlayerStatus.Defeat
  ) {
    const onGameLeave = () => {
      navigate(navigationPaths.mainRoom);
      dispatch(clearActiveGame());
      dispatch(leaveGame());
    };
    return (
      <div className={cx('game-controls')}>
        <div className={cx('spectate')}>
          <div className={cx('title')}>You are in spectate mode</div>
          <div className={cx('leave-game')} onClick={onGameLeave}>
            Leave the game
          </div>
        </div>
      </div>
    );
  }

  const armiesToPlace = () => {
    return new Array(armiesThisTurn).fill(null).map((_, i) => {
      return (
        <img key={i} src={svg.rifleman} className={cx('rifleman')} alt="" />
      );
    });
  };
  console.log(timeout);
  return (
    <div className={cx('game-controls')}>
      {!myTurn && (
        <div className={cx('other-player')}>
          <strong className={cx('name', `name--${currentPlayer.color}`)}>
            {currentPlayer.username}
          </strong>{' '}
          Turn
          <div className={cx('armies-remaining')}>{armiesToPlace()}</div>
        </div>
      )}
      {myTurn && turnState === TurnState.Move && (
        <div className={cx('move')}>
          <div
            onClick={() => dispatch(endTurn())}
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
              onClick={() => dispatch(endTurn())}
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
          {/*<div className={cx('title')}>Armies remaining</div>*/}
          <div className={cx('row')}>{armiesToPlace()}</div>
          <div className={cx('info')}>
            Click on your lands to place the armies
          </div>
          {cards && cards.length >= 3 && (
            <div
              className={cx('use-cards', `use-cards--${currentPlayer.color}`)}
              onClick={() => dispatch(useCards())}
            >
              Use cards to get armies
            </div>
          )}
        </div>
      )}
      {myTurn && (
        <div
          className={cx('timer')}
          style={{
            animationDuration: `${timeout}ms`,
          }}
        />
      )}
    </div>
  );
};
