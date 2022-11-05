import React from 'react';
import { Button } from '../../common/Button';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { navigationPaths } from '../../../config/navigationPaths';

const cx = classNames.bind(styles);

interface Props {
  showCreateGameModal: (value: boolean) => void;
}
export const Controls: React.FC<Props> = ({ showCreateGameModal }) => {
  const navigate = useNavigate();
  return (
    <div className={cx('controls')}>
      <Button
        onClick={() => showCreateGameModal(true)}
        text="Create custom game"
        className={cx('button')}
        color="dark"
      />
      <Button
        onClick={() => navigate(navigationPaths.waitingRoom)}
        text="Join first available"
        className={cx('button')}
        color="dark"
      />
      <Button
        onClick={() => null}
        text="Go rated!"
        className={cx('button')}
        color="dark"
      />
    </div>
  );
};
