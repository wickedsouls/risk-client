import { useSelector } from 'react-redux';
import { gameState } from '../../store/game';
import { userState } from '../../store/user';

export const useMyTurn = () => {
  const { activeGame } = useSelector(gameState);
  const user = useSelector(userState);
  if (!user || !activeGame) return { myTurn: false };
  return { myTurn: activeGame?.currentPlayer?.id === user.data.id };
};
