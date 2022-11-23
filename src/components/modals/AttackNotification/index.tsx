import React from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  onClose: () => void;
  isVisible?: boolean;
}

export const AttackNotification: React.FC<Props> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <ModalLayout onClose={onClose} className={cx('layout')}>
      <div className={cx('modal')} onClick={onClose}>
        <h3 className={cx('title')}>Attack!</h3>
        <div className={cx('text-1')}>
          Select the zone you want to attack from
        </div>
        <div className={cx('text-1')}>Click on enemy land to attack</div>
        <div className={cx('text-2')}>You can only attack your neighbours</div>
      </div>
    </ModalLayout>
  );
};
