import { useDispatch } from 'react-redux';
import { sendMessage } from '../store/game';
import React, { useState } from 'react';

export const useChat = () => {
  const [inputValue, setValue] = useState('');
  const dispatch = useDispatch();

  const send = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    dispatch(sendMessage({ message: inputValue }));
    setValue('');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return { inputValue, onInputChange, send };
};
