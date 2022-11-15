import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

interface Props {
  text: string;
  onClick: () => void;
  className: string;
  to: string;
}
export const AuthButton: React.FC<Props> = ({
  text,
  onClick,
  className,
  to,
}) => {
  return (
    <Link to={to} className={cx('wrapper', className)} onClick={onClick}>
      <div className={cx('button')} />
      <div className={cx('text')}>{text}</div>
    </Link>
  );
};
