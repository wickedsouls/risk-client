import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../../components/common/Button';
import { useSelector } from 'react-redux';
import { gameState } from '../../../store/game';
import { useChat } from '../../../hooks/useChat';

const cx = classNames.bind(styles);

export const Chat = () => {
  const { chat } = useSelector(gameState);
  const { send, onInputChange, inputValue } = useChat();
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current?.focus();
    }
  }, []);

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
          value={inputValue}
          onChange={onInputChange}
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
