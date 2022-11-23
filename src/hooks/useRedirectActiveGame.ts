import { useEffect } from 'react';
import { gameState, GameStatus } from '../store/game';
import { navigationPaths } from '../config/navigationPaths';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useRedirectActiveGame = () => {
  const { activeGame } = useSelector(gameState);
  const navigate = useNavigate();
  useEffect(() => {
    const gameType = activeGame?.isPrivate ? 'private' : 'public';
    if (activeGame?.gameStatus === GameStatus.Registering) {
      navigate(
        `${navigationPaths.preparation}/${activeGame.gameId}/${gameType}`,
      );
    } else if (activeGame?.gameStatus === GameStatus.InProgress) {
      navigate(`${navigationPaths.game}/${activeGame.gameId}/${gameType}`);
    }
  }, [activeGame]);
};
