export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  tel: number;
  residence: string;
  email: string;
  password: string;
}


export class ApiTokenDto {
  accessToken: string;
  refreshToken: string;
}