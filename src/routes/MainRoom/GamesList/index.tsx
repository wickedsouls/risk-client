import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Game } from '../Game';
import { Maps } from '../../../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, mainRoomState } from '../../../store/main-room';
import { joinGame } from '../../../store/game';
import { ModalType, openModal } from '../../../store/app';
import { JoinPrivateGame } from '../../../components/modals/JoinPrivateGame';

const cx = classNames.bind(styles);

export const GamesList = () => {
  const { games } = useSelector(mainRoomState);
  const [privateGameId, selectGame] = useState('undefined');
  const dispatch = useDispatch();

  const onJoin = (gameId: string, isPrivate?: boolean) => {
    if (isPrivate) {
      selectGame(gameId);
      dispatch(openModal(ModalType.JoinPrivateGame));
    } else {
      dispatch(joinGame({ gameId }));
    }
  };

  const renderGames = () => {
    return games.data.map((game) => {
      const { gameId, gameStatus, isPrivate, players, maxPlayers } = game;
      return (
        <Game
          key={gameId}
          gameId={gameId}
          state={gameStatus}
          map={Maps.EARTH}
          maxPlayers={maxPlayers}
          isPrivate={isPrivate}
          registeredPlayers={players.length}
          onJoin={() => onJoin(gameId, isPrivate)}
        />
      );
    });
  };
  return (
    <div className={cx('games-list')}>
      <JoinPrivateGame gameId={privateGameId} />
      <h2 className={cx('title')} onClick={() => dispatch(getAllGames())}>
        Join the custom game
      </h2>
      {renderGames()}
    </div>
  );
};
