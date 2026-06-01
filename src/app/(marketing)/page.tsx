import { PlatformHero } from '@/components/marketing/platform-hero';
import { ComparisonSection } from '@/components/marketing/comparison-section';
import { CorePrimitives } from '@/components/marketing/core-primitives';
import { UseCasesGrid } from '@/components/marketing/use-cases-grid';
import { SolutionsTeaser } from '@/components/marketing/solutions-teaser';
import { DeploymentComparison } from '@/components/marketing/deployment-comparison';
import { OpenSourceCTA } from '@/components/marketing/open-source-cta';
import { PlatformCTA } from '@/components/marketing/platform-cta';

export default function MarketingPage() {
  return (
    <>
      <PlatformHero />
      <ComparisonSection />
      <CorePrimitives />
      <UseCasesGrid />
      <DeploymentComparison />
      <OpenSourceCTA />
      <SolutionsTeaser />
      <PlatformCTA />
    </>
  );
}
