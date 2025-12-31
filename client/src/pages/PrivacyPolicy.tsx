import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/">
          <a className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-display font-bold mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect minimal personal information necessary to provide our
                technology services. This may include contact details and
                technical data (IP address, device info). For regulatory
                compliance (KYC/AML), our regulated third-party partners may
                collect identity documents directly; Bytus does not store
                sensitive identity data on its own servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                2. How We Use Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use your information to operate the platform, provide
                customer support, improve our services, and communicate with
                you. We do not sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Data Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may share data with our regulated financial partners solely
                to facilitate the services you request (e.g., fiat on-ramping).
                We may also disclose information if required by law or valid
                legal process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your
                data. However, no method of transmission over the internet is
                100% secure. We encourage you to use strong authentication
                methods.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your jurisdiction (e.g., GDPR, CCPA), you may have
                rights to access, correct, delete, or export your personal data.
                Contact our Data Protection Officer to exercise these rights.
              </p>
            </section>

            <section className="pt-8 border-t border-border mt-12">
              <p className="text-sm text-muted-foreground italic">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
