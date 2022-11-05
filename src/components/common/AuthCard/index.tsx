import React, { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props extends PropsWithChildren {
  className: string;
  title: string;
}
export const AuthCard: React.FC<Props> = ({ className, title, children }) => {
  return (
    <div className={cx('card', className)}>
      <h2 className={cx('title')}>{title}</h2>
      <div className={cx('content')}>{children}</div>
    </div>
  );
};
