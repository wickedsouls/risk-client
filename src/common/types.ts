import { ErrorCodes } from './errors';

export interface HttpResponseError {
  statusText: string;
  message: string;
  status: string;
}

export interface GameError {
  error: boolean;
  message: ErrorCodes;
}
