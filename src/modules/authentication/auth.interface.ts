export interface FacebookData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: string;
}

export interface LoginParams {
  grantType: string;
  userName: string;
  password: string;
  token: string;
}

export interface SignTokenResponse {
  accessToken: string;
  tokenType: string;
}
