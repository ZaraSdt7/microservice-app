export class ResponseBuilder {
  static success(message: string, data?: any) {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message: string, code?: number) {
    return {
      success: false,
      message,
      code,
    };
  }
}
