export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: January 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Cruxible website and services (the &quot;Service&quot;), operated by Alchemyze LLC (doing business as &quot;Cruxible&quot;) (&quot;Cruxible,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using the Service, you agree to these Terms.
        </p>
        <p>
          If you are using the Service on behalf of a company, you represent you have authority to bind that company to these Terms.
        </p>

        <h2 className="text-xl font-medium mt-8 mb-4">1) The Service</h2>
        <p>Cruxible provides software and analysis tools for promotion performance analysis, planning support, and related reporting.</p>
        <p>Some offerings may be provided as part of:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>a limited pilot program</li>
          <li>a free audit offer</li>
          <li>early-access features</li>
        </ul>
        <p>The Service may change over time.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">2) Eligibility</h2>
        <p>You must be at least 18 years old to use the Service.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">3) Your responsibilities</h2>
        <p>You agree that:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>you will provide accurate information when submitting forms or uploading data</li>
          <li>you have the right to upload any data you provide to Cruxible</li>
          <li>you will not upload data that violates applicable laws or third-party rights</li>
        </ul>

        <h2 className="text-xl font-medium mt-8 mb-4">4) Data uploads</h2>
        <p>If you upload files (e.g., CSV exports), you grant Cruxible permission to process the data solely for:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>generating requested analyses and audit reports</li>
          <li>providing the Service to you</li>
        </ul>
        <p>You retain ownership of your uploaded data.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">5) Confidentiality</h2>
        <p>Cruxible will treat customer-uploaded data as confidential and will use it only to provide the Service, subject to the Privacy Policy and these Terms.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">6) No warranty / &quot;as-is&quot; service</h2>
        <p>The Service is provided &quot;as is&quot; and &quot;as available.&quot; To the maximum extent permitted by law, Cruxible disclaims all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
        <p>Analyses and outputs are estimates based on available data and assumptions, and may contain errors or uncertainty.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">7) Not financial advice</h2>
        <p>The Service provides analytical tools and does not constitute financial, accounting, legal, or investment advice. You are responsible for decisions you make based on outputs from the Service.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">8) Limitation of liability</h2>
        <p>To the maximum extent permitted by law, Cruxible will not be liable for indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, or goodwill arising from or related to the Service.</p>
        <p>Cruxible&apos;s total liability for any claim arising out of or related to the Service will not exceed the amount paid by you to Cruxible for the Service in the three (3) months prior to the event giving rise to the claim (or $100 if you have not paid Cruxible).</p>

        <h2 className="text-xl font-medium mt-8 mb-4">9) Acceptable use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>reverse engineer or attempt to extract source code or models</li>
          <li>interfere with or disrupt the Service</li>
          <li>use the Service to upload malicious code or harmful content</li>
          <li>attempt unauthorized access to systems or data</li>
        </ul>

        <h2 className="text-xl font-medium mt-8 mb-4">10) Termination</h2>
        <p>We may suspend or terminate access to the Service if we reasonably believe:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>you violated these Terms</li>
          <li>your use poses a security risk</li>
          <li>required for legal or operational reasons</li>
        </ul>
        <p>You may stop using the Service at any time.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">11) Changes to these Terms</h2>
        <p>We may update these Terms from time to time. If we make material changes, we will update the &quot;Last updated&quot; date above.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">12) Governing law</h2>
        <p>These Terms are governed by the laws of the State of Florida, excluding conflict-of-law principles.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">13) Contact</h2>
        <p>For questions about these Terms, contact: <a href="mailto:support@cruxible.ai" className="text-primary hover:underline">support@cruxible.ai</a></p>
      </div>
    </main>
  );
}
