import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  error?: string;
}
export const TextInput: React.FC<Props> = ({ className, error, ...props }) => {
  return (
    <div className={cx('text-input', className)}>
      <input className={cx('input', error && 'input--error')} {...props} />
      {error && <div className={cx('error')}>{error}</div>}
    </div>
  );
};
