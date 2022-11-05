import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../common/Button';

const cx = classNames.bind(styles);

export const Controls = () => {
  return (
    <div className={cx('controls')}>
      <Button
        onClick={() => null}
        text="Start the game"
        className={cx('button-start')}
        color="light"
      />
    </div>
  );
};
