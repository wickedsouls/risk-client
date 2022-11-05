import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../common/Button';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
}
export const EmptySpot: React.FC<Props> = ({ className }) => {
  return (
    <div className={cx('empty', className)}>
      <Button
        onClick={() => null}
        text="Invite a friend"
        className={cx('button')}
        color="light"
      />
      <div className={cx('waiting')}>Waiting for player..</div>
    </div>
  );
};
