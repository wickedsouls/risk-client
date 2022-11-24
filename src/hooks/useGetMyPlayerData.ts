import { useSelector } from 'react-redux';
import { gameState } from '../store/game';
import { userState } from '../store/user';

export const useGetMyPlayerData = () => {
  const { activeGame } = useSelector(gameState);
  const { data } = useSelector(userState);
  return activeGame?.players.find((player) => player.id === data.id);
};
