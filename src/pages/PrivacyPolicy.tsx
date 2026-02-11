import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 max-w-3xl font-body text-foreground">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: February 10, 2026</p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p>We may collect personal information such as your name, email address, phone number, and donation details when you interact with our website, volunteer, or make a contribution to Vinit Abhedya Foundation.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process donations and issue receipts</li>
              <li>To communicate updates about our initiatives and events</li>
              <li>To respond to your inquiries and feedback</li>
              <li>To improve our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">3. Data Protection</h2>
            <p>We implement appropriate security measures to protect your personal information. Your data is stored securely and is only accessible to authorized personnel.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">4. Third-Party Sharing</h2>
            <p>We do not sell, trade, or share your personal information with third parties, except as required by law or with your explicit consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">5. Cookies</h2>
            <p>Our website may use cookies to enhance your browsing experience. You can disable cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at contact@vinitabhedya.org.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please reach out to us at <a href="mailto:contact@vinitabhedya.org" className="text-primary underline">contact@vinitabhedya.org</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
