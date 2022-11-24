import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { svg } from '../../../assets/svg/svg';
import { Confirmation } from '../../../components/modals/Confirmation';
import { useDispatch } from 'react-redux';
import {
  clearActiveGame,
  leaveGame,
  PlayerStatus,
  surrender,
} from '../../../store/game';
import { useGetMyPlayerData } from '../../../hooks/useGetMyPlayerData';
import { navigationPaths } from '../../../config/navigationPaths';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
export const Menu = () => {
  const [isOpen, openOverlay] = useState(false);
  const [surrenderConfirm, showSurrenderConfirm] = useState(false);
  const player = useGetMyPlayerData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSurrender = () => {
    showSurrenderConfirm(false);
    dispatch(surrender());
  };

  const leaveTheGame = () => {
    navigate(navigationPaths.mainRoom);
    dispatch(clearActiveGame());
  };

  const renderSurrenderAndLeave = () => {
    if (!player?.status) {
      return (
        <div
          className={cx('option')}
          onClick={() => {
            showSurrenderConfirm(true);
            openOverlay(false);
          }}
        >
          Surrender
        </div>
      );
    } else {
      return (
        <div
          className={cx('option')}
          onClick={() => {
            openOverlay(false);
            leaveTheGame();
            dispatch(leaveGame());
          }}
        >
          Leave the game
        </div>
      );
    }
  };

  return (
    <>
      <Confirmation
        onConfirm={onSurrender}
        onCancel={() => showSurrenderConfirm(false)}
        confirmText="Yes"
        cancelText="No"
        isVisible={surrenderConfirm}
        title="Surrender"
      />
      <div className={cx('menu')}>
        <img
          src={svg.menu}
          alt=""
          className={cx('burger')}
          onClick={() => openOverlay(true)}
        />
        {isOpen && (
          <div className={cx('overlay')}>
            <img
              src={svg.timesBlack}
              className={cx('times')}
              alt=""
              onClick={() => openOverlay(false)}
            />
            {renderSurrenderAndLeave()}
            <div className={cx('option')}>Report a player</div>
          </div>
        )}
      </div>
    </>
  );
};
