import { useCallback, useMemo } from "react";

import {
  read as clientRead,
  search as clientSearch,
  create as clientCreate,
  update as clientUpdate,
  patch as clientPatch,
  remove as clientRemove,
} from "../client";

const useClient = () => {
  const token = "";

  const read = useCallback(
    <T>(
      endpoint: string,
      id?: string,
      filters?: URLSearchParams,
      operation?: string
    ) => clientRead<T>(endpoint, token, id, filters, operation),
    [token]
  );

  const search = useCallback(
    (
      endpoint: string,
      filters?: URLSearchParams,
      operation?: string,
      signal?: AbortSignal
    ) => clientSearch(endpoint, token, filters, operation, signal),
    [token]
  );

  const create = useCallback(
    <T>(endpoint: string, resource: T) =>
      clientCreate(endpoint, resource, token),
    [token]
  );

  const update = useCallback(
    <T>(endpoint: string, id: string, resource: T) =>
      clientUpdate(endpoint, id, resource, token),
    [token]
  );

  // const patch = useCallback(
  //   <T>(endpoint: string, id: string, resource: T) =>
  //     clientPatch(endpoint, id, resource, token),
  //   [token]
  // );

  const remove = useCallback(
    <T>(endpoint: string, id: string) => clientRemove<T>(endpoint, id, token),
    [token]
  );

  return { read, search, create, update, remove };
};

export { useClient };
