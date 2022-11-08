import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className: string;
  isLoading?: boolean;
  text?: string;
  color: 'dark' | 'light';
}
export const Button: React.FC<Props> = ({
  onClick,
  isLoading,
  className,
  color,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={() => !isLoading && onClick && onClick()}
      className={cx(
        'button',
        isLoading && 'button--loading',
        `button--${color}`,
        className,
      )}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
