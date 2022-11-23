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
import { appState, ModalType, openModal } from '../../store/app';
import { getAllGames } from '../../store/main-room';
import { useRedirectActiveGame } from '../../hooks/useRedirectActiveGame';

const cx = classNames.bind(styles);

export const MainRoom = () => {
  const { connected } = useSelector(appState);
  const dispatch = useDispatch();

  useRedirectActiveGame();

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
