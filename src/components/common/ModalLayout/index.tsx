import React, { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props extends PropsWithChildren {
  onClose: () => void;
  className?: string;
}
export const ModalLayout: React.FC<Props> = ({
  onClose,
  children,
  className,
}) => {
  return (
    <>
      <div className={cx('background')} onClick={onClose} />
      <div className={cx('modal', className)}>{children}</div>
    </>
  );
};
