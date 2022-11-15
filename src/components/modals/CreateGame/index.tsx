import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { TextInput } from '../../common/TextInput';
import { Button } from '../../common/Button';
import { svg } from '../../../assets/svg/svg';
import { useDispatch, useSelector } from 'react-redux';
import { createGame } from '../../../store/main-room';
import { ModalLayout } from '../../common/ModalLayout';
import { appState, closeModal, ModalType } from '../../../store/app';

const cx = classNames.bind(styles);

export const CreateGame = () => {
  const { modal } = useSelector(appState);
  const [min, setMin] = useState(2);
  const [max, setMax] = useState(6);
  const [isPrivate, setPrivate] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setPrivate(false);
    setPassword('');
    setMin(2);
    setMax(6);
  }, []);

  if (modal !== ModalType.CreateGame) return null;

  const minSelection = [2, 3, 4, 5, 6].map((item) => {
    return (
      <div
        onClick={() => setMin(item)}
        key={item}
        className={cx(item === min && 'active')}
      >
        {item}
      </div>
    );
  });
  const maxSelection = [2, 3, 4, 5, 6].map((item) => {
    return (
      <div
        onClick={() => setMax(item)}
        key={item}
        className={cx(item === max && 'active')}
      >
        {item}
      </div>
    );
  });

  const onClose = () => {
    dispatch(closeModal());
  };

  const submit = () => {
    if (isPrivate && !password) {
      return setError('Password is required');
    }
    dispatch(
      createGame({
        password,
        isPrivate,
        maxPlayers: max,
        minPlayers: min,
      }),
    );
  };
  return (
    <ModalLayout onClose={onClose}>
      <div className={cx('modal')}>
        <h2 className={cx('title')}>Create custom game</h2>
        <img src={svg.times} alt="" className={cx('close')} onClick={onClose} />
        <div className={cx('container')}>
          <div className={cx('side-left')}>
            <div className={cx('map')}>Map: Earth</div>
            <div className={cx('players')}>Min players:</div>
            <div className={cx('selection')}>{minSelection}</div>
            <div className={cx('players')}>Max players:</div>
            <div className={cx('selection')}>{maxSelection}</div>
          </div>
          <div className={cx('side-right')}>
            <div className={cx('custom-icon')}>
              Custom icon: <div className={cx('selection')} />
            </div>
            <div className={cx('private')}>
              Private game{' '}
              <div
                onClick={() => setPrivate(!isPrivate)}
                className={cx('checkbox', isPrivate && 'checkbox--active')}
              >
                {isPrivate && (
                  <img src={svg.check} alt="" className={cx('check')} />
                )}
              </div>
            </div>
            {isPrivate && (
              <>
                <TextInput
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  className={cx('input')}
                />
                {error && <div className={cx('error')}>{error}</div>}
              </>
            )}
          </div>
        </div>
        <Button color="light" onClick={submit} className={cx('button')}>
          Create
        </Button>
      </div>
    </ModalLayout>
  );
};
