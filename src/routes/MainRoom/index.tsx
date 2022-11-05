import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Logo } from '../../components/common/Logo';
import { Controls } from '../../components/main-room/Controls';
import { SideLeft } from '../../components/main-room/SideLeft';
import { SideRight } from '../../components/main-room/SideRight';
import { GamesList } from '../../components/main-room/GamesList';
import { CreateGame } from '../../components/modals/CreateGame';

const cx = classNames.bind(styles);

export const MainRoom = () => {
  const [createGameModal, showCreateGameModal] = useState(false);
  return (
    <>
      <CreateGame
        onClose={() => showCreateGameModal(false)}
        isVisible={createGameModal}
      />
      <div className={cx('main-room')}>
        <Logo className={cx('logo')} />
        <div className={cx('container')}>
          <SideLeft />
          <div className={cx('games')}>
            <Controls showCreateGameModal={showCreateGameModal} />
            <GamesList />
          </div>
          <SideRight />
        </div>
      </div>
    </>
  );
};
