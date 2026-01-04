import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function TermsOfUse() {
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
          <h1 className="text-4xl font-display font-bold mb-8">Terms of Use</h1>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the Bytus platform, you agree to be bound
                by these Terms of Use. If you do not agree to these terms,
                please do not use our services. Bytus provides a technology
                interface for managing digital assets and accessing third-party
                financial services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Nature of Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                You acknowledge that Bytus is a technology provider, not a bank
                or regulated financial institution. We provide non-custodial
                software solutions and user interfaces. All fiat currency
                services, custody of regulated assets, and payment processing
                are performed by our licensed third-party partners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                To use Bytus, you must be at least 18 years old and have the
                capacity to form a binding contract. You represent that you are
                not located in a restricted jurisdiction and are not on any
                international sanctions lists.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to use the platform for any illegal activities,
                including but not limited to money laundering, terrorist
                financing, or fraud. You are responsible for maintaining the
                security of your account credentials and private keys.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                5. Disclaimer of Warranties
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The platform is provided "as is" and "as available" without
                warranties of any kind. We do not guarantee that the platform
                will be uninterrupted, error-free, or secure. The experimental
                nature of blockchain technology means inherent risks exist.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, Bytus shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages, or any loss of profits or revenues.
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
