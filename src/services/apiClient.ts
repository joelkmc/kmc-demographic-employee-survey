interface ExtraConfig extends RequestInit {
  baseUrl?: string;
}

export const apiClient = async <T>(
  endpoint: string,
  customConfig?: ExtraConfig,
  token?: string
): Promise<T> => {
  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json-patch+json',
      Accept: 'application/json',
      charset: 'utf-8',
      ...customConfig?.headers,
    },
  };

  if (token) {
    config.headers = {
      ...config?.headers,
      Authorization: `Bearer ${token}`,
    };
  }

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
