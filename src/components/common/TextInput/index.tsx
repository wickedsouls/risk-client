import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
  placeholder?: string;
}
export const TextInput: React.FC<Props> = (props) => {
  const { className, placeholder } = props;
  return (
    <div className={cx('text-input', className)}>
      <input className={cx('input')} type="text" placeholder={placeholder} />
    </div>
  );
};
