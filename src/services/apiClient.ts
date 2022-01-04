import ky, { Options } from 'ky';

// Define middlewares
// headers, transform returns, transform requests
const apiCall = ky.extend({
  retry: 0,

  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Content-Type', 'application/json');
        request.headers.set('charset', 'utf-8');
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        // console.log(response);

        if (response.status >= 400) {
          const data = await response.json();

          let errorMsg = '';

          if (response.status === 400) {
            errorMsg = data.message;
          }

          return Promise.reject({
            message: errorMsg || response.statusText,
            satus: response.status,
          });
        }
      },
    ],
  },
});

export const apiClient = async <T>(
  url: string,
  options: Options,
  body?: any
): Promise<T | undefined> => {
  try {
    const { prefixUrl, ...rest } = options;

    const res = await apiCall(`${url}`, {
      prefixUrl: prefixUrl || process.env.REACT_APP_API_BASE_URL,
      ...rest,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    return data;
  } catch (e: any) {
    console.log(e);
  }
};
