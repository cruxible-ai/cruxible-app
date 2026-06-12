import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createApiClient, type ApiClient, type DataSourceConfig } from "./data-source";

const DataSourceContext = createContext<ApiClient | null>(null);

export function DataSourceProvider({
  config,
  client,
  children,
}: {
  config?: DataSourceConfig;
  /** Pre-built client (tests/fixtures); takes precedence over config. */
  client?: ApiClient;
  children: ReactNode;
}) {
  const value = useMemo(
    () => client ?? createApiClient(config ?? { baseUrl: "" }),
    [client, config],
  );
  return <DataSourceContext.Provider value={value}>{children}</DataSourceContext.Provider>;
}

export function useApiClient(): ApiClient {
  const client = useContext(DataSourceContext);
  if (!client) throw new Error("useApiClient must be used inside <DataSourceProvider>");
  return client;
}
