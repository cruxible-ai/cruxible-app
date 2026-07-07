import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./AppShell";
import { RouteError } from "./RouteError";
import { OverviewScreen } from "@/screens/OverviewScreen";
import { QueryViewScreen } from "@/screens/QueryViewScreen";
import { EntityScreen } from "@/screens/EntityScreen";
import { ActivityScreen } from "@/screens/ActivityScreen";
import { GroupScreen } from "@/screens/GroupScreen";
import { GroupsScreen } from "@/screens/GroupsScreen";
import { StateGraphScreen } from "@/screens/StateGraphScreen";
import { TraceScreen } from "@/screens/TraceScreen";
import { ViewsIndexScreen } from "@/screens/ViewsIndexScreen";
import { TypeMapScreen } from "@/screens/TypeMapScreen";
import { WorkflowScreen } from "@/screens/WorkflowScreen";
import { WorkflowsScreen } from "@/screens/WorkflowsScreen";
import { ReceiptScreen } from "@/screens/ReceiptScreen";
import { BrowseScreen } from "@/screens/BrowseScreen";
import { SourcesScreen } from "@/screens/SourcesScreen";
import { SourceArtifactScreen } from "@/screens/SourceArtifactScreen";
import { loadConfig } from "@/config";

function RootRedirect() {
  const { defaultInstanceId } = loadConfig();
  if (defaultInstanceId) return <Navigate to={`/i/${defaultInstanceId}`} replace />;
  return (
    <div className="p-8 text-[13px] text-zinc-400">
      No default instance configured. Open <code className="font-mono">/i/&lt;instance_id&gt;</code>{" "}
      directly, or set <code className="font-mono">VITE_CRUXIBLE_INSTANCE_ID</code>.
    </div>
  );
}

export const router = createBrowserRouter([
  { path: "/", element: <RootRedirect />, errorElement: <RouteError /> },
  {
    path: "/i/:instanceId",
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <OverviewScreen /> },
      { path: "map", element: <TypeMapScreen /> },
      { path: "graph", element: <StateGraphScreen /> },
      { path: "groups", element: <GroupsScreen /> },
      { path: "groups/:groupId", element: <GroupScreen /> },
      { path: "activity", element: <ActivityScreen /> },
      { path: "workflows", element: <WorkflowsScreen /> },
      { path: "workflows/:workflowName", element: <WorkflowScreen /> },
      { path: "views", element: <ViewsIndexScreen /> },
      { path: "views/:queryName", element: <QueryViewScreen /> },
      { path: "traces/:traceId", element: <TraceScreen /> },
      { path: "e/:entityType/:entityId", element: <EntityScreen /> },
      { path: "receipts/:receiptId", element: <ReceiptScreen /> },
      { path: "browse/:entityType", element: <BrowseScreen /> },
      { path: "sources", element: <SourcesScreen /> },
      { path: "sources/:artifactId", element: <SourceArtifactScreen /> },
    ],
  },
]);
