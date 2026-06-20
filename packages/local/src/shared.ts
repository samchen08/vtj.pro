export interface ApiRequest {
  type: string;
  data: any;
  query: any;
}

export interface ApiResponse {
  code: number;
  msg: string;
  data: any;
  stack?: any;
  success: boolean;
}

export enum Result {
  Success = 0,
  Fail = 1
}

export const success = (data: any): ApiResponse => {
  return {
    code: Result.Success,
    msg: 'success',
    data,
    success: true
  };
};

export const fail = (
  msg: any,
  data: any = null,
  stack: any = null
): ApiResponse => {
  return {
    code: Result.Fail,
    msg: msg?.message || msg,
    data,
    stack,
    success: false
  };
};

export const CLIENT_DIR = '__vtj__';
