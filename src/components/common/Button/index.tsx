import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  onClick: () => void;
  text: string;
  className: string;
  isLoading?: boolean;
  color: 'dark' | 'light';
}
export const Button: React.FC<Props> = ({
  onClick,
  text,
  isLoading,
  className,
  color,
}) => {
  return (
    <div
      onClick={onClick}
      className={cx(
        'button',
        isLoading && 'button--loading',
        `button--${color}`,
        className,
      )}
    >
      {text}
    </div>
  );
};
