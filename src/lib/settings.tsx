import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Client-side display preferences, persisted per browser in localStorage. */
export interface UiSettings {
  /** Hide cold (terminal-status) entities on inspection surfaces. */
  hideCold: boolean;
  /** Accent graph/type views by owning kit layer (base kit vs domain overlay). */
  colorByLayer: boolean;
}

// colorByLayer defaults OFF while layer ownership is heuristic-derived
// (see lib/kit-layer.ts); flip to true when /schema carries real provenance.
const DEFAULTS: UiSettings = { hideCold: false, colorByLayer: false };
const STORAGE_KEY = "cruxible-ui-settings";

interface SettingsValue {
  settings: UiSettings;
  update: (patch: Partial<UiSettings>) => void;
}

const SettingsContext = createContext<SettingsValue>({
  settings: DEFAULTS,
  update: () => {},
});

function load(): UiSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<UiSettings>) };
  } catch {
    return DEFAULTS;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UiSettings>(load);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Private-mode storage failures degrade to session-only settings.
    }
  }, [settings]);
  const value = useMemo(
    () => ({
      settings,
      update: (patch: Partial<UiSettings>) =>
        setSettings((current) => ({ ...current, ...patch })),
    }),
    [settings],
  );
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsValue {
  return useContext(SettingsContext);
}
