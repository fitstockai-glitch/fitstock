import { useEffect } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "../components/footer/Footer";

const LegalNoticeEn = () => {
  useEffect(() => {
    document.title = "Legal Notice (Specified Commercial Transactions Act) - FitStock";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />

      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">
              Legal Notice under the Act on Specified Commercial Transactions
            </h1>
            <p className="text-muted-foreground">Last updated: April 2, 2026</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Seller</h2>
              <p className="text-muted-foreground leading-relaxed">FLUID Co., Ltd.</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Representative</h2>
              <p className="text-muted-foreground leading-relaxed">Toshiyuki Morita</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Address</h2>
              <p className="text-muted-foreground leading-relaxed">
                402, 3-51-17 Honcho, Shibuya-ku, Tokyo
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                * If requested, we will disclose our address without delay.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">Email: info@fitstock.ai</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Service name</h2>
              <p className="text-muted-foreground leading-relaxed">FitStock</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Price</h2>
              <p className="text-muted-foreground leading-relaxed">FitStock Plus: ¥1,000 / month (tax included)</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Payment method</h2>
              <p className="text-muted-foreground leading-relaxed">
                Credit card (Visa / Mastercard / American Express / other)
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                * Payments are processed through Lemon Squeezy, our payment processor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Payment timing</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>First payment: charged immediately upon subscription</li>
                <li>Renewals: automatically charged on the same day each month</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Service delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may use the service immediately after payment is completed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Cancellations and refunds</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>You may cancel at any time from your account page.</li>
                <li>After cancellation, you may continue using the service until the next billing date.</li>
                <li>We do not offer prorated refunds.</li>
                <li>After the next billing date, your plan will automatically move to the Free Member plan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">System requirements</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Supported browsers: Google Chrome, Safari, Firefox, Edge (latest versions recommended)</li>
                <li>An internet connection is required.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Sales volume</h2>
              <p className="text-muted-foreground leading-relaxed">No limit</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Nature of the product</h2>
              <p className="text-muted-foreground leading-relaxed">
                The service provides digital content (downloadable stock photos). Returns or exchanges after
                purchase are not accepted.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalNoticeEn;
