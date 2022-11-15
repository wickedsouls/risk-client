import React from 'react';
import { Button } from '../../../components/common/Button';
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
        className={cx('button')}
        color="dark"
      >
        Create custom game
      </Button>
      <Button className={cx('button')} color="dark">
        Join first available
      </Button>
      <Button onClick={() => null} className={cx('button')} color="dark">
        Go rated!
      </Button>
    </div>
  );
};
