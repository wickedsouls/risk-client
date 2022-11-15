import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../../components/common/Button';
import { useSelector } from 'react-redux';
import { gameState } from '../../../store/game';
import { useIsGameAdmin } from '../../../hooks/useIsGameAdmin';

const cx = classNames.bind(styles);

export const Controls = () => {
  const { activeGame } = useSelector(gameState);
  const isGameAdmin = useIsGameAdmin();

  const Message = (
    <div className={cx('message')}>
      Waiting for {activeGame?.createdBy.username} to start the game..
    </div>
  );
  const ButtonStart = (
    <Button onClick={() => null} className={cx('button-start')} color="light">
      Start the game
    </Button>
  );
  const renderContent = () => {
    if (!activeGame) return null;
    return isGameAdmin ? ButtonStart : Message;
  };
  return <div className={cx('controls')}>{renderContent()}</div>;
};
