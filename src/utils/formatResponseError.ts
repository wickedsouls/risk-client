// TODO, map server errors to strings
import { HttpResponseError } from '../common/types';

export const formatHttpResponseError = (err: any): HttpResponseError => {
  if (err?.response) {
    const message = err.response?.data?.message;
    const formattedMessage = Array.isArray(message)
      ? message.join(',')
      : message;
    return {
      statusText: err.response.statusText,
      message: formattedMessage,
      status: err.response.status,
    };
  } else {
    console.log(err);
    return {
      statusText: 'Internal app error',
      message: 'Internal app error',
      status: 'unknown',
    };
  }
};
