'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { KPICard, KPIGrid } from '@/components/ui/kpi-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChatCanvasLayout,
  ChatMessage,
  MessageList,
  ChatInput,
  StreamingText,
  StreamingCursor,
  Artifact,
  ChartArtifactContent,
  KPIArtifactContent,
  TableArtifactContent,
  CanvasEmpty,
  SuggestionChips,
  ConfirmationMessage,
  SlashCommandMenu,
  EntityPicker,
  CalendarPicker,
  useSlashCommands,
  useEntityPicker,
  useCalendarPicker,
  formatDate,
} from '@/components/chat-canvas';
import type { SlashCommand, Entity, Suggestion } from '@/components/chat-canvas';

/**
 * Component Showcase / Style Guide
 *
 * Living documentation of the Cruxible design system.
 * All components and their variants are displayed here.
 */

// Color palette data
const brandColors = [
  { name: 'Neon Ice', value: '#4FF2E3', var: '--primary', usage: 'Primary accent, CTAs, focus rings' },
  { name: 'Emerald', value: '#22C55E', var: '--success', usage: 'Success states, positive metrics' },
  { name: 'Coral Red', value: '#FF6B6B', var: '--destructive', usage: 'Errors, negative metrics, destructive actions' },
  { name: 'Warm Yellow', value: '#FFE66D', var: '--warning', usage: 'Warnings, caution states' },
];

const neutralColors = [
  { name: 'Warm White', value: '#F8F6F2', usage: 'Light mode background' },
  { name: 'Cool Steel', value: '#A4A6AA', usage: 'Muted text, borders, icons' },
  { name: 'Carbon Black', value: '#1A1B1D', usage: 'Dark mode background' },
  { name: 'Onyx', value: '#0F0F10', usage: 'Primary text, dark elements' },
];

// Sample data for chat enhancement components
const sampleCommands: SlashCommand[] = [
  { command: 'analyze', label: 'Analyze Promotion', description: 'Evaluate historical promo performance' },
  { command: 'compare', label: 'Compare SKUs', description: 'Side-by-side SKU comparison' },
  { command: 'plan', label: 'Plan Promotion', description: 'Forecast a future promotion' },
  { command: 'calendar', label: 'Show Calendar', description: 'View promo calendar' },
  { command: 'export', label: 'Export Report', description: 'Generate PDF audit report' },
];

const sampleSuggestions: Suggestion[] = [
  { id: '1', label: 'Analyze last promo' },
  { id: '2', label: 'Compare top SKUs' },
  { id: '3', label: 'Show promo calendar' },
  { id: '4', label: 'What drove the lift?' },
];

const sampleSKUs: Entity[] = [
  { id: 'SKU-001', label: 'Premium Widget', type: 'sku' },
  { id: 'SKU-002', label: 'Basic Gadget', type: 'sku' },
  { id: 'SKU-003', label: 'Deluxe Bundle', type: 'sku' },
  { id: 'SKU-004', label: 'Standard Kit', type: 'sku' },
];

const samplePromos: Entity[] = [
  { id: 'PROMO-BF24', label: 'Black Friday 2024', description: 'Nov 24-27', type: 'promo' },
  { id: 'PROMO-CM24', label: 'Cyber Monday 2024', description: 'Nov 28', type: 'promo' },
  { id: 'PROMO-Q1S', label: 'Q1 Spring Sale', description: 'Mar 1-15', type: 'promo' },
];

const sampleConfirmationFields = [
  { label: 'SKU', value: 'SKU-12345 (Premium Widget)' },
  { label: 'Start Date', value: 'January 15, 2025', editable: true },
  { label: 'End Date', value: 'January 22, 2025', editable: true },
  { label: 'Discount', value: '20% off' },
];

// Typography scale
const typographyScale = [
  { name: 'Display', class: 'text-5xl font-bold', size: '48px', weight: '700' },
  { name: 'H1', class: 'text-4xl font-bold', size: '36px', weight: '700' },
  { name: 'H2', class: 'text-3xl font-semibold', size: '30px', weight: '600' },
  { name: 'H3', class: 'text-2xl font-semibold', size: '24px', weight: '600' },
  { name: 'H4', class: 'text-xl font-medium', size: '20px', weight: '500' },
  { name: 'Body Large', class: 'text-lg', size: '18px', weight: '400' },
  { name: 'Body', class: 'text-base', size: '16px', weight: '400' },
  { name: 'Body Small', class: 'text-sm', size: '14px', weight: '400' },
  { name: 'Caption', class: 'text-xs', size: '12px', weight: '400' },
];

