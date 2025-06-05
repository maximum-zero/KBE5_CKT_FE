export interface CommonResponse<T> {
  code: string;
  data: T;
  message: string;
}

export const CODE_SUCCESS = '000';
