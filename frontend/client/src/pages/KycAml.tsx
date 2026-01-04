import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function KycAml() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/">
          <a className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors cursor-pointer">
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
            KYC/AML Policy
          </h1>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                Anti-Money Laundering (AML) & Know Your Customer (KYC)
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bytus is committed to the highest standards of compliance to
                prevent money laundering and terrorist financing. Our KYC/AML
                policy is designed to ensure that we meet all regulatory
                requirements in the jurisdictions where we operate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                Customer Due Diligence (CDD)
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement a robust Customer Due Diligence process for all
                business clients. This includes verifying the identity of the
                business entity, its beneficial owners, and key controllers. We
                employ a risk-based approach to determine the level of
                verification required.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                <li>
                  <strong>Identity Verification:</strong> Collection and
                  verification of government-issued identification for
                  beneficial owners.
                </li>
                <li>
                  <strong>Business Verification:</strong> Validation of
                  corporate registration documents and good standing.
                </li>
                <li>
                  <strong>Sanctions Screening:</strong> Checking against
                  international sanctions lists (OFAC, UN, EU, UK).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                Transaction Monitoring
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bytus utilizes advanced real-time transaction monitoring systems
                to detect suspicious activities. Our systems analyze transaction
                patterns, velocity, and value to identify potential risks.
                Suspicious activities are flagged for manual review by our
                compliance team and reported to relevant authorities as required
                by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Risk Management</h2>
              <p className="text-muted-foreground leading-relaxed">
                We maintain a comprehensive risk assessment framework that
                evaluates risks associated with customers, geographies,
                products, and delivery channels. High-risk customers and
                transactions are subject to Enhanced Due Diligence (EDD)
                measures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Record Keeping</h2>
              <p className="text-muted-foreground leading-relaxed">
                We maintain records of all customer identification documents and
                transaction data for a minimum period of 5 years (or longer as
                required by local regulations) after the termination of the
                business relationship.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                Cooperation with Authorities
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bytus fully cooperates with law enforcement and regulatory
                authorities. We will respond to valid legal requests for
                information and freeze assets when legally mandated.
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
