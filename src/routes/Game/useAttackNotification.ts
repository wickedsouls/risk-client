import { useEffect, useState } from 'react';
import { gameState, TurnState } from '../../store/game';
import { useMyTurn } from './useMyTurn';
import { useSelector } from 'react-redux';

export const useAttackNotification = () => {
  const [attackNotification, showAttackNotification] = useState(false);
  const { activeGame } = useSelector(gameState);
  const { myTurn } = useMyTurn();

  useEffect(() => {
    if (!myTurn) return;
    if (myTurn && activeGame?.turnState === TurnState.Attack) {
      showAttackNotification(true);
      const timeOut = setTimeout(() => {
        showAttackNotification(false);
      }, 2000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [myTurn, activeGame?.turnState]);

  return { attackNotification, showAttackNotification };
};
