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

// Both ON by default (Robert, 2026-07-07): cold entities are noise on
// inspection surfaces, and layer accents earn their place on composed
// instances (single-layer instances never render them anyway).
const DEFAULTS: UiSettings = { hideCold: true, colorByLayer: true };
// v2: the provider persists on first mount, so every pre-default-flip browser
// has {false,false} stored under the old key. New key = new defaults land
// once; choices made from here on persist under v2.
const STORAGE_KEY = "cruxible-ui-settings-v2";

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
