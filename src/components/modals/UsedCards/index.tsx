import React, { useEffect } from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { gameState, showGameModal } from '../../../store/game';
import { userState } from '../../../store/user';
import { ModalType } from '../../../store/app';

const cx = classNames.bind(styles);

export const UsedCards = () => {
  const { activeGame, gameModal } = useSelector(gameState);
  const user = useSelector(userState);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (gameModal?.type === ModalType.UsedCards) {
        dispatch(showGameModal({}));
      }
    }, 3000);
  }, [activeGame, gameModal]);

  if (!activeGame || gameModal?.type !== ModalType.UsedCards) return null;

  const PlayerContent = (
    <h3 className={cx('title')}>
      You receive{' '}
      <span className={cx('army')}>{activeGame.armiesFromCards}</span> extra
      armies
    </h3>
  );
  const OthersContent = (
    <h3 className={cx('title')}>
      <span
        className={cx('player', `player--${activeGame.currentPlayer.color}`)}
      >
        {activeGame.currentPlayer.username}
      </span>{' '}
      <br />
      <span className={cx('message')}>
        Has used game cards and got{' '}
        <span className={cx('army')}>{activeGame.armiesFromCards}</span> extra
        armies
      </span>
    </h3>
  );
  return (
    <ModalLayout
      className={cx('modal')}
      onClose={() => dispatch(showGameModal({}))}
    >
      {user.data.id === activeGame.currentPlayer.id
        ? PlayerContent
        : OthersContent}
    </ModalLayout>
  );
};
