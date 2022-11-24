import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { svg } from '../../../assets/svg/svg';
import { Confirmation } from '../../../components/modals/Confirmation';
import { useDispatch } from 'react-redux';
import { surrender } from '../../../store/game';
import { useNavigate } from 'react-router-dom';
import { navigationPaths } from '../../../config/navigationPaths';

const cx = classNames.bind(styles);
export const Menu = () => {
  const [isOpen, openOverlay] = useState(false);
  const [surrenderConfirm, showSurrenderConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSurrender = () => {
    showSurrenderConfirm(false);
    dispatch(surrender());
    navigate(navigationPaths.mainRoom);
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
            <div
              className={cx('option')}
              onClick={() => {
                showSurrenderConfirm(true);
                openOverlay(false);
              }}
            >
              Surrender
            </div>
            <div className={cx('option')}>Leave the game</div>
            <div className={cx('option')}>Report a player</div>
          </div>
        )}
      </div>
    </>
  );
};
