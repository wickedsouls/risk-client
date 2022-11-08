export interface RegistrationResponse {
  accessToken: string;
}

export interface RegistrationPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AccessToken {
  accessToken: string;
}
