import { useSelector } from 'react-redux';
import { gameState } from '../store/game';
import { userState } from '../store/user';

export const useIsGameAdmin = () => {
  const { activeGame } = useSelector(gameState);
  const user = useSelector(userState);
  return activeGame?.createdBy.id === user.data.id;
};
