import { useEffect } from 'react';
import { getAllGames } from '../../store/main-room';
import { gameState, getGameInfo } from '../../store/game';
import { useDispatch, useSelector } from 'react-redux';
import { appState } from '../../store/app';
import { authState } from '../../store/auth';
import { useParams } from 'react-router-dom';

export const useGetGameInfo = () => {
  const { activeGame } = useSelector(gameState);
  const { connected } = useSelector(appState);
  const { isAuthenticated } = useSelector(authState);
  const { gameId } = useParams() as { gameId: string; type: string };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!activeGame && connected && isAuthenticated) {
      console.log(connected, activeGame, isAuthenticated);
      dispatch(getAllGames());
      dispatch(getGameInfo({ gameId: gameId as string }));
    }
  }, [activeGame, connected, isAuthenticated]);
};
