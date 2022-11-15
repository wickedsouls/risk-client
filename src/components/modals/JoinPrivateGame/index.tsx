import React from 'react';
import { Form, Formik } from 'formik';
import { TextInput } from '../../formik';
import { useDispatch, useSelector } from 'react-redux';
import { gameState, joinGame } from '../../../store/game';
import { ModalLayout } from '../../common/ModalLayout';
import { appState, closeModal, ModalType } from '../../../store/app';
import { Button } from '../../common/Button';
import * as Yup from 'yup';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { svg } from '../../../assets/svg/svg';

const cx = classNames.bind(styles);

const initialValues = { password: '' };

const validationSchema = Yup.object({
  password: Yup.string().required(),
});

interface Props {
  gameId: string;
}

export const JoinPrivateGame: React.FC<Props> = ({ gameId }) => {
  const dispatch = useDispatch();
  const { modal } = useSelector(appState);
  const { errors } = useSelector(gameState);

  const onClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = (values: { password: string }) => {
    dispatch(joinGame({ password: values.password, gameId }));
  };

  if (modal !== ModalType.JoinPrivateGame) return null;

  return (
    <ModalLayout onClose={onClose}>
      <div className={cx('modal')}>
        <img src={svg.times} alt="" className={cx('close')} onClick={onClose} />
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={onSubmit}
        >
          <Form>
            <h3 className={cx('title')}>Join the private game</h3>
            <TextInput
              placeholder="Password"
              name="password"
              className={cx('input')}
            />
            <Button className={cx('button')} color="light" type="submit">
              Join
            </Button>
            {errors.joinGame && (
              <div className={cx('error')}>{errors.joinGame}</div>
            )}
          </Form>
        </Formik>
      </div>
    </ModalLayout>
  );
};
