import { useEffect, useState } from 'react';
import { gameState, TurnState } from '../../store/game';
import { useMyTurn } from './useMyTurn';
import { useSelector } from 'react-redux';

export const usePlaceArmyNotification = () => {
  const [placeArmyModal, showPlaceArmyModal] = useState(false);
  const { activeGame } = useSelector(gameState);
  const { myTurn } = useMyTurn();

  useEffect(() => {
    if (!myTurn) return;
    if (myTurn && activeGame?.turnState === TurnState.PlaceArmies) {
      showPlaceArmyModal(true);
      const timeOut = setTimeout(() => {
        showPlaceArmyModal(false);
      }, 2000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [myTurn, activeGame?.turnState]);

  return { placeArmyModal, showPlaceArmyModal };
};
