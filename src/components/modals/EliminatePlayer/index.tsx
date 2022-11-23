import React, { useEffect } from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { gameState, showGameModal } from '../../../store/game';
import { ModalType } from '../../../store/app';
import { userState } from '../../../store/user';

const cx = classNames.bind(styles);

export const EliminatePlayer = () => {
  const { gameModal } = useSelector(gameState);
  const user = useSelector(userState);

  const dispatch = useDispatch();

  const close = () => {
    dispatch(showGameModal({}));
  };

  useEffect(() => {
    if (gameModal.type === ModalType.ContinentTaken) {
      setTimeout(() => {
        // close();
      }, 3000);
    }
  }, [gameModal]);

  if (gameModal.type !== ModalType.Defeat) return null;

  const { username, color, playerId } = gameModal;

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
    </>
  );
  return (
    <ModalLayout onClose={close} className={cx('layout')}>
      <div className={cx('modal')} onClick={close}>
        <>{user.data.id === playerId ? YouLose : OthersContent}</>
      </div>
    </ModalLayout>
  );
};
