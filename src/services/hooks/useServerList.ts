import { useQuery } from "react-query";
import { get } from "../../api/tempApi";

const useServerList = () => {
  const queryKey = ["userLogs"];

  const { data, isLoading, refetch, isError } = useQuery(queryKey, async () => {
    try {
      const response = await get("proxmox.json");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const server = await response.json();
      return server;
    } catch (error) {
      throw new Error("Error fetching data from the server");
    }
  });

  const reloadServerList = () => refetch({ queryKey });

  return { serverList: data, isLoading, isError, reloadServerList };
};

export { useServerList };
