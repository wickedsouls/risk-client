import React, { useEffect } from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { gameState, showGameModal } from '../../../store/game';
import { ModalType } from '../../../store/app';
import { userState } from '../../../store/user';

const cx = classNames.bind(styles);

export const Surrender = () => {
  const { gameModal } = useSelector(gameState);
  const user = useSelector(userState);
  const dispatch = useDispatch();

  const { username, color, playerId } = gameModal;

  useEffect(() => {
    if (gameModal.type === ModalType.Surrender) {
      setTimeout(() => {
        close();
      }, 3000);
    }
  }, [gameModal]);

  if (gameModal.type !== ModalType.Surrender || playerId === user.data.id) {
    return null;
  }

  const close = () => {
    dispatch(showGameModal({}));
  };

  return (
    <ModalLayout onClose={close} className={cx('layout')}>
      <div className={cx('modal')}>
        <h3 className={cx('title')}>
          <strong className={cx('name', `name--${color}`)}>{username}</strong>{' '}
          <br />
          <span>has surrendered</span>
        </h3>
      </div>
    </ModalLayout>
  );
};
