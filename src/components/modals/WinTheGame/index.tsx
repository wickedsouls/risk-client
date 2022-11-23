import React from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { clearActiveGame, gameState } from '../../../store/game';
import { userState } from '../../../store/user';
import { useNavigate } from 'react-router-dom';
import { navigationPaths } from '../../../config/navigationPaths';

const cx = classNames.bind(styles);

export const WinTheGame = () => {
  const { activeGame } = useSelector(gameState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userState);

  const winner = activeGame?.players.find(
    (p) => p.status === 'win' && p.id === user.data.id,
  );

  const goBack = () => {
    dispatch(clearActiveGame());
    navigate(navigationPaths.mainRoom);
  };

  if (!winner) return null;

  return (
    <ModalLayout onClose={() => null} className={cx('layout')}>
      <div className={cx('modal')}>
        <h3 className={cx('title')}>
          <span>You have won the game!</span>
        </h3>
        <div onClick={goBack} className={cx('link')}>
          Go back to the game selection
        </div>
      </div>
    </ModalLayout>
  );
};
