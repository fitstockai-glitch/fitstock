import { useEffect } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "../components/footer/Footer";

const TermsOfServiceEn = () => {
  useEffect(() => {
    document.title = "Terms of Service - FitStock";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />

      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: February 27, 2024</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service (the &quot;Terms&quot;) set forth the conditions for using the stock photo
              download service provided by FitStock (the &quot;Service&quot;). By using the Service, you agree to
              these Terms.
            </p>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 1 (Definitions)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">The following terms have the meanings below.</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Service: The stock photo download service provided by FitStock</li>
                <li>
                  User: Anyone who uses the Service, including Guests, Free Members, and FitStock Plus members
                </li>
                <li>Registered User: A person who has created an account on the Service</li>
                <li>Content: Photos, images, text, and other information provided through the Service</li>
                <li>Terms: These Terms of Service and any additional policies or guidelines we publish separately</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 2 (Overview of the Service)</h2>

              <h3 className="text-xl font-light text-foreground mb-2">2.1 Service description</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Service is a platform that provides stock photos themed around fitness, sports, and wellness. You
                may download and use photos in accordance with these Terms.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">2.2 Plans</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">We offer the following three plans.</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm text-muted-foreground border border-border">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-3 font-medium text-foreground">Plan</th>
                      <th className="text-left p-3 font-medium text-foreground">Price</th>
                      <th className="text-left p-3 font-medium text-foreground">Download limit</th>
                      <th className="text-left p-3 font-medium text-foreground">License</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3">Guest (not registered)</td>
                      <td className="p-3">Free</td>
                      <td className="p-3">Not available</td>
                      <td className="p-3">—</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3">Free Member</td>
                      <td className="p-3">Free</td>
                      <td className="p-3">Up to 10 per day</td>
                      <td className="p-3">No credit required</td>
                    </tr>
                    <tr>
                      <td className="p-3">FitStock Plus</td>
                      <td className="p-3">¥1,000/month</td>
                      <td className="p-3">Unlimited</td>
                      <td className="p-3">No credit required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 3 (Registration)</h2>

              <h3 className="text-xl font-light text-foreground mb-2">3.1 How to register</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">You may register using either of the following:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Email address and password</li>
                <li>Google account (OAuth)</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">3.2 Accuracy of registration information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are responsible for providing accurate, up-to-date information. If you register false
                information, we may suspend or delete your account.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">3.3 Account security</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are responsible for properly managing your account credentials (email and password). We are not
                liable for unauthorized use by third parties.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">3.4 Grounds for refusal</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">We may refuse registration if:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>You were previously suspended for violating these Terms</li>
                <li>You provided false information</li>
                <li>You are under 18 years of age</li>
                <li>We otherwise deem registration inappropriate</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 4 (FitStock Plus — monthly plan)</h2>

              <h3 className="text-xl font-light text-foreground mb-2">4.1 Price</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FitStock Plus is ¥1,000 per month (tax included).
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">4.2 Payment method</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Only credit card payment is available. Payments are processed through Lemon Squeezy, our payment
                processor.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">4.3 Billing cycle</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>First charge: immediately upon subscription</li>
                <li>Renewals: automatically charged on the same calendar day each month</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">4.4 Cancellation</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">You may cancel FitStock Plus at any time.</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>You may continue using the plan until the next billing date after cancellation</li>
                <li>After the next billing date, your plan automatically becomes Free Member</li>
                <li>We do not offer prorated refunds</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">4.5 Upgrades</h3>
              <p className="text-muted-foreground leading-relaxed">
                You may upgrade from Free Member to FitStock Plus at any time from your account page or the pricing
                page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 5 (License terms)</h2>

              <h3 className="text-xl font-light text-foreground mb-2">5.1 Grant of license</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Photos downloaded from the Service may be used under the following conditions.
              </p>

              <p className="text-foreground font-medium mt-4 mb-2">Permitted uses:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Commercial use (ads, websites, social posts, print, video, etc.)</li>
                <li>Editing and processing</li>
                <li>Use as training data for AI</li>
                <li>Personal use</li>
                <li>No attribution required</li>
              </ul>

              <p className="text-foreground font-medium mb-2">Prohibited uses:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Reselling the photos themselves (e.g., on other stock sites)</li>
                <li>Selling as NFTs</li>
                <li>Trademark registration</li>
                <li>Uses contrary to public order or morals (adult content, illegal activity, etc.)</li>
                <li>Uses that infringe third-party rights</li>
                <li>Uses intended to defame specific individuals or groups</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">5.2 Credit</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Attribution is not required on any plan. Optional credit such as &quot;Photo by FitStock&quot; is
                welcome.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">5.3 No transfer</h3>
              <p className="text-muted-foreground leading-relaxed">
                Download rights are granted only to the user who downloaded the photo. You may not transfer or resell
                rights to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 6 (Intellectual property)</h2>

              <h3 className="text-xl font-light text-foreground mb-2">6.1 Copyright</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Copyright in photos and other Content belongs to FitStock or the legitimate rights holders.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">6.2 License scope</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You receive a non-exclusive right to use photos in accordance with these Terms. Copyright is not
                transferred.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">6.3 Trademarks</h3>
              <p className="text-muted-foreground leading-relaxed">
                &quot;FitStock&quot; and our logos are trademarks. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 7 (Prohibited conduct)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You must not:</p>

              <h3 className="text-xl font-light text-foreground mb-2">Misuse</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Create multiple accounts to circumvent limits</li>
                <li>Use technical means to bypass download restrictions</li>
                <li>Use automated tools (bots)</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Misuse of photos</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Resell photos as standalone products</li>
                <li>Use contrary to public order or morals</li>
                <li>Use in ways that infringe third-party rights</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Attacks on systems</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Unauthorized access</li>
                <li>Excessive load on servers</li>
                <li>Distributing malware</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Other</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Register false information</li>
                <li>Impersonate others</li>
                <li>Violate laws</li>
                <li>Interfere with operation of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 8 (Restrictions and suspension)</h2>

              <h3 className="text-xl font-light text-foreground mb-2">8.1 Suspension or deletion</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                We may suspend or delete your account without prior notice if:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>You violate these Terms</li>
                <li>You have not logged in for more than six months</li>
                <li>You fail to pay charges when due</li>
                <li>We otherwise deem your use inappropriate</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">8.2 Fees during suspension</h3>
              <p className="text-muted-foreground leading-relaxed">
                FitStock Plus fees may continue to accrue during suspension. Contact us to resolve suspension issues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 9 (Disclaimer)</h2>

              <h3 className="text-xl font-light text-foreground mb-2">9.1 Service</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">We do not warrant that:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>The Service will be continuous or stable</li>
                <li>Downloaded photos will meet any particular quality standard</li>
                <li>Photos will be fit for any particular purpose</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">9.2 Limitation of liability</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">Our liability is limited as follows:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Only direct, actual damages</li>
                <li>Total liability capped at fees paid in the preceding three months</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">9.3 Use after download</h3>
              <p className="text-muted-foreground leading-relaxed">
                You are solely responsible for issues arising from your use of downloaded photos (including alleged
                copyright infringement).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 10 (Changes, interruption, termination)</h2>

              <h3 className="text-xl font-light text-foreground mb-2">10.1 Changes</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may change the Service without prior notice.
              </p>

              <h3 className="text-xl font-light text-foreground mb-2">10.2 Interruption</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">We may temporarily interrupt the Service for:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>System maintenance</li>
                <li>Emergency fixes</li>
                <li>Natural disasters</li>
                <li>Other unavoidable circumstances</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">10.3 Termination</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate the Service with at least 30 days&apos; prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 11 (Personal information)</h2>
              <p className="text-muted-foreground leading-relaxed">
                We handle personal information in accordance with our Privacy Policy published separately.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Privacy Policy: https://fitstock.ai/en/privacy-policy
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 12 (Changes to the Terms)</h2>

              <h3 className="text-xl font-light text-foreground mb-2">12.1 Notice</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">If we change these Terms, we will notify you by:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Material changes: email to your registered address at least 30 days in advance</li>
                <li>Minor changes: notice on this page only</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">12.2 Continued use</h3>
              <p className="text-muted-foreground leading-relaxed">
                Continued use after changes constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 13 (Governing law and jurisdiction)</h2>

              <h3 className="text-xl font-light text-foreground mb-2">13.1 Governing law</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">These Terms are governed by the laws of Japan.</p>

              <h3 className="text-xl font-light text-foreground mb-2">13.2 Jurisdiction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the courts
                having jurisdiction over 402, 3-51-17 Honcho, Shibuya-ku, Tokyo, Japan.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 14 (Contact)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For questions about these Terms, contact us at:
              </p>
              <p className="text-muted-foreground">Email: info@fitstock.ai</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 15 (Severability)</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is held invalid or unenforceable, the remaining provisions remain in
                full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Article 16 (Language)</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Japanese version of these Terms is the official text. If there is any conflict between a
                translation and the Japanese version, the Japanese version prevails.
              </p>
            </section>

            <div className="border-t border-border pt-8 mt-8 text-left">
              <p className="text-muted-foreground">End of Terms</p>
              <p className="text-muted-foreground mt-2">FitStock Terms of Service</p>
              <p className="text-muted-foreground mt-1">Effective: February 27, 2024</p>
              <p className="text-muted-foreground mt-1">Last updated: February 27, 2024</p>
              <p className="text-muted-foreground mt-2">FitStock team</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfServiceEn;
