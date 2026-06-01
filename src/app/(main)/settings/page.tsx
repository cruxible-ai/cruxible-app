'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme, type Theme, type FontSize } from '@/components/theme/theme-provider';

export default function SettingsPage() {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Customize your Cruxible experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Appearance</CardTitle>
            <CardDescription>
              Customize how Cruxible looks on your device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme */}
            <div>
              <label className="text-sm font-medium mb-3 block">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                <ThemeOption
                  value="light"
                  label="Light"
                  selected={theme === 'light'}
                  onClick={() => setTheme('light')}
                  icon={<SunIcon className="w-5 h-5" />}
                />
                <ThemeOption
                  value="dark"
                  label="Dark"
                  selected={theme === 'dark'}
                  onClick={() => setTheme('dark')}
                  icon={<MoonIcon className="w-5 h-5" />}
                />
                <ThemeOption
                  value="system"
                  label="System"
                  selected={theme === 'system'}
                  onClick={() => setTheme('system')}
                  icon={<MonitorIcon className="w-5 h-5" />}
                />
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="text-sm font-medium mb-3 block">Font Size</label>
              <div className="grid grid-cols-3 gap-3">
                <FontSizeOption
                  value="small"
                  label="Small"
                  selected={fontSize === 'small'}
                  onClick={() => setFontSize('small')}
                />
                <FontSizeOption
                  value="medium"
                  label="Medium"
                  selected={fontSize === 'medium'}
                  onClick={() => setFontSize('medium')}
                />
                <FontSizeOption
                  value="large"
                  label="Large"
                  selected={fontSize === 'large'}
                  onClick={() => setFontSize('large')}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface ThemeOptionProps {
  value: Theme;
  label: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

function ThemeOption({ label, selected, onClick, icon }: ThemeOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all
        ${selected
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-muted-foreground/50'
        }
      `}
    >
      <span className={selected ? 'text-primary' : 'text-muted-foreground'}>
        {icon}
      </span>
      <span className={`text-sm font-medium ${selected ? 'text-primary' : ''}`}>
        {label}
      </span>
    </button>
  );
}

interface FontSizeOptionProps {
  value: FontSize;
  label: string;
  selected: boolean;
  onClick: () => void;
}

function FontSizeOption({ value, label, selected, onClick }: FontSizeOptionProps) {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all
        ${selected
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-muted-foreground/50'
        }
      `}
    >
      <span className={`font-medium ${sizeClasses[value]} ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
        Aa
      </span>
      <span className={`text-sm font-medium ${selected ? 'text-primary' : ''}`}>
        {label}
      </span>
    </button>
  );
}

// Icons

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
