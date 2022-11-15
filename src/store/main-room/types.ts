export interface CreateGame {
  password?: string;
  isPrivate?: boolean;
  maxPlayers: number;
  minPlayers: number;
}
