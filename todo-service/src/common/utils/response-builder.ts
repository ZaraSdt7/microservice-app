import { IResponse } from '../interface/response.interface';


export class ResponseBuilder {
  static success<T>(data: T, message = 'Success'): IResponse<T> {
    return { success: true, message, data };
  }

  static error<T>(message: string, data?: T): IResponse<T> {
    return { success: false, message, data };
  }
}
