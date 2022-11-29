import React, { useEffect, useState } from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { svg } from '../../../assets/svg/svg';

const cx = classNames.bind(styles);

interface Props {
  onClose: () => void;
  isVisible?: boolean;
  zoneFrom?: string;
  zoneTo?: string;
  maxAmount: number;
  onAttack: (amount: number) => void;
}

export const AttackAction: React.FC<Props> = ({
  isVisible,
  onClose,
  onAttack,
  maxAmount,
  zoneTo,
  zoneFrom,
}) => {
  const [amount, changeAmount] = useState(maxAmount);

  useEffect(() => {
    changeAmount(maxAmount - 1);
  }, [maxAmount]);

  const increment = () => {
    if (amount === maxAmount - 1) return;
    changeAmount(amount + 1);
  };

  const decrement = () => {
    if (amount === 1) return;
    changeAmount(amount - 1);
  };

  if (!isVisible) return null;

  return (
    <ModalLayout onClose={onClose} className={cx('layout')}>
      <div className={cx('modal')}>
        <h3 className={cx('title')}>
          {zoneFrom} <img src={svg.attack} alt="" className={cx('icon')} />{' '}
          {zoneTo}
        </h3>
        <div className={cx('text')}>Use army on the attack</div>
        <div className={cx('controls')}>
          <div className={cx('decrement')} onClick={decrement} />
          <div className={cx('amount')}>{amount}</div>
          <div className={cx('increment')} onClick={increment} />
        </div>
        <div className={cx('button')} onClick={() => onAttack(amount)}>
          Pulti
        </div>
      </div>
    </ModalLayout>
  );
};
