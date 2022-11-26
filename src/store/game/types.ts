export interface Player {
  id: string;
  username: string;
  color?: string;
  status?: PlayerStatus;
  title?: string;
  cards?: GameCard[];
}

export enum GameCard {
  'Jack' = 'Joker',
  'Queen' = 'Queen',
  'King' = 'King',
  'Ace' = 'Ace',
}

export enum TurnState {
  'Prepare' = 'Prepare',
  'PlaceArmies' = 'Place-Armies',
  'Attack' = 'Attack',
  'Move' = 'Move',
}

export enum GameStatus {
  'Registering' = 'Registering',
  'InProgress' = 'InProgress',
  'Completed' = 'Completed',
  'Canceled' = 'Canceled',
}

export enum PlayerStatus {
  Win = 'Win',
  Defeat = 'Defeat',
  Deserter = 'Deserter',
  Surrender = 'Surrender',
}

export interface Game {
  createdBy: Player;
  players: Player[];
  currentPlayer: Player;
  gameId: string;
  gameStatus: GameStatus;
  password?: string;
  isPrivate?: boolean;
  maxPlayers: number;
  minPlayers: number;
  setsOfCardsUsed: number;

  timeout?: number;
  currentPlayerIndex?: number;
  armiesFromCards?: number;
  map?: Map<string, string>;
  armiesThisTurn?: number;
  turnState?: TurnState;
}

export interface Map<Z, C> {
  name: string;
  zones: {
    [key: string]: Zone<Z, C>;
  };
  continents: {
    [key: string]: Continent<C>;
  };
}

export interface Zone<Z, C> {
  name: Z;
  owner?: string;
  reward: number;
  armies?: number;
  neighbours: Z[];
  continent: C;
}

export interface Continent<C> {
  name: C;
  reward: number;
  owner?: string;
  zoneCount: number;
}

export interface Message {
  createdAt: Date;
  player: Player;
  message: string;
}
