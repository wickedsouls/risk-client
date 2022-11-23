import { Continent, Player, TurnState } from './types';
import { checkIfContinentWasTaken, checkIfPlayerLost } from './utils';

describe('Continent taken', () => {
  it('should find conquered continent', () => {
    const prevContinents: { [key: string]: Continent<string> } = {
      a: { name: 'a', reward: 1, zoneCount: 1 },
      b: { name: 'b', reward: 1, zoneCount: 1 },
    };
    const nextContinents: { [key: string]: Continent<string> } = {
      a: { name: 'a', reward: 1, zoneCount: 1 },
      b: { name: 'b', reward: 1, zoneCount: 1, owner: '2' },
    };
    const taken = checkIfContinentWasTaken(prevContinents, nextContinents);
    expect(taken).toBeDefined();
  });
});

describe('Eliminate player', () => {
  it('should find eliminated player', () => {
    const prevPlayers: Player[] = [
      { username: 'a', id: '1' },
      { username: 'b', id: '2' },
    ];
    const nextPlayers: Player[] = [
      { username: 'a', id: '1' },
      { username: 'b', id: '2', status: 'defeat' },
    ];
    const eliminated = checkIfPlayerLost(
      prevPlayers,
      nextPlayers,
      TurnState.Attack,
    );
    expect(eliminated).toBeDefined();
    expect(eliminated?.id).toBe('2');
    expect(eliminated?.status).toBe('defeat');
  });
  it('should not find eliminated player', () => {
    const prevPlayers: Player[] = [
      { username: 'a', id: '1' },
      { username: 'b', id: '2' },
    ];
    const nextPlayers: Player[] = [
      { username: 'a', id: '1' },
      { username: 'b', id: '2' },
    ];
    const eliminated = checkIfPlayerLost(
      prevPlayers,
      nextPlayers,
      TurnState.Attack,
    );
    expect(eliminated).toBeUndefined();
  });
  it('should not find eliminated player when one is out', () => {
    const prevPlayers: Player[] = [
      { username: 'a', id: '1' },
      { username: 'b', id: '2', status: 'defeat' },
    ];
    const nextPlayers: Player[] = [
      { username: 'a', id: '1' },
      { username: 'b', id: '2', status: 'defeat' },
    ];
    const eliminated = checkIfPlayerLost(
      prevPlayers,
      nextPlayers,
      TurnState.Attack,
    );
    expect(eliminated).toBeUndefined();
  });
});
