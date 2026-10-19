import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./AppShell";
import { RouteError } from "./RouteError";
import { OverviewScreen } from "@/screens/OverviewScreen";
import { TypeMapScreen } from "@/screens/TypeMapScreen";
import { RefScreen } from "@/screens/RefScreen";
import { SubjectScreen } from "@/screens/SubjectScreen";
import { NeighborhoodScreen } from "@/screens/NeighborhoodScreen";
import { NextScreen } from "@/screens/NextScreen";
import { BeliefsScreen } from "@/screens/BeliefsScreen";
import { LedgerScreen } from "@/screens/LedgerScreen";
import { ProposalsScreen } from "@/screens/ProposalsScreen";
import { ProposalScreen } from "@/screens/ProposalScreen";
import { LinesScreen } from "@/screens/LinesScreen";
import { LineScreen } from "@/screens/LineScreen";
import { RunScreen } from "@/screens/RunScreen";
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
      { path: "s/:ref/graph", element: <NeighborhoodScreen /> },
      { path: "next", element: <NextScreen /> },
      { path: "beliefs", element: <BeliefsScreen /> },
      { path: "ledger", element: <LedgerScreen /> },
      { path: "proposals", element: <ProposalsScreen /> },
      { path: "p/:id", element: <ProposalScreen /> },
      { path: "lines", element: <LinesScreen /> },
      { path: "lines/:line", element: <LineScreen /> },
      { path: "runs/:run", element: <RunScreen /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
