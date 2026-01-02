import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-3">Our Mission</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Bridging the gap between <br />
              traditional finance and digital assets.
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-xl font-bold mb-4 text-primary">The Challenge</h4>
              <p className="text-muted-foreground leading-relaxed">
                The cryptocurrency market is fragmented, slow, and complex. 
                Enterprises face hurdles with wallet management, security keys, and regulatory uncertainty. 
                Traditional banks are hesitant to engage, leaving a gap for a secure, compliant solution.
              </p>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-4 text-primary">The Bytus Solution</h4>
              <p className="text-muted-foreground leading-relaxed">
                We are building a regulated cryptocurrency banking layer that merges traditional 
                financial infrastructure with blockchain efficiency. Through a permissioned PoA blockchain, 
                we ensure fast finality, predictable fees, and full regulatory compatibility.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16 border border-border bg-card rounded-2xl p-8 md:p-12 text-left"
          >
            <h3 className="text-2xl font-bold mb-2 text-foreground text-center">What Bytus Is Not</h3>
            <p className="text-center text-muted-foreground mb-8">
              Bytus is enterprise infrastructure, not consumer fintech. We focus exclusively on B2B payment and treasury solutions.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2.5 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Not a Consumer Neo-Bank:</span> We don't compete with Revolut or Coinbase retail products. Bytus serves businesses, not individual consumers.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2.5 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Not a Retail Crypto Wallet:</span> No mobile app for personal spending. Our infrastructure is designed for merchants and enterprises processing high volumes.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2.5 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Not a DeFi Yield Protocol:</span> We focus on regulated banking operations with predictable settlement, not experimental decentralized finance.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2.5 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Not a Speculative Token Project:</span> BUS is a mandatory operational token for network access, not an investment asset or governance token for speculation.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2.5 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Not an Algorithmic Stablecoin:</span> We use proven, audited collateralization methods through regulated fiat partners. No algorithmic experiments.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2.5 shrink-0" />
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Not a Payment App:</span> We don't build Venmo/Cash App alternatives. Bytus provides B2B infrastructure that payment apps could integrate.
                </p>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-8 font-medium">
              Bytus is payment infrastructure for businesses that need crypto capabilities without crypto complexity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-900 dark:bg-card border border-border/10 rounded-3xl p-12 text-center text-white overflow-hidden relative shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6 text-white">Ready to modernize your financial stack?</h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Join businesses who are already experiencing the speed, 
                security, and efficiency of the Bytus ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/onboarding/signup">
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
