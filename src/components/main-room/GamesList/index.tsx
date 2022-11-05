import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { OpenedGame } from '../OpenedGame';
import { Maps } from '../../../config/constants';
import { useNavigate } from 'react-router-dom';
import { navigationPaths } from '../../../config/navigationPaths';

const cx = classNames.bind(styles);

export const GamesList = () => {
  const navigate = useNavigate();
  return (
    <div className={cx('games-list')}>
      <h2 className={cx('title')}>Join the custom game</h2>
      <OpenedGame
        state="registering"
        map={Maps.EARTH}
        maxPlayers={6}
        registeredPlayers={5}
        onJoin={() => navigate(navigationPaths.waitingRoom)}
      />
      <OpenedGame
        state="registering"
        map={Maps.EARTH}
        maxPlayers={6}
        registeredPlayers={1}
        onJoin={() => navigate(navigationPaths.waitingRoom)}
      />
      <OpenedGame
        state="registering"
        map={Maps.EARTH}
        maxPlayers={6}
        registeredPlayers={2}
        onJoin={() => navigate(navigationPaths.waitingRoom)}
        isPrivate
      />
      <OpenedGame
        state="in-progress"
        maxPlayers={4}
        registeredPlayers={4}
        onJoin={() => null}
        map={Maps.EARTH}
        isPrivate
      />
      <OpenedGame
        state="completed"
        maxPlayers={6}
        registeredPlayers={6}
        onJoin={() => null}
        map={Maps.EARTH}
        isPrivate
      />
    </div>
  );
};
