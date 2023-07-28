export interface ApiRequest {
  type: string;
  data: any;
}

export interface ApiResponse {
  code: number;
  msg: string;
  data: any;
}

export enum Result {
  Success = 0,
  Fail = 1
}

export const success = (data: any): ApiResponse => {
  return {
    code: Result.Success,
    msg: 'success',
    data
  };
};

export const fail = (msg: string): ApiResponse => {
  return {
    code: Result.Fail,
    msg,
    data: null
  };
};
