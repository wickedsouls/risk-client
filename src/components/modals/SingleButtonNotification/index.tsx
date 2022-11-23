import React from 'react';
import { ModalLayout } from '../../common/ModalLayout';
import { Button } from '../../common/Button';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  onClick: () => void;
  title: string;
  isVisible?: boolean;
  text: string;
}

export const SingleButtonNotification: React.FC<Props> = ({
  onClick,
  title,
  isVisible,
  text,
}) => {
  if (!isVisible) return null;
  return (
    <ModalLayout onClose={onClick} className={cx('modal')}>
      <h4 className={cx('title')}>{title}</h4>
      <Button className={cx('button')} color="light" onClick={onClick}>
        {text}
      </Button>
    </ModalLayout>
  );
};
