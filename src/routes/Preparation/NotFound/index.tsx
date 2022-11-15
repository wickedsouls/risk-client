import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { navigationPaths } from '../../../config/navigationPaths';

const cx = classNames.bind(styles);

export const NotFound = () => {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();
  return (
    <div className={cx('not-found')}>
      <div className={cx('box')}>
        <h1 className={cx('title')}>Not found</h1>
        <p className={cx('desc')}>
          Game <strong>{gameId}</strong> has ended or does not exist
        </p>
        <div
          className={cx('button')}
          onClick={() => navigate(navigationPaths.mainRoom)}
        >
          Back to the the main window
        </div>
      </div>
    </div>
  );
};
