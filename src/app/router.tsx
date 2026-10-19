import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./AppShell";
import { RouteError } from "./RouteError";
import { OverviewScreen } from "@/screens/OverviewScreen";
import { TypeMapScreen } from "@/screens/TypeMapScreen";
import { RefScreen } from "@/screens/RefScreen";
import { SubjectScreen } from "@/screens/SubjectScreen";
import { loadConfig } from "@/config";

function RootRedirect() {
  const { defaultInstanceId } = loadConfig();
  if (defaultInstanceId) return <Navigate to={`/i/${defaultInstanceId}`} replace />;
  return (
    <div className="p-8 text-[14px] text-zinc-400">
      No default instance configured. Open <code className="font-mono">/i/&lt;instance_id&gt;</code>{" "}
      directly, or set <code className="font-mono">VITE_CRUXIBLE_INSTANCE_ID</code>.
    </div>
  );
}

export const routes = [
  { path: "/", element: <RootRedirect />, errorElement: <RouteError /> },
  {
    path: "/i/:instanceId",
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <OverviewScreen /> },
      { path: "map", element: <TypeMapScreen /> },
      { path: "ref/:ref", element: <RefScreen /> },
      { path: "s/:ref", element: <SubjectScreen /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
