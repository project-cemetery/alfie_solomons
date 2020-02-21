const {
  CoversationFailedException,
} = require('../application/error/CoversationFailedException');
const { InvalidQueryException } = require('./error/InvalidQueryException');

class ErrorHandler {
  invoke = async (reply, endpoint) => {
    try {
      const response = await endpoint();

      return response;
    } catch (error) {
      if (error instanceof InvalidQueryException) {
        return this._handleInvalidQueryException(reply, error);
      }

      if (error instanceof CoversationFailedException) {
        return this._handleCoversationFailedException(reply, error);
      }

      throw error;
    }
  };

  _handleInvalidQueryException = (reply, error) => {
    reply.code(400);

    return {
      message: error.message,
      query: error.query,
    };
  };

  _handleCoversationFailedException = (reply, error) => {
    reply.code(500);

    return {
      message: error.message,
      data: {
        from: error.from,
        to: error.to,
        date: error.date,
      },
    };
  };
}

module.exports = {
  ErrorHandler,
};
