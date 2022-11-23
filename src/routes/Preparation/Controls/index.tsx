import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { gameState, startGame } from '../../../store/game';
import { useIsGameAdmin } from '../../../hooks/useIsGameAdmin';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

export const Controls = () => {
  const { activeGame } = useSelector(gameState);
  const isGameAdmin = useIsGameAdmin();
  const { gameId } = useParams<{ gameId: string }>();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  if (!activeGame) return null;
  const { minPlayers, players } = activeGame;

  const onGameStart = () => {
    if (players.length < minPlayers) {
      setError(`Not enough players registered ${players.length}/${minPlayers}`);
    } else {
      dispatch(startGame({ gameId: gameId as string }));
    }
  };

  const Message = (
    <div className={cx('message')}>
      Waiting for {activeGame?.createdBy.username} to start the game..
    </div>
  );
  const ButtonStart = (
    <Button onClick={onGameStart} className={cx('button-start')} color="light">
      Start the game
    </Button>
  );
  const renderContent = () => {
    if (!activeGame) return null;
    return isGameAdmin ? ButtonStart : Message;
  };
  return (
    <div className={cx('controls')}>
      {renderContent()} {error && <div className={cx('error')}>{error}</div>}
    </div>
  );
};
