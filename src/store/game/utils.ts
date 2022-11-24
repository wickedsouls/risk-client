import { Continent, Player, PlayerStatus, TurnState } from './types';
import { values } from 'lodash';

export const checkIfContinentWasTaken = (
  _prevContents?: {
    [key: string]: Continent<string>;
  },
  _nextContents?: { [key: string]: Continent<string> },
) => {
  if (!_nextContents || !_prevContents) return;
  const prevContinents = values(_prevContents);
  const nextContinents = values(_nextContents);
  const conquested = nextContinents.find((_, i) => {
    return !prevContinents[i].owner && nextContinents[i].owner;
  });
  return conquested;
};

export const checkIfPlayerLost = (
  prevPlayers?: Player[],
  nextPlayers?: Player[],
  turnState?: TurnState,
): Player | undefined => {
  if (turnState !== TurnState.Attack || !prevPlayers || !nextPlayers) return;
  const eliminated = nextPlayers.find((_, i) => {
    return (
      prevPlayers[i]?.status !== PlayerStatus.Defeat &&
      nextPlayers[i]?.status === PlayerStatus.Defeat
    );
  });
  return eliminated;
};

export const checkIfPlayerSurrendered = (
  prevPlayers?: Player[],
  nextPlayers?: Player[],
): Player | undefined => {
  if (!prevPlayers || !nextPlayers) return;
  const surrendered = nextPlayers.find((_, i) => {
    return (
      !prevPlayers[i]?.status &&
      nextPlayers[i]?.status === PlayerStatus.Surrender
    );
  });
  return surrendered;
};
