import { Link } from "react-router-dom";
import { useInstanceId } from "@/api/hooks";
import { useAtLink } from "@/lib/at";
import { formatRef, parseRef, refRoute } from "@/lib/cruxible-ref";
import { shortId } from "./ShortId";

/**
 * A ref string from a response (a next item's subject, a sample Subject, a
 * Claim id) as an in-app link, with no read of its own. Strings the grammar
 * does not recognize, or refs no screen opens, render as plain mono text.
 */
export function RefLink({
  value,
  children,
  className = "",
  short = false,
}: {
  value: string;
  children?: React.ReactNode;
  className?: string;
  /** Show a long hex id shortened (full value on hover). */
  short?: boolean;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const ref = parseRef(value);
  const route = ref ? refRoute(instanceId, ref) : null;
  const full = ref ? formatRef(ref) : value;
  const text = children ?? <span className="font-mono text-[13px]">{short ? shortId(full) : full}</span>;
  const title = short && !children ? full : undefined;
  if (!route) return <span className={`text-zinc-300 ${className}`} title={title}>{text}</span>;
  return (
    <Link
      to={link(route)}
      title={title}
      className={`text-zinc-200 underline-offset-2 hover:text-white hover:underline decoration-zinc-600 ${className}`}
    >
      {text}
    </Link>
  );
}
