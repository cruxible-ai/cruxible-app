export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: January 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <p>
          Alchemyze LLC (doing business as &quot;Cruxible&quot;) (&quot;Cruxible,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides tools to analyze and plan retail promotions. This Privacy Policy explains what information we collect, how we use it, and the choices you have when you use our website and services (the &quot;Service&quot;).
        </p>

        <h2 className="text-xl font-medium mt-8 mb-4">Information we collect</h2>

        <h3 className="text-base font-medium mt-6 mb-2">Information you provide</h3>
        <p>We may collect information you provide directly, including:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Name</li>
          <li>Work email address</li>
          <li>Company name</li>
          <li>Optional additional contact email(s)</li>
          <li>Data type selection (e.g., transaction-level or daily aggregated SKU-level data)</li>
          <li>Any messages or notes you submit through forms</li>
        </ul>

        <h3 className="text-base font-medium mt-6 mb-2">Uploaded data</h3>
        <p>If you request an audit or pilot, you may upload files (e.g., CSV exports) that can include business information such as:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>product/SKU identifiers and names</li>
          <li>order or transaction records</li>
          <li>promotion flags or discount information</li>
          <li>timestamps, quantities, revenue, and related operational fields</li>
        </ul>
        <p>Uploaded files are used only to provide the Service (e.g., generating analysis results and audit reports).</p>

        <h3 className="text-base font-medium mt-6 mb-2">Automatically collected information</h3>
        <p>When you use the Service, we may automatically collect certain information, such as:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>IP address</li>
          <li>browser type</li>
          <li>device information</li>
          <li>pages viewed and actions taken</li>
          <li>approximate location (inferred from IP)</li>
        </ul>
        <p>We may use standard analytics tools to understand site usage and improve the Service.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">How we use information</h2>
        <p>We use collected information to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>provide and operate the Service</li>
          <li>generate requested analyses, reports, and evidence packets</li>
          <li>perform data quality checks (e.g., schema validation)</li>
          <li>communicate with you about uploads, expected delivery timelines, and results</li>
          <li>improve the Service, reliability, and user experience</li>
          <li>prevent abuse, fraud, or unauthorized access</li>
        </ul>

        <h2 className="text-xl font-medium mt-8 mb-4">Data handling and security</h2>
        <p>We take reasonable measures designed to protect your information.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Secure upload:</strong> uploaded files are transmitted using secure connections.</li>
          <li><strong>Cloud infrastructure:</strong> uploaded files and processing are handled on private cloud infrastructure (currently AWS).</li>
          <li><strong>Encryption:</strong> uploaded data is stored using encryption at rest and transmitted using encryption in transit.</li>
          <li><strong>Access controls:</strong> access is restricted to authorized personnel and systems required to deliver the Service.</li>
        </ul>
        <p>No integrations or data pulls. Cruxible does not connect to your systems automatically or pull data from third parties without your action.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">Sharing of information</h2>
        <p>We do not sell your personal information.</p>
        <p>We may share information only in these cases:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Service providers:</strong> we may use vendors (e.g., cloud hosting, analytics) to operate the Service.</li>
          <li><strong>Legal requirements:</strong> if required by law or to protect Cruxible&apos;s rights and safety.</li>
          <li><strong>Business transfers:</strong> if we are involved in a merger, acquisition, or asset sale.</li>
        </ul>

        <h2 className="text-xl font-medium mt-8 mb-4">Data retention</h2>
        <p>We retain information only as long as necessary to provide the Service and operate our business.</p>
        <p>Uploaded customer data may be retained for a limited time to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>generate and deliver analysis results</li>
          <li>support follow-ups related to the audit</li>
          <li>reproduce results if requested</li>
        </ul>
        <p>You may request deletion of uploaded data by contacting us (see &quot;Contact us&quot; below).</p>

        <h2 className="text-xl font-medium mt-8 mb-4">Your choices</h2>
        <p>You may:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>request access to or deletion of your personal data</li>
          <li>request deletion of uploaded data</li>
          <li>opt out of non-essential emails (we may still send operational emails related to your requested audit)</li>
        </ul>

        <h2 className="text-xl font-medium mt-8 mb-4">Children&apos;s privacy</h2>
        <p>The Service is not intended for children under 13 and we do not knowingly collect data from children.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">Changes to this policy</h2>
        <p>We may update this Privacy Policy from time to time. If we make material changes, we will update the &quot;Last updated&quot; date above.</p>

        <h2 className="text-xl font-medium mt-8 mb-4">Contact us</h2>
        <p>If you have questions or requests related to privacy, contact: <a href="mailto:support@cruxible.ai" className="text-primary hover:underline">support@cruxible.ai</a></p>
      </div>
    </main>
  );
}
