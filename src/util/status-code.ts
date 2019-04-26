export const statusCode = {
  ERROR_401(message: String) {
    return {
      status: {
        code: -1,
        message
      },
      data: {}
    };
  },
  ERROR_403(message: String) {
    return {
      status: {
        code: -1,
        message
      },
      data: {}
    };
  },
  ERROR_404(message: String) {
    return {
      status: {
        code: -1,
        message
      },
      data: {}
    };
  },
  ERROR_412(message: String) {
    return {
      status: {
        code: -1,
        message
      },
      data: {}
    };
  },
  SUCCESS_200(message: String, options?: object) {
    return {
      status: {
        code: 0,
        message
      },
      data: {
        ...options
      }
    };
  }
};
