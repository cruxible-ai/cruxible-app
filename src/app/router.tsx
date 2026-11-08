import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, useLocation, useParams } from "react-router-dom";
import { LoadState } from "@/components/Panel";
import { AppShell } from "./AppShell";
import { RouteError } from "./RouteError";
import { DashboardScreen } from "@/screens/DashboardScreen";
import { OverviewScreen } from "@/screens/OverviewScreen";
import { TypeMapScreen } from "@/screens/TypeMapScreen";
import { RefScreen } from "@/screens/RefScreen";
import { SubjectScreen } from "@/screens/SubjectScreen";
import { NextScreen } from "@/screens/NextScreen";
import { LedgerScreen } from "@/screens/LedgerScreen";
import { ProposalsScreen } from "@/screens/ProposalsScreen";
import { ProposalScreen } from "@/screens/ProposalScreen";
import { LinesScreen } from "@/screens/LinesScreen";
import { LineScreen } from "@/screens/LineScreen";
import { RunScreen } from "@/screens/RunScreen";
import { RunbookScreen } from "@/screens/RunbookScreen";
import { AboutScreen } from "@/screens/AboutScreen";
import { ClaimTypeRedirect, KindScreen } from "@/screens/KindScreen";
import { ContractScreen, ContractsScreen } from "@/screens/ContractScreen";
import { FlowScreen } from "@/screens/FlowScreen";
import { DocsScreen } from "@/screens/DocsScreen";
import { loadConfig } from "@/config";

// The WebGL renderer (cosmos) loads with the State graph screen, not the app.
const StateGraphScreen = lazy(() =>
  import("@/screens/StateGraphScreen").then((module) => ({ default: module.StateGraphScreen })),
);

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

/** Keep bookmarked list filters and generation pins when a page moves. */
function ListRedirect({ page, preset }: { page: string; preset?: string }) {
  const { instanceId } = useParams();
  const { search, hash } = useLocation();
  const params = new URLSearchParams(search);
  if (preset) {
    params.set("preset", preset);
    params.delete("tab");
  }
  return <Navigate to={`/i/${instanceId}/${page}${params.size ? `?${params}` : ""}${hash}`} replace />;
}

export const routes = [
  { path: "/", element: <RootRedirect />, errorElement: <RouteError /> },
  {
    path: "/i/:instanceId",
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <DashboardScreen /> },
      { path: "overview", element: <OverviewScreen /> },
      { path: "map", element: <TypeMapScreen /> },
      { path: "kinds/:kind", element: <KindScreen /> },
      { path: "claim-types/:predicate", element: <ClaimTypeRedirect /> },
      { path: "contracts", element: <ContractsScreen /> },
      { path: "contracts/:name", element: <ContractScreen /> },
      { path: "flow", element: <FlowScreen /> },
      {
        path: "graph",
        element: (
          <Suspense fallback={<LoadState />}>
            <StateGraphScreen />
          </Suspense>
        ),
      },
      { path: "ref/:ref", element: <RefScreen /> },
      { path: "s/:ref", element: <SubjectScreen /> },
      { path: "next", element: <NextScreen /> },
      { path: "beliefs", element: <ListRedirect page="next" preset="beliefs" /> },
      { path: "docs", element: <DocsScreen /> },
      { path: "ledger", element: <LedgerScreen /> },
      { path: "proposals", element: <ProposalsScreen /> },
      { path: "p/:id", element: <ProposalScreen /> },
      { path: "automation", element: <LinesScreen /> },
      { path: "lines", element: <ListRedirect page="automation" /> },
      { path: "lines/:line", element: <LineScreen /> },
      { path: "runs/:run", element: <RunScreen /> },
      { path: "runbooks/:name", element: <RunbookScreen /> },
      { path: "about", element: <AboutScreen /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
