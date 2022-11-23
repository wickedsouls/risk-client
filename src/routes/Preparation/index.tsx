import React, { useEffect } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Map } from './Map';
import { ListOfPlayers } from './ListOfPlayers';
import { Controls } from './Controls';
import { EmptySpots } from './EmptySpots';
import { Chat } from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { clearGames, gameState, joinGame } from '../../store/game';
import { appState, closeModal, ModalType, openModal } from '../../store/app';
import { useNavigate, useParams } from 'react-router-dom';
import { JoinPrivateGame } from '../../components/modals/JoinPrivateGame';
import { SingleButtonNotification } from '../../components/modals/SingleButtonNotification';
import { navigationPaths } from '../../config/navigationPaths';
import { ErrorCodes } from '../../common/errors';
import { NotFound } from './NotFound';
import { useRedirectActiveGame } from '../../hooks/useRedirectActiveGame';

const cx = classNames.bind(styles);

export const Preparation = () => {
  const { activeGame, gameCanceled, errors } = useSelector(gameState);
  const { connected } = useSelector(appState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { type, gameId } = useParams<{ gameId: string; type: string }>();

  useRedirectActiveGame();

  useEffect(() => {
    if (connected && gameId && !activeGame && type == 'public') {
      dispatch(joinGame({ gameId }));
    }
  }, [connected, gameId]);

  useEffect(() => {
    if (type === 'private' && !activeGame) {
      dispatch(openModal(ModalType.JoinPrivateGame));
    }
  }, []);

  const onClick = () => {
    dispatch(closeModal());
    dispatch(clearGames());
    navigate(navigationPaths.mainRoom);
  };

  if (errors?.joinGame === ErrorCodes.GAME_NOT_FOUND) return <NotFound />;

  return (
    <div className={cx('preparation')}>
      {type === 'private' && gameId && <JoinPrivateGame gameId={gameId} />}
      <SingleButtonNotification
        text="Back to the main room"
        onClick={onClick}
        title="Game was canceled"
        isVisible={gameCanceled}
      />
      <div className={cx('container')}>
        <Map />
        <Controls />
        <div className={cx('players')}>
          <ListOfPlayers
            players={activeGame?.players}
            className={cx('player')}
          />
          <EmptySpots
            maxPlayers={activeGame?.maxPlayers}
            players={activeGame?.players}
            className={cx('player')}
          />
        </div>
        <Chat />
      </div>
    </div>
  );
};
