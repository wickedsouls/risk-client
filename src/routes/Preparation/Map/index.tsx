import React from 'react';
import map from '../../../assets/img/map.png';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelGame,
  clearGames,
  gameState,
  leaveGame,
} from '../../../store/game';
import { useNavigate } from 'react-router-dom';
import { navigationPaths } from '../../../config/navigationPaths';
import { useIsGameAdmin } from '../../../hooks/useIsGameAdmin';
import { appState, closeModal, ModalType, openModal } from '../../../store/app';
import { Confirmation } from '../../../components/modals/Confirmation';

const cx = classNames.bind(styles);

export const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isGameAdmin = useIsGameAdmin();
  const { modal } = useSelector(appState);
  const { activeGame } = useSelector(gameState);
  if (!activeGame) return null;

  const onClick = () => {
    if (isGameAdmin) {
      dispatch(openModal(ModalType.CancelGame));
    } else {
      dispatch(leaveGame({ gameId: activeGame.gameId }));
      navigate(navigationPaths.mainRoom);
    }
  };

  const onConfirm = () => {
    dispatch(cancelGame({ gameId: activeGame.gameId }));
    dispatch(closeModal());
    dispatch(clearGames());
    navigate(navigationPaths.mainRoom);
  };

  return (
    <div className={cx('map')} style={{ backgroundImage: `url(${map})` }}>
      <Confirmation
        onConfirm={onConfirm}
        onCancel={() => dispatch(closeModal())}
        confirmText="Yes"
        cancelText="No"
        isVisible={modal === ModalType.CancelGame}
        title="Cancel the game?"
      />
      <div className={cx('info')}>
        <h1 className={cx('title')}>The Earth</h1>
        <ul className={cx('list')}>
          <li>Asia: 9</li>
          <li>North America: 7</li>
          <li>Europe: 5</li>
          <li>Africa: 3</li>
          <li>South America: 2</li>
          <li>Australia: 2</li>
        </ul>
      </div>
      <div className={cx('data')}>
        <span>Continents: 6</span>
        <span>Regions: 52</span>
      </div>
      <Button className={cx('button')} color="light" onClick={onClick}>
        {isGameAdmin ? 'Cancel The Game' : 'Leave'}
      </Button>
    </div>
  );
};
