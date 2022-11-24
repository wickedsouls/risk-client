import React from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { svg } from '../../../assets/svg/svg';
import { useGetMyPlayerData } from '../../../hooks/useGetMyPlayerData';
import { PlayerStatus } from '../../../store/game';

const cx = classNames.bind(styles);

interface Props {
  armies: number;
  onClose: () => void;
  isVisible?: boolean;
}

export const YourTurnNotification: React.FC<Props> = ({
  armies,
  isVisible,
  onClose,
}) => {
  const player = useGetMyPlayerData();

  if (!isVisible || player?.status === PlayerStatus.Win) return null;
  return (
    <ModalLayout onClose={onClose} className={cx('layout')}>
      <div className={cx('modal')} onClick={onClose}>
        <h3 className={cx('title')}>Your Turn!</h3>
        <div className={cx('text-1')}>Your army this turn</div>
        <div className={cx('row')}>
          {new Array(armies).fill(null).map((_, i) => {
            return (
              <img key={i} src={svg.rifleman} className={cx('army')} alt="" />
            );
          })}
        </div>
        <div className={cx('text-2')}>Click on your lands to place an army</div>
      </div>
    </ModalLayout>
  );
};
