const responseBodyDefault = {
  message: '',
  code: 0
};

export const createResponseBody = (data, message, code = 0, headers = {}) => {
  const responseBody = {
    ...responseBodyDefault,
    ...data
  };
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody._status = code;
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers;
  }
  return responseBody;
};

export const getQueryParameters = options => {
  const { url } = options;
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );
};

export const getBody = options => {
  return options.body && JSON.parse(options.body);
};
