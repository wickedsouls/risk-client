export interface Player {
  id: string;
  username: string;
}

export enum GameStatus {
  'Registering' = 'Registering',
  'InProgress' = 'InProgress',
  'Completed' = 'Completed',
  'Canceled' = 'Canceled',
}

export interface Game {
  createdBy: Player;
  players: Player[];
  currentPlayer: string;
  gameId: string;
  gameStatus: GameStatus;
  password?: string;
  isPrivate?: boolean;
  maxPlayers: number;
  minPlayers: number;
}

export interface Message {
  createdAt: Date;
  player: Player;
  message: string;
}
