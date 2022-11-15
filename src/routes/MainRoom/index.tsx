import React, { useEffect } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Logo } from '../../components/common/Logo';
import { Controls } from './Controls';
import { SideLeft } from './SideLeft';
import { SideRight } from './SideRight';
import { GamesList } from './GamesList';
import { CreateGame } from '../../components/modals/CreateGame';
import { useDispatch, useSelector } from 'react-redux';
import { appState, closeModal, ModalType, openModal } from '../../store/app';
import { getAllGames } from '../../store/main-room';
import { useNavigate } from 'react-router-dom';
import { navigationPaths } from '../../config/navigationPaths';
import { gameState, GameStatus } from '../../store/game';

const cx = classNames.bind(styles);

export const MainRoom = () => {
  const { modal, connected } = useSelector(appState);
  const { activeGame } = useSelector(gameState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const gameType = activeGame?.isPrivate ? 'private' : 'public';
    if (activeGame?.gameStatus === GameStatus.Registering) {
      navigate(
        `${navigationPaths.preparation}/${activeGame.gameId}/${gameType}`,
      );
    } else if (activeGame?.gameStatus === GameStatus.InProgress) {
      navigate(`${navigationPaths.game}/${activeGame.gameId}/${gameType}`);
    }
  }, [activeGame]);

  useEffect(() => {
    if (connected) {
      dispatch(getAllGames());
    }
  }, [connected, dispatch]);

  return (
    <>
      <CreateGame />
      <div className={cx('main-room')}>
        <Logo className={cx('logo')} />
        <div className={cx('container')}>
          <SideLeft />
          <div className={cx('games')}>
            <Controls
              showCreateGameModal={async () =>
                dispatch(openModal(ModalType.CreateGame))
              }
            />
            <GamesList />
          </div>
          <SideRight />
        </div>
      </div>
    </>
  );
};
