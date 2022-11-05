import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  className: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <h1 className={cx('logo', className)}>
      <strong>RISK</strong>
      <br />
      <span>Game Online</span>
    </h1>
  );
};
