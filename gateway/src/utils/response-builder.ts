export class ResponseBuilder {
  static success<T>(data: T, message = 'Success') {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message = 'Error', statusCode?: number) {
    return {
      success: false,
      message,
      statusCode,
    };
  }
}