function ColorSwatch({ name, value, usage, isDark = false }: { name: string; value: string; usage: string; isDark?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-16 h-16 rounded-lg border border-border shadow-sm flex-shrink-0"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0">
        <p className="font-medium">{name}</p>
        <p className="text-sm font-mono text-muted-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{usage}</p>
      </div>
    </div>
  );
}

function Section({ id, title, description, children }: { id?: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-6 scroll-mt-32">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function ComponentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function ShowcasePage() {
  // Chat enhancement component state
  const slashCommands = useSlashCommands();
  const entityPicker = useEntityPicker();
  const calendarPicker = useCalendarPicker();
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [confirmationStatus, setConfirmationStatus] = useState<'pending' | 'confirmed'>('pending');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cruxible Design System</h1>
            <p className="text-sm text-muted-foreground">Component Showcase & Style Guide</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[73px] z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-2">
          <div className="flex gap-4 text-sm overflow-x-auto">
            <a href="#colors" className="text-muted-foreground hover:text-foreground whitespace-nowrap">Colors</a>
            <a href="#typography" className="text-muted-foreground hover:text-foreground whitespace-nowrap">Typography</a>
            <a href="#buttons" className="text-muted-foreground hover:text-foreground whitespace-nowrap">Buttons</a>
            <a href="#inputs" className="text-muted-foreground hover:text-foreground whitespace-nowrap">Inputs</a>
            <a href="#cards" className="text-muted-foreground hover:text-foreground whitespace-nowrap">Cards</a>
            <a href="#badges" className="text-muted-foreground hover:text-foreground whitespace-nowrap">Badges</a>
            <a href="#alerts" className="text-muted-foreground hover:text-foreground whitespace-nowrap">Alerts</a>
            <a href="#feedback" className="text-muted-foreground hover:text-foreground whitespace-nowrap">Feedback</a>
            <a href="#data" className="text-muted-foreground hover:text-foreground whitespace-nowrap">Data Display</a>
            <a href="#chat-canvas" className="text-muted-foreground hover:text-foreground whitespace-nowrap">Chat + Canvas</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-16">

        {/* ================================================================= */}
        {/* COLORS */}
        {/* ================================================================= */}
        <Section id="colors" title="Colors" description="Brand and semantic color palette">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Brand Colors</h3>
              <div className="space-y-4">
                {brandColors.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Neutral Colors</h3>
              <div className="space-y-4">
                {neutralColors.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>
          </div>

          {/* Semantic Colors Demo */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Semantic Usage</h3>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">Primary</div>
              <div className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg">Secondary</div>
              <div className="px-4 py-2 bg-success text-success-foreground rounded-lg">Success</div>
              <div className="px-4 py-2 bg-warning text-warning-foreground rounded-lg">Warning</div>
              <div className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg">Destructive</div>
              <div className="px-4 py-2 bg-muted text-muted-foreground rounded-lg">Muted</div>
            </div>
          </div>
        </Section>

        <Separator />

        {/* ================================================================= */}
        {/* TYPOGRAPHY */}
        {/* ================================================================= */}
        <Section id="typography" title="Typography" description="Font family: Roboto Flex (variable weight)">
          <div className="space-y-6">
            {typographyScale.map((item) => (
              <div key={item.name} className="flex items-baseline gap-6">
                <div className="w-28 flex-shrink-0">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.size} / {item.weight}</p>
                </div>
                <p className={item.class}>The quick brown fox jumps over the lazy dog</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Monospace</h3>
            <p className="font-mono text-sm bg-muted p-4 rounded-lg">
              const analysis = await runPromoAnalysis(sku, dateRange);
            </p>
          </div>
        </Section>

        <Separator />

        {/* ================================================================= */}
        {/* BUTTONS */}
        {/* ================================================================= */}
        <Section id="buttons" title="Buttons" description="Interactive elements for actions">
          <div className="grid md:grid-cols-2 gap-6">
            <ComponentCard title="Variants">
              <div className="flex flex-wrap gap-3">
                <Button>Default (Primary)</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </ComponentCard>

            <ComponentCard title="Semantic Variants">
              <div className="flex flex-wrap gap-3">
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </ComponentCard>

            <ComponentCard title="Sizes">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </ComponentCard>

            <ComponentCard title="Icon Buttons">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="icon-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Button>
                <Button size="icon">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Button>
                <Button size="icon-lg" variant="outline">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Button>
              </div>
            </ComponentCard>

            <ComponentCard title="States">
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </ComponentCard>

            <ComponentCard title="With Icons">
              <div className="flex flex-wrap gap-3">
                <Button>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Item
                </Button>
                <Button variant="outline">
                  Download
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </Button>
              </div>
            </ComponentCard>
          </div>
        </Section>

        <Separator />

        {/* ================================================================= */}
        {/* INPUTS */}
        {/* ================================================================= */}
        <Section id="inputs" title="Inputs & Forms" description="Form controls for user input">
          <div className="grid md:grid-cols-2 gap-6">
            <ComponentCard title="Text Input">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Default</label>
                  <Input placeholder="Enter text..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Disabled</label>
                  <Input placeholder="Disabled input" disabled />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">With value</label>
                  <Input defaultValue="SKU-12345" />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Input Types">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Number</label>
                  <Input type="number" placeholder="0" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Password</label>
                  <Input type="password" placeholder="Enter password" />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Textarea">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Default</label>
                  <Textarea placeholder="Enter longer text..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">With rows</label>
                  <Textarea placeholder="Fixed height textarea" rows={2} />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Select">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Intent Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="evaluate">Evaluate Promotion</SelectItem>
                      <SelectItem value="plan">Plan Promotion</SelectItem>
                      <SelectItem value="compare">Compare Campaigns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Disabled</label>
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Disabled select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option">Option</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ComponentCard>
          </div>
        </Section>

        <Separator />

        {/* ================================================================= */}
        {/* CARDS */}
        {/* ================================================================= */}
        <Section id="cards" title="Cards" description="Container components for content">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>A simple card with title and description</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cards contain content and actions about a single subject.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>Includes action buttons</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use the footer for primary and secondary actions.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm">Save</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </CardFooter>
            </Card>

            <Card className="border-l-4 border-l-success">
              <CardHeader>
                <CardTitle>Status Card</CardTitle>
                <CardDescription>With colored border accent</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use border colors to indicate status or category.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* KPI Cards */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">KPI Cards</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Lift</p>
                  <p className="text-3xl font-bold text-success">+24.5%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Incremental Units</p>
                  <p className="text-3xl font-bold">1,234</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="text-3xl font-bold text-success">2.4x</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Profit</p>
                  <p className="text-3xl font-bold text-destructive">-$1,200</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        <Separator />

        {/* ================================================================= */}
        {/* BADGES */}
        {/* ================================================================= */}
        <Section id="badges" title="Badges" description="Small labels for status and categorization">
          <div className="grid md:grid-cols-2 gap-6">
            <ComponentCard title="Solid Variants">
              <div className="flex flex-wrap gap-2">
                <Badge>Default (Primary)</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="muted">Muted</Badge>
              </div>
            </ComponentCard>

            <ComponentCard title="Soft Variants">
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary-soft">Primary</Badge>
                <Badge variant="success-soft">Success</Badge>
                <Badge variant="warning-soft">Warning</Badge>
                <Badge variant="destructive-soft">Destructive</Badge>
              </div>
            </ComponentCard>

            <ComponentCard title="Sizes">
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="default">Default</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </ComponentCard>

            <ComponentCard title="With Dot Indicator">
              <div className="flex flex-wrap gap-2">
                <Badge variant="success-soft" dot>Running</Badge>
                <Badge variant="warning-soft" dot>Pending</Badge>
                <Badge variant="destructive-soft" dot>Failed</Badge>
                <Badge variant="primary-soft" dot>Processing</Badge>
              </div>
            </ComponentCard>

            <ComponentCard title="With Icons">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  142ms
                </Badge>
                <Badge variant="success-soft">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verified
                </Badge>
              </div>
            </ComponentCard>

            <ComponentCard title="Use Cases">
              <div className="flex flex-wrap gap-2">
                <Badge variant="muted">SKU-12345</Badge>
                <Badge variant="primary-soft">+24.5% lift</Badge>
                <Badge variant="success">Recommended</Badge>
                <Badge variant="warning-soft">Review Required</Badge>
              </div>
            </ComponentCard>
          </div>
        </Section>

        <Separator />

        {/* ================================================================= */}
        {/* ALERTS */}
        {/* ================================================================= */}
        <Section id="alerts" title="Alerts" description="Contextual feedback messages">
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a neutral informational alert. Use it for general messages.
              </AlertDescription>
            </Alert>

            <Alert variant="info">
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                Your analysis is queued and will start shortly.
              </AlertDescription>
            </Alert>

            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Analysis completed successfully. 3 agents executed in 2.4 seconds.
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Some historical data is missing. Results may be less accurate.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to connect to the analysis server. Please try again.
              </AlertDescription>
            </Alert>
          </div>
        </Section>

        <Separator />

        {/* ================================================================= */}
        {/* FEEDBACK */}
        {/* ================================================================= */}
        <Section id="feedback" title="Feedback & Loading" description="Loading states and progress indicators">
          <div className="grid md:grid-cols-2 gap-6">
            <ComponentCard title="Skeleton">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-24 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Spinner Component">
              <div className="flex items-center gap-6">
                <Spinner size="sm" />
                <Spinner size="default" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </div>
              <div className="flex items-center gap-6 mt-4">
                <Spinner variant="default" />
                <Spinner variant="muted" />
              </div>
            </ComponentCard>

            <ComponentCard title="Pulse Animation">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm">Analysis running...</span>
              </div>
            </ComponentCard>

            <ComponentCard title="Progress Indicator">
              <div className="space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-primary rounded-full" />
                </div>
                <p className="text-xs text-muted-foreground">2 of 3 agents completed</p>
              </div>
            </ComponentCard>
          </div>
        </Section>

        <Separator />

        {/* ================================================================= */}
        {/* DATA DISPLAY */}
        {/* ================================================================= */}
        <Section id="data" title="Data Display" description="Components for showing data and metrics">
          {/* KPI Cards */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">KPI Cards</h3>
            <KPIGrid cols={4}>
              <KPICard
                label="Lift"
                value="+24.5%"
                change="vs. baseline"
                trend="positive"
              />
              <KPICard
                label="Incremental Units"
                value="1,234"
                change="+15% vs. last promo"
                changeType="positive"
              />
              <KPICard
                label="ROI"
                value="2.4x"
                trend="positive"
              />
              <KPICard
                label="Profit"
                value="-$1,200"
                change="Below target"
                changeType="negative"
                trend="negative"
              />
            </KPIGrid>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2 text-muted-foreground">Loading State</h4>
              <KPIGrid cols={4}>
                <KPICard label="Loading..." value="" loading />
              </KPIGrid>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ComponentCard title="Tabs">
              <Tabs defaultValue="summary">
                <TabsList>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="mt-4">
                  <p className="text-sm text-muted-foreground">Summary content goes here.</p>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                  <p className="text-sm text-muted-foreground">Detailed information goes here.</p>
                </TabsContent>
                <TabsContent value="charts" className="mt-4">
                  <p className="text-sm text-muted-foreground">Charts and visualizations go here.</p>
                </TabsContent>
              </Tabs>
            </ComponentCard>

            <ComponentCard title="Data Table">
              <TableArtifactContent
                columns={[
                  { key: 'agent', label: 'Agent' },
                  { key: 'status', label: 'Status' },
                  { key: 'duration', label: 'Duration', align: 'right' },
                ]}
                rows={[
                  { agent: 'counterfactual_baseline', status: 'Success', duration: '142ms' },
                  { agent: 'historical_lift_calculator', status: 'Success', duration: '89ms' },
                  { agent: 'margin_calculator', status: 'Skipped', duration: '-' },
                ]}
              />
            </ComponentCard>

            <ComponentCard title="Chart Placeholder">
              <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground">
                <span className="text-sm">Plotly Chart Area</span>
              </div>
            </ComponentCard>
          </div>
        </Section>

        <Separator />

        {/* ================================================================= */}
        {/* CHAT + CANVAS */}
        {/* ================================================================= */}
        <Section id="chat-canvas" title="Chat + Canvas" description="Split-screen conversational interface with interactive artifacts">
          {/* Full Layout Demo */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Full Layout</h3>
            <div className="border rounded-lg overflow-hidden h-[900px]">
              <ChatCanvasLayout
                defaultChatWidth={480}
                chatPanel={
                  <div className="flex flex-col h-full">
                    <div className="px-4 py-3 border-b">
                      <h4 className="font-medium">Cruxible</h4>
                      <p className="text-xs text-muted-foreground">AI-powered analysis</p>
                    </div>
                    <MessageList
                      messages={[
                        { id: '1', role: 'assistant' as const, content: 'Hello! I can help you analyze your promotion performance. What would you like to know?', timestamp: new Date() },
                        { id: '2', role: 'user' as const, content: 'What was the lift from the Black Friday promo on SKU-12345?', timestamp: new Date() },
                        { id: '3', role: 'assistant' as const, content: 'I\'ll analyze the Black Friday promotion for SKU-12345. Running the counterfactual baseline and lift calculation agents...', timestamp: new Date(), status: 'streaming' as const },
                      ]}
                      className="flex-1"
                    />
                    <div className="p-4 border-t">
                      <ChatInput
                        placeholder="Ask about promotions..."
                        onSend={() => {}}
                      />
                    </div>
                  </div>
                }
                canvasPanel={
                  <div className="h-full overflow-auto p-4 space-y-4">
                    <div className="px-2 py-1">
                      <h4 className="font-medium">Canvas</h4>
                      <p className="text-xs text-muted-foreground">Generated artifacts</p>
                    </div>
                    <Artifact
                      id="kpi-1"
                      type="kpi"
                      title="Promotion Metrics"
                      agentName="historical_lift_calculator"
                      timestamp={new Date()}
                      onAddToReport={() => {}}
                      isInReport={true}
                    >
                      <KPIArtifactContent
                        kpis={[
                          { label: 'Lift', value: '+24.5%', trend: 'positive' },
                          { label: 'Incremental Units', value: 1234, trend: 'positive' },
                          { label: 'ROI', value: '2.4x', trend: 'positive' },
                          { label: 'Margin Impact', value: '-$1.2K', trend: 'negative' },
                        ]}
                      />
                    </Artifact>
                    <Artifact
                      id="chart-1"
                      type="chart"
                      title="Sales vs. Baseline"
                      agentName="counterfactual_baseline"
                      timestamp={new Date()}
                      onAddToReport={() => {}}
                    >
                      <ChartArtifactContent
                        figure={{
                          data: [],
                          layout: {},
                        }}
                      />
                    </Artifact>
                  </div>
                }
              />
            </div>
          </div>

          {/* Chat Components */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Chat Messages</h3>
            <p className="text-sm text-muted-foreground mb-4">User messages in right-aligned bubbles, assistant responses full-width</p>
            <div className="border rounded-lg overflow-hidden bg-card">
              <ChatMessage
                role="user"
                content="What was the lift from the Black Friday promo?"
                timestamp={new Date()}
              />
              <ChatMessage
                role="assistant"
                content="The Black Friday promotion on SKU-12345 achieved a 24.5% lift over baseline, generating 1,234 incremental units. The promotion ran for 5 days and showed consistent performance across all channels."
                timestamp={new Date()}
                agentName="Cruxible"
              />
              <ChatMessage
                role="user"
                content="Can you break that down by channel?"
                timestamp={new Date()}
              />
              <ChatMessage
                role="assistant"
                content="Here's the channel breakdown: Online saw +28.3% lift with 856 incremental units, while In-Store achieved +19.2% lift with 378 incremental units. The higher online performance aligns with typical Black Friday shopping patterns."
                timestamp={new Date()}
                agentName="Cruxible"
              />
              <ChatMessage
                role="system"
                content="Analysis completed in 2.4 seconds"
                timestamp={new Date()}
              />
            </div>
          </div>

          {/* Message States */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ComponentCard title="Streaming Text">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">With cursor animation:</p>
                  <StreamingText
                    text="Analyzing promotion performance data..."
                    isStreaming={true}
                    showCursor={true}
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Cursor component:</p>
                  <span>Typing</span><StreamingCursor />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Chat Input">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Default:</p>
                  <ChatInput placeholder="Type a message..." onSend={() => {}} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Streaming (with abort):</p>
                  <ChatInput
                    placeholder="Type a message..."
                    onSend={() => {}}
                    isStreaming={true}
                    onAbort={() => {}}
                  />
                </div>
              </div>
            </ComponentCard>
          </div>

          {/* Artifact Types */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Artifact Types</h3>
            <p className="text-sm text-muted-foreground mb-4">Canvas artifacts with type-based border colors</p>
            <div className="grid md:grid-cols-2 gap-6">
              <Artifact
                id="demo-kpi"
                type="kpi"
                title="Key Metrics"
                agentName="lift_calculator"
                timestamp={new Date()}
                onAddToReport={() => {}}
                isInReport={true}
              >
                <KPIArtifactContent
                  kpis={[
                    { label: 'Lift', value: '+24.5%', trend: 'positive' },
                    { label: 'Units', value: 1234 },
                  ]}
                />
              </Artifact>

              <Artifact
                id="demo-table"
                type="table"
                title="SKU Breakdown"
                agentName="margin_calculator"
                timestamp={new Date()}
                onAddToReport={() => {}}
              >
                <TableArtifactContent
                  columns={[
                    { key: 'sku', label: 'SKU' },
                    { key: 'lift', label: 'Lift', align: 'right' },
                    { key: 'units', label: 'Units', align: 'right' },
                  ]}
                  rows={[
                    { sku: 'SKU-001', lift: '+18.2%', units: 456 },
                    { sku: 'SKU-002', lift: '+32.1%', units: 778 },
                  ]}
                />
              </Artifact>

              <Artifact
                id="demo-chart"
                type="chart"
                title="Time Series"
                agentName="counterfactual_baseline"
                timestamp={new Date()}
                onAddToReport={() => {}}
              >
                <div className="h-[150px] bg-muted/30 rounded flex items-center justify-center text-sm text-muted-foreground">
                  Plotly Chart Placeholder
                </div>
              </Artifact>

              <Artifact
                id="demo-markdown"
                type="markdown"
                title="Summary"
                agentName="summary_agent"
                timestamp={new Date()}
                onAddToReport={() => {}}
                isInReport={true}
              >
                <p className="text-sm text-muted-foreground">
                  The promotion achieved <strong>positive ROI</strong> with significant lift across all SKUs.
                  Recommend continuing with similar discount levels for future campaigns.
                </p>
              </Artifact>
            </div>
          </div>

          {/* Artifact States */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Artifact States</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Artifact
                id="state-loading"
                type="chart"
                title="Loading State"
                status="loading"
              >
                <div />
              </Artifact>

              <Artifact
                id="state-error"
                type="table"
                title="Error State"
                status="error"
                error="Failed to fetch data from server"
              >
                <div />
              </Artifact>

              <Artifact
                id="state-complete"
                type="kpi"
                title="Complete State"
                status="complete"
                onDownload={() => {}}
                onToggleExpand={() => {}}
              >
                <KPIArtifactContent
                  kpis={[{ label: 'Value', value: '100%', trend: 'positive' }]}
                  layout="row"
                />
              </Artifact>
            </div>
          </div>

          {/* Chat Enhancement Components */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Chat Enhancements</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Interactive components for structured input assistance: slash commands, suggestions, entity pickers, calendar, and confirmations
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Suggestion Chips */}
              <ComponentCard title="Suggestion Chips">
                <p className="text-xs text-muted-foreground mb-4">Quick action buttons above chat input</p>
                <div className="space-y-3">
                  <SuggestionChips
                    suggestions={sampleSuggestions}
                    onSelect={(s) => setSelectedSuggestion(s.label)}
                  />
                  {selectedSuggestion && (
                    <p className="text-xs text-muted-foreground">
                      Selected: &quot;{selectedSuggestion}&quot;
                    </p>
                  )}
                </div>
              </ComponentCard>

              {/* Slash Command Menu */}
              <ComponentCard title="Slash Command Menu">
                <p className="text-xs text-muted-foreground mb-4">Popup when user types &quot;/&quot; with keyboard nav</p>
                <div className="relative h-[280px]">
                  <div className="absolute bottom-0 left-0 right-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => slashCommands.isOpen ? slashCommands.close() : slashCommands.open()}
                    >
                      {slashCommands.isOpen ? 'Close Menu' : 'Open Slash Commands'}
                    </Button>
                  </div>
                  <SlashCommandMenu
                    commands={sampleCommands}
                    isOpen={slashCommands.isOpen}
                    filter={slashCommands.filter}
                    selectedIndex={slashCommands.selectedIndex}
                    onSelect={(cmd) => {
                      slashCommands.close();
                      alert(`Selected: /${cmd.command}`);
                    }}
                    onClose={slashCommands.close}
                    onSelectedIndexChange={slashCommands.setSelectedIndex}
                  />
                </div>
              </ComponentCard>

              {/* Entity Picker - SKUs */}
              <ComponentCard title="Entity Picker (SKUs)">
                <p className="text-xs text-muted-foreground mb-4">Searchable popup for selecting entities</p>
                <div className="relative h-[320px]">
                  <div className="absolute bottom-0 left-0 right-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => entityPicker.isOpen ? entityPicker.close() : entityPicker.open('sku')}
                    >
                      {entityPicker.isOpen ? 'Close Picker' : 'Select SKU'}
                    </Button>
                  </div>
                  <EntityPicker
                    entityType={entityPicker.entityType}
                    entities={entityPicker.entityType === 'sku' ? sampleSKUs : samplePromos}
                    isOpen={entityPicker.isOpen}
                    filter={entityPicker.filter}
                    selectedIndex={entityPicker.selectedIndex}
                    onSelect={(entity) => {
                      entityPicker.close();
                      alert(`Selected: ${entity.label} (${entity.id})`);
                    }}
                    onClose={entityPicker.close}
                    onSelectedIndexChange={entityPicker.setSelectedIndex}
                    onFilterChange={entityPicker.setFilter}
                  />
                </div>
              </ComponentCard>

              {/* Calendar Picker */}
              <ComponentCard title="Calendar Picker">
                <p className="text-xs text-muted-foreground mb-4">Date selection popup for date inputs</p>
                <div className="relative h-[320px]">
                  <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => calendarPicker.isOpen ? calendarPicker.close() : calendarPicker.open()}
                    >
                      {calendarPicker.isOpen ? 'Close Calendar' : 'Pick Date'}
                    </Button>
                    {calendarPicker.selectedDate && (
                      <span className="text-sm text-muted-foreground">
                        {formatDate(calendarPicker.selectedDate)}
                      </span>
                    )}
                  </div>
                  <CalendarPicker
                    isOpen={calendarPicker.isOpen}
                    selectedDate={calendarPicker.selectedDate}
                    onSelect={calendarPicker.select}
                    onClose={calendarPicker.close}
                  />
                </div>
              </ComponentCard>
            </div>

            {/* Confirmation Message - Full Width */}
            <div className="mb-8">
              <h4 className="text-sm font-medium mb-2">Confirmation Message</h4>
              <p className="text-xs text-muted-foreground mb-4">
                Special chat message with neon ice border asking user to verify parsed info
              </p>
              <div className="max-w-lg">
                <ConfirmationMessage
                  title="Please confirm these details:"
                  fields={sampleConfirmationFields}
                  onConfirm={() => setConfirmationStatus('confirmed')}
                  onEdit={(field) => alert(`Edit: ${field}`)}
                  isConfirming={confirmationStatus === 'confirmed'}
                />
                {confirmationStatus === 'confirmed' && (
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="success">Confirmed</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConfirmationStatus('pending')}
                    >
                      Reset
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Canvas Empty State */}
          <div>
            <h3 className="text-lg font-medium mb-4">Empty State</h3>
            <div className="border rounded-lg h-[300px]">
              <CanvasEmpty />
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="pt-8 pb-12 border-t">
          <p className="text-sm text-muted-foreground text-center">
            Cruxible Design System v1.0 &mdash; Last updated: {new Date().toLocaleDateString()}
          </p>
        </footer>
      </main>
    </div>
  );
}
