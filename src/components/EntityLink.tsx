import { Link } from "react-router-dom";
import { useInstanceId } from "@/api/hooks";

export function entityPath(instanceId: string, entityType: string, entityId: string): string {
  return `/i/${instanceId}/e/${encodeURIComponent(entityType)}/${encodeURIComponent(entityId)}`;
}

export function EntityLink({
  entityType,
  entityId,
  children,
  className = "",
}: {
  entityType: string;
  entityId: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const instanceId = useInstanceId();
  return (
    <Link
      to={entityPath(instanceId, entityType, entityId)}
      className={`text-zinc-200 hover:text-white hover:underline decoration-zinc-600 underline-offset-2 ${className}`}
    >
      {children ?? <span className="font-mono text-[13px]">{entityId}</span>}
    </Link>
  );
}
