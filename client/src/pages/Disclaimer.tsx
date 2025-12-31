import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Disclaimer() {
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
          <h1 className="text-4xl font-display font-bold mb-8">Legal Disclaimer</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Platform Nature and Status</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bytus is a technology platform and does not operate as a bank, credit institution, or licensed financial institution. Bytus does not provide fiat custody, deposit-taking, or regulated financial services directly. The Bytus platform is currently operating in an experimental and non-commercial phase. Features, services, and system parameters are subject to change and do not constitute an offer of financial services, investment products, or banking services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Fiat currency–related services, including but not limited to on-ramp, off-ramp, settlement, and payment processing, are provided by licensed and regulated third-party financial institutions in accordance with applicable local laws and regulations. Bytus acts solely as a technology interface to facilitate access to these services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">No Financial Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nothing on this platform, including whitepapers, website content, or communication channels, should be construed as financial, legal, tax, or investment advice. You should consult with your own professional advisors before engaging with any blockchain or financial technologies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Regulatory Compliance</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">United States</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bytus services are not available to persons or entities who reside in, are citizens of, are incorporated in, or have a registered office in the United States of America or any Prohibited Localities, unless explicitly stated otherwise for specific non-regulated technology services.
                </p>

                <h3 className="text-xl font-semibold">European Union</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In the European Union, crypto-asset services are provided in accordance with the Markets in Crypto-Assets (MiCA) regulation where applicable. Fiat services are facilitated through Electronic Money Institutions (EMIs) or Credit Institutions authorized within the EEA.
                </p>

                <h3 className="text-xl font-semibold">International Sanctions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bytus strictly adheres to international sanctions lists. We do not provide services to individuals or entities on sanctions lists maintained by the United Nations, European Union, United Kingdom Treasury, or US Office of Foreign Assets Control (OFAC).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Risk Warning</h2>
              <p className="text-muted-foreground leading-relaxed">
                Trading and holding digital assets involves significant risk. The value of digital assets can be extremely volatile and you may lose all or a substantial portion of your assets. Digital assets are not covered by deposit insurance schemes (such as FDIC or SIPC in the US, or DGS in the EU) unless explicitly stated by the third-party custodian.
              </p>
            </section>
            
            <section className="pt-8 border-t border-border mt-12">
              <p className="text-sm text-muted-foreground italic">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}