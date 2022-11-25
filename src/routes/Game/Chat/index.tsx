import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../../components/common/Button';
import { useSelector } from 'react-redux';
import { gameState } from '../../../store/game';
import { svg } from '../../../assets/svg/svg';
import { useChat } from '../../../hooks/useChat';
import moment from 'moment';

const cx = classNames.bind(styles);

export const Chat = () => {
  const { send, inputValue, onInputChange } = useChat();
  const { chat, activeGame } = useSelector(gameState);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scroll(0, historyRef.current?.scrollHeight);
    }
  }, [chat]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  const getColor = (playerId: string) => {
    if (!activeGame) return;
    const player = activeGame.players.find((p) => p.id === playerId);
    return player?.color;
  };

  const renderMessages = () => {
    return chat?.map((message, i) => {
      if (!message.message) {
        return (
          <p className={cx('message')} key={i}>
            ---- <time>{moment().format('hh:mm:ss')}</time> ---
          </p>
        );
      }
      return (
        <p className={cx('message')} key={i}>
          <strong
            className={cx('name', `name--${getColor(message.player.id)}`)}
          >
            {message.player?.username}:
          </strong>
          <span>{message.message}</span>
        </p>
      );
    });
  };

  return (
    <div className={cx('chat')}>
      <div className={cx('history')} ref={historyRef}>
        {renderMessages()}
      </div>
      <form onSubmit={send} className={cx('form')}>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={onInputChange}
          type="text"
          className={cx('input')}
        />
        <Button type="submit" className={cx('button')} color="dark">
          <img src={svg.send} className={cx('icon')} alt="" />
        </Button>
      </form>
    </div>
  );
};
