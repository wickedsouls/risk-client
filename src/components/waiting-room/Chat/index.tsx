import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../common/Button';

const cx = classNames.bind(styles);

export const Chat = () => {
  return (
    <div className={cx('chat')}>
      <div className={cx('history')}>
        <p className={cx('message')}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          eaque eius error exercitationem illo modi necessitatibus vitae
          voluptatum? Necessitatibus, voluptatum!
        </p>
        <p className={cx('message')}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          eaque eius error exercitationem illo modi necessitatibus vitae
          voluptatum? Necessitatibus, voluptatum!
        </p>
      </div>
      <div className={cx('my-message')}>
        <input type="text" className={cx('input')} />
        <Button
          onClick={() => null}
          text="Send"
          className={cx('button')}
          color="dark"
        />
      </div>
    </div>
  );
};
