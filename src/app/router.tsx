import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./AppShell";
import { OverviewScreen } from "@/screens/OverviewScreen";
import { QueryViewScreen } from "@/screens/QueryViewScreen";
import { EntityScreen } from "@/screens/EntityScreen";
import { GraphScreen } from "@/screens/GraphScreen";
import { TypeMapScreen } from "@/screens/TypeMapScreen";
import { ReceiptScreen } from "@/screens/ReceiptScreen";
import { BrowseScreen } from "@/screens/BrowseScreen";
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
  { path: "/", element: <RootRedirect /> },
  {
    path: "/i/:instanceId",
    element: <AppShell />,
    children: [
      { index: true, element: <OverviewScreen /> },
      { path: "map", element: <TypeMapScreen /> },
      { path: "views/:queryName", element: <QueryViewScreen /> },
      { path: "e/:entityType/:entityId", element: <EntityScreen /> },
      { path: "g/:entityType/:entityId", element: <GraphScreen /> },
      { path: "receipts/:receiptId", element: <ReceiptScreen /> },
      { path: "browse/:entityType", element: <BrowseScreen /> },
    ],
  },
]);
