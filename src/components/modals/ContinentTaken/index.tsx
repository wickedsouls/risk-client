import React, { useEffect } from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { gameState, showGameModal } from '../../../store/game';
import { ModalType } from '../../../store/app';
import { userState } from '../../../store/user';

const cx = classNames.bind(styles);

export const ContinentTaken = () => {
  const { gameModal } = useSelector(gameState);
  const user = useSelector(userState);

  const dispatch = useDispatch();

  const close = () => {
    dispatch(showGameModal({}));
  };

  useEffect(() => {
    if (gameModal.type === ModalType.ContinentTaken) {
      setTimeout(() => {
        close();
      }, 3000);
    }
  }, [gameModal]);

  if (gameModal.type !== ModalType.ContinentTaken) return null;

  const { username, color, continent, reward, playerId } = gameModal;

  const OthersContent = (
    <>
      <h3 className={cx('title')}>
        <strong className={cx('zone')}>{continent}</strong>
        <br />
        <span>was taken by</span>
        <strong className={cx('user', `user--${color}`)}>
          {username}
        </strong>{' '}
      </h3>
      <div className={cx('text')}>
        <strong>{username}</strong> will receive extra <span>{reward}</span>{' '}
        armies next turn if uncontested
      </div>
    </>
  );

  const MyContent = (
    <>
      <h3 className={cx('title')}>
        <span>You have taken</span>
        <strong className={cx('zone')}>{continent}</strong>
      </h3>
      <div className={cx('text')}>
        You will receive extra <span>{reward}</span> armies next turn if
        uncontested
      </div>
    </>
  );
  return (
    <ModalLayout onClose={close} className={cx('layout')}>
      <div className={cx('modal')} onClick={close}>
        <>{user.data.id === playerId ? MyContent : OthersContent}</>
      </div>
    </ModalLayout>
  );
};
