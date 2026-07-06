import { useEffect } from "react";

const BASE = "Cruxible";

/** Browser tab title reflects the current screen: "<screen> · Cruxible". */
export function usePageTitle(title: string | undefined): void {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : BASE;
    return () => {
      document.title = BASE;
    };
  }, [title]);
}
