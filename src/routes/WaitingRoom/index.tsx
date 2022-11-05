import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import {
  Map,
  Player,
  Controls,
  EmptySpot,
  Chat,
} from '../../components/waiting-room';
const cx = classNames.bind(styles);

export const WaitingRoom = () => {
  return (
    <div className={cx('waiting-room')}>
      <div className={cx('container')}>
        <Map />
        <Controls />
        <div className={cx('players')}>
          <Player
            title="Dictator"
            name="NewmenofeId"
            rating={2010}
            className={cx('player')}
          />
          <Player
            title="Putin"
            name="VougHa"
            rating={1920}
            className={cx('player')}
          />
          <Player
            title="Dictator"
            name="ArCimzuk"
            rating={1675}
            className={cx('player')}
          />
          <Player
            title="Duelist"
            name="RolirremKelimo"
            rating={1675}
            className={cx('player')}
          />
          <Player
            title="Gladiator"
            name="OticaOvga"
            rating={1675}
            className={cx('player')}
          />
          <EmptySpot className={cx('player')} />
        </div>
        <Chat />
      </div>
    </div>
  );
};
