import { useEffect } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "../components/footer/Footer";

const PrivacyPolicyEn = () => {
  useEffect(() => {
    document.title = "Privacy Policy - FitStock";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />

      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: February 27, 2024</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              FitStock (the &quot;Service&quot;) is committed to protecting your personal information. This Privacy
              Policy explains what personal information we collect and how we use and manage it.
            </p>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">1. Business information</h2>
              <ul className="list-none text-muted-foreground space-y-1">
                <li>Service name: FitStock</li>
                <li>Operator: FLUID Co., Ltd.</li>
                <li>Representative: Toshiyuki Morita</li>
                <li>Address: 402, 3-51-17 Honcho, Shibuya-ku, Tokyo</li>
                <li>Website: https://fitstock.ai/</li>
                <li>Contact: info@fitstock.ai</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">2. Personal information we collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We collect the following personal information.</p>

              <h3 className="text-xl font-light text-foreground mb-2">2.1 Information collected at registration</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Email address (required)</li>
                <li>Display name (optional)</li>
                <li>Password (stored only in hashed form)</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">2.2 Information collected when you use the Service</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Download history</li>
                <li>Favorites</li>
                <li>Search history</li>
                <li>Service usage logs</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">2.3 Payment information</h3>
              <p className="text-muted-foreground leading-relaxed mb-1">
                Payment information (such as credit card details)
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                * We do not store this directly; it is processed through Lemon Squeezy, our payment processor.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">2.4 Information collected automatically</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Date and time of visit</li>
                <li>Pages viewed</li>
                <li>Referrer information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">3. Purposes of use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use collected personal information for:</p>

              <h3 className="text-xl font-light text-foreground mb-2">Providing and operating the Service</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>User authentication</li>
                <li>Providing download features</li>
                <li>Providing favorites features</li>
                <li>Plan management (Free Member / FitStock Plus)</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Payment processing</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Billing for FitStock Plus subscriptions</li>
                <li>Issuing receipts</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Customer support</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Responding to inquiries</li>
                <li>Resolving technical issues</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Improvement and analytics</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Analyzing usage</li>
                <li>Developing new features</li>
                <li>Improving user experience</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Important notices</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Material changes to the Service</li>
                <li>Security-related notifications</li>
                <li>Plan change notices</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Preventing misuse</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Detecting unauthorized account use</li>
                <li>Security measures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">4. Sharing with third parties</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the extent necessary to provide the Service, we share personal information with the following
                categories of service providers. They implement appropriate security measures.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">4.1 Essential services</h3>
              <div className="space-y-4 mb-6">
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Authentication and database services</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Information shared: authentication data, database data, storage files</li>
                    <li>Purpose: account management, data storage, image storage</li>
                    <li>Location: United States</li>
                  </ul>
                </div>
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Payment processor</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Information shared: payment and subscription data</li>
                    <li>Purpose: payment processing and subscription management</li>
                    <li>Location: United States</li>
                  </ul>
                </div>
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Hosting services</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Information shared: access logs and usage statistics</li>
                    <li>Purpose: server operations and performance analysis</li>
                    <li>Location: United States</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-light text-foreground mb-2">4.2 Optional services (OAuth only)</h3>
              <div className="text-muted-foreground mb-6">
                <p className="font-medium text-foreground">External authentication providers</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>Information shared: external account information (e.g., Google account)</li>
                  <li>Purpose: social login authentication</li>
                  <li>Location: United States</li>
                </ul>
              </div>

              <h3 className="text-xl font-light text-foreground mb-2">4.3 Advertising (Free Members and Guests only)</h3>
              <div className="space-y-4 text-muted-foreground mb-4">
                <div>
                  <p className="font-medium text-foreground">Ad delivery services</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Information shared: cookies and access data</li>
                    <li>Purpose: delivering personalized ads</li>
                    <li>Location: United States</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground">Affiliate programs</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Information shared: cookies and click data</li>
                    <li>Purpose: measuring affiliate ad performance</li>
                    <li>Location: United States and Japan</li>
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground font-medium">FitStock Plus members do not see ads.</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">5. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use cookies for the following purposes.</p>

              <h3 className="text-xl font-light text-foreground mb-2">5.1 Essential cookies</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Maintaining authentication</li>
                <li>Session management</li>
                <li>Security</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">5.2 Functional cookies</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Storing language preferences</li>
                <li>Storing UI preferences</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">5.3 Analytics cookies</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Analytics tools (anonymized usage statistics)</li>
                <li>Access analysis for service improvement</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">5.4 Advertising cookies (Free Members and Guests only)</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Ad networks (personalized ads)</li>
                <li>Affiliate tracking</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">How to disable cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                You can disable cookies in your browser settings, but some features may not work correctly.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">Examples:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Chrome: Settings &gt; Privacy and security &gt; Cookies and other site data</li>
                <li>Safari: Preferences &gt; Privacy &gt; Cookies and website data</li>
                <li>Firefox: Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">6. Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We implement the following measures:</p>

              <h3 className="text-xl font-light text-foreground mb-2">Encrypted communications</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>SSL/TLS (HTTPS) for all communications</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Access control</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Database-level access restrictions</li>
                <li>Role-based access control (RBAC)</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Password protection</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Industry-standard hashing for passwords</li>
                <li>We never store passwords in plain text</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Regular audits</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Monitoring security logs</li>
                <li>Periodic vulnerability scanning</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Backups</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Daily automated backups</li>
                <li>Disaster recovery planning</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">7. Your rights</h2>

              <h3 className="text-xl font-light text-foreground mb-2">7.1 Access</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">You may request access to your personal information.</p>

              <h3 className="text-xl font-light text-foreground mb-2">7.2 Correction or deletion</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may request correction or deletion of your personal information.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">7.3 Restriction of processing</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may request restriction of processing of your personal information.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">7.4 Data portability (GDPR)</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may receive your personal information in a machine-readable format.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">7.5 Account deletion</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                You may delete your account at any time from your account page. After deletion, we will:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Permanently delete personal information (within 30 days)</li>
                <li>Delete download history</li>
                <li>Delete favorites</li>
                <li>Automatically cancel subscriptions</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed">
                How to submit requests: contact us at info@fitstock.ai.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">8. Retention</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Account information: until account deletion</li>
                <li>Download history: until account deletion</li>
                <li>Payment records: as required by law (up to 7 years)</li>
                <li>Access logs: 90 days</li>
                <li>Cookies: per browser settings (up to 2 years)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">9. Minors</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service is not intended for users under 18. If a minor has registered by mistake, contact us and we
                will promptly delete the account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">10. GDPR (users in the EEA)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If the EU General Data Protection Regulation (GDPR) applies, the following applies.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">10.1 Legal bases</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Performance of a contract (providing the Service)</li>
                <li>Legitimate interests (improvement, security)</li>
                <li>Your consent (ads, newsletters where applicable)</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">10.2 Transfers outside the EEA</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use service providers in the United States who implement appropriate safeguards (such as standard
                contractual clauses).
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">10.3 Data protection contact</h3>
              <p className="text-muted-foreground leading-relaxed">Contact: info@fitstock.ai</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">11. Changes to this Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may change this Privacy Policy to comply with laws or reflect changes to the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">How we notify you:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Material changes: email to your registered address at least 30 days in advance</li>
                <li>Minor changes: notice on this page only</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">Last updated: updated when changes are made</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">12. Contact</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For questions about this Privacy Policy, contact us at:
              </p>
              <p className="text-muted-foreground">Email: info@fitstock.ai</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">13. Governing law and jurisdiction</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy is governed by the laws of Japan. Any dispute arising from this Policy shall be
                subject to the exclusive jurisdiction of the courts having jurisdiction over 402, 3-51-17 Honcho,
                Shibuya-ku, Tokyo, Japan.
              </p>
            </section>

            <div className="border-t border-border pt-8 mt-8 text-left">
              <p className="text-muted-foreground">End of Policy</p>
              <p className="text-muted-foreground mt-2">FitStock team</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyEn;
