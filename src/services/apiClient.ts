interface ExtraConfig extends RequestInit {
  baseUrl?: string;
  body: any;
}

export const apiClient = async <T>(
  endpoint: string,
  customConfig?: ExtraConfig,
  token?: string
): Promise<T> => {
  const config: RequestInit = {
    ...customConfig,
  };

  if (token) {
    config.headers = {
      ...config?.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  if (customConfig?.body) {
    if (customConfig?.body instanceof FormData) {
      config.body = customConfig.body;
      config.headers = {
        Accept: 'application/json',
        charset: 'utf-8',
        ...customConfig?.headers,
      };
    } else {
      config.body = JSON.stringify(customConfig.body);
      config.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        charset: 'utf-8',
        ...customConfig?.headers,
      };
    }
  }

  console.log(customConfig?.baseUrl);

  const res = await fetch(
    `${customConfig?.baseUrl || process.env.REACT_APP_API_BASE_URL}${endpoint}`,
    config
  );

  const data = await res.json();

  if (res.ok) {
    return data;
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    message: data.errors ? data.errors[0] : data,
    status: res.status,
  });
};

export type IErrorData = {
  message: string;
  status: number;
};
