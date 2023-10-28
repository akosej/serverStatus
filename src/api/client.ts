const apiUrl = "https://agabackend.uho.edu.cu";

const client = async (
  endpoint: string,
  { method, body, headers: customHeaders, ...customConfig }: Config
) => {
  const config = {
    method,

    body,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...customHeaders,
    },

    ...customConfig,
  };

  const response = await fetch(`${apiUrl}/${endpoint}`, config);

  const data = await response.json().catch(() => {});

  if (response.ok) {
    return data;
  }

  switch (response.status) {
    case 401:
      throw new Error("Unauthorized", {
        cause: { name: "401", message: "Unauthorized" },
      });
    case 403:
      throw new Error("Forbidden", {
        cause: { name: "403", message: "Forbidden" },
      });
    default:
      throw new Error("Not supported", {
        cause: {
          name: "not-supported",
          message: `Invalid response: ${response.statusText} ${response.status}`,
        },
      });
  }
};

const read = async <T>(
  endpoint: string,
  token: string,
  id?: string,
  filters?: URLSearchParams,
  operation?: string,
  signal?: AbortSignal
) => {
  const data = await client(
    `${endpoint}${id ? `/${id}` : ""}${operation ? `/$${operation}` : ""}${
      filters ? `?${filters}` : ""
    }`,
    {
      credentials: "include",
      method: "GET",
      signal,
    }
  );

  return data as T;
};

const search = async (
  endpoint: string,
  token: string,
  filters?: URLSearchParams,
  operation?: string,
  signal?: AbortSignal
) => {
  const data = await client(
    `${endpoint}${operation ? `/$${operation}` : ""}${
      filters ? `?${filters}` : ""
    }`,
    {
      credentials: "include",
      method: "GET",
      signal,
    }
  );

  return data;
};

const create = async <T>(
  endpoint: string,
  resource: T,
  token: string,
  signal?: AbortSignal
) => {
  const data = await client(`${endpoint}`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(resource),
    signal,
  });

  return data as T;
};

const update = async <T>(
  endpoint: string,
  id: string,
  resource: T,
  token: string,
  signal?: AbortSignal
) => {
  const data = await client(`${endpoint}/${id}`, {
    credentials: "include",
    method: "PUT",
    body: JSON.stringify(resource),
    signal,
  });

  return data as T;
};

const patch = async <T>(
  endpoint: string,
  id: string,
  resource: Partial<T>,
  token: string,
  signal?: AbortSignal
) => {
  const data = await client(`${endpoint}/${id}`, {
    credentials: "include",
    method: "PATCH",
    body: JSON.stringify(resource),
    signal,
  });

  return data as T;
};

const remove = async <T>(
  endpoint: string,
  id: string,
  token: string,
  signal?: AbortSignal
) => {
  const data = await client(`${endpoint}/${id}`, {
    credentials: "include",
    method: "DELETE",
    signal,
  });

  return data as T;
};

type Config = RequestInit;

export { read, search, create, update, patch, remove };
