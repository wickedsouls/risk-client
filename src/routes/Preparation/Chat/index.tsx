import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { gameState, sendMessage } from '../../../store/game';

const cx = classNames.bind(styles);

export const Chat = () => {
  const dispatch = useDispatch();
  const { chat } = useSelector(gameState);
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current?.focus();
    }
  }, []);

  const send = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendMessage({ message: value }));
    setValue('');
  };

  const renderMessages = () => {
    return chat?.map((message, i) => {
      return (
        <p className={cx('message')} key={i}>
          <strong>{message.player?.username}:</strong>
          <span>{message.message}</span>
        </p>
      );
    });
  };

  return (
    <div className={cx('chat')}>
      <div className={cx('history')}>{renderMessages()}</div>
      <form onSubmit={send} className={cx('form')}>
        <input
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className={cx('input')}
        />
        <Button type="submit" className={cx('button')} color="dark">
          Send
        </Button>
      </form>
    </div>
  );
};
