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
  /** Accent graph/type views by owning kit. */
  colorByLayer: boolean;
  /** Unpinned pages move to each newly accepted generation (off: they hold the head they first read). */
  followHead: boolean;
}

// On by default: layer accents earn their place on composed instances, and
// single-layer instances never render them anyway.
const DEFAULTS: UiSettings = { colorByLayer: true, followHead: true };
const STORAGE_KEY = "cruxible-ui-settings-v3";

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
    const stored = JSON.parse(raw) as Partial<UiSettings>;
    return {
      colorByLayer: typeof stored.colorByLayer === "boolean" ? stored.colorByLayer : DEFAULTS.colorByLayer,
      followHead: typeof stored.followHead === "boolean" ? stored.followHead : DEFAULTS.followHead,
    };
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
