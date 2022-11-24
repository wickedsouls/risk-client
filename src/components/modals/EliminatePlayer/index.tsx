import React, { useEffect } from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearActiveGame,
  gameState,
  leaveGame,
  showGameModal,
} from '../../../store/game';
import { ModalType } from '../../../store/app';
import { userState } from '../../../store/user';
import { navigationPaths } from '../../../config/navigationPaths';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export const EliminatePlayer = () => {
  const { gameModal } = useSelector(gameState);
  const user = useSelector(userState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, color, playerId } = gameModal;

  useEffect(() => {
    if (gameModal.type === ModalType.Defeat) {
      setTimeout(() => {
        if (playerId !== user.data.id) close();
      }, 3000);
    }
  }, [gameModal]);

  if (gameModal.type !== ModalType.Defeat) return null;

  const goBack = () => {
    dispatch(clearActiveGame());
    dispatch(leaveGame());
    navigate(navigationPaths.mainRoom);
  };

  const close = () => {
    dispatch(showGameModal({}));
  };

  const OthersContent = (
    <>
      <h3 className={cx('title')}>
        <strong className={cx('name', `name--${color}`)}>{username}</strong>{' '}
        <br />
        <span>has been eliminated</span>
      </h3>
    </>
  );

  const YouLose = (
    <>
      <h3 className={cx('defeat')}>
        <span>You have been eliminated</span>
      </h3>
      <div onClick={goBack} className={cx('link')}>
        Go back to the game selection
      </div>
      <div className={cx('or')}>Or</div>
      <div className={cx('spectate')} onClick={close}>
        Continue watching the game
      </div>
    </>
  );
  return (
    <ModalLayout onClose={close} className={cx('layout')}>
      <div className={cx('modal')}>
        <>{user.data.id === playerId ? YouLose : OthersContent}</>
      </div>
    </ModalLayout>
  );
};
