import React from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../common/Button';

const cx = classNames.bind(styles);

interface Props {
  title?: string;
  isVisible?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  cancelText: string;
}

export const Confirmation: React.FC<Props> = ({
  title,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  isVisible,
}) => {
  if (!isVisible) return null;
  return (
    <ModalLayout className={cx('modal')} onClose={onCancel}>
      <h4 className={cx('title')}>{title}</h4>
      <div className={cx('row')}>
        <Button className={cx('button')} color="light" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button className={cx('button')} color="light" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </ModalLayout>
  );
};
