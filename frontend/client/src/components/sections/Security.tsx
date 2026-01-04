import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
// import securityImage from "@assets/generated_images/abstract_visualization_of_fast_secure_digital_transactions.png";
const securityImage =
  "/abstract_visualization_of_fast_secure_digital_transactions.png";

export function Security() {
  const benefits = [
    "Proof of Authority (PoA) Consensus",
    "Bank-Grade Encryption Standards",
    "Fully Regulated & Compliant",
    "Private & Permissioned Network",
    "Real-time Fraud Monitoring",
    "Segregated User Funds",
  ];

  return (
    <section id="security" className="py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border">
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent z-10" />
              <img
                src={securityImage}
                alt="Security Visualization"
                className="w-full h-auto"
              />
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <div className="text-sm font-medium opacity-80 mb-1">
                  Network Status
                </div>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  Operational
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Security Built for <br />
              <span className="text-gradient">Peace of Mind.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We don't compromise on security. Our hybrid blockchain
              architecture ensures your assets are protected by enterprise-grade
              encryption while maintaining the transparency you trust.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-muted-foreground font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-muted-foreground font-medium">
                  SOC 2 Type II Compliant
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-muted-foreground font-medium">
                  Segregated Hot/Cold Wallet
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-muted-foreground font-medium">
                  MPC Key Management
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-muted-foreground font-medium">
                  Insurance Coverage
                </span>
              </div>
            </div>

            <div className="mt-10 p-6 bg-primary/10 dark:bg-primary/5 rounded-2xl border border-primary/20 dark:border-primary/20">
              <h4 className="font-bold text-primary mb-2">
                Why Proof of Authority?
              </h4>
              <p className="text-sm text-muted-foreground">
                Unlike energy-intensive networks, our PoA consensus relies on
                trusted, verified validators. This means faster transactions,
                lower fees, and accountability at every step.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
