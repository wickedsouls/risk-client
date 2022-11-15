import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { svg } from '../../../assets/svg/svg';
import { Player } from '../../../store/game';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
  players?: Player[];
}
export const ListOfPlayers: React.FC<Props> = (props) => {
  const { players, className } = props;

  const renderPlayers = () => {
    if (!players) return null;
    return players.map((player) => {
      return (
        <div className={cx('player', className)} key={player.id}>
          <div className={cx('image')}>
            <img src={svg.rifleman} className={cx('icon')} alt="" />
          </div>
          <div className={cx('info')}>
            <div className={cx('title')}>Gladiator</div>
            <div className={cx('name')}>{player.username}</div>
            <div className={cx('rating')}>Rating: {2015}</div>
            <div className={cx('achievements')}>
              <img src={svg.badge} className={cx('icon')} alt="" />
              <img src={svg.badge} className={cx('icon')} alt="" />
              <img src={svg.badge} className={cx('icon')} alt="" />
            </div>
          </div>
        </div>
      );
    });
  };
  return <>{renderPlayers()}</>;
};
