import { motion } from "framer-motion";
import { Network, Code2, Globe, Building2 } from "lucide-react";

export function Ecosystem() {
  const partners = [
    { name: "Global Banks", icon: Building2, desc: "Direct fiat rails" },
    { name: "Base L2", icon: Network, desc: "Primary Settlement Layer" },
    { name: "DeFi Protocols", icon: Code2, desc: "Treasury Optimization" },
    { name: "Auditors", icon: Globe, desc: "Compliance & Security" },
  ];

  return (
    <section id="ecosystem" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-3">
              The Ecosystem
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Built on trust, <br />
              powered by code.
            </h3>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Bytus connects traditional banking infrastructure with the
              programmable value of blockchain. Our permissioned network ensures
              every transaction is compliant, final, and secure.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {partners.map((partner, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <partner.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">
                      {partner.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {partner.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-full bg-gradient-to-br from-primary/5 via-accent/5 to-transparent border border-border/50 relative overflow-hidden flex items-center justify-center p-8">
              {/* Central Hub */}
              <div className="w-32 h-32 rounded-full bg-background shadow-2xl border border-border flex items-center justify-center z-20 relative">
                <div className="text-center">
                  <div className="font-bold text-2xl text-primary">BYTUS</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Core
                  </div>
                </div>

                {/* Orbiting Elements */}
                {[0, 90, 180, 270].map((deg, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute w-full h-full top-0 left-0 pointer-events-none"
                    style={{ rotate: `${deg}deg` }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-3 h-3 bg-accent rounded-full blur-[1px]" />
                  </motion.div>
                ))}
              </div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <circle
                  cx="50%"
                  cy="50%"
                  r="30%"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>

              {/* Satellite Nodes */}
              <div className="absolute inset-0">
                <div className="absolute top-[15%] left-[20%] p-3 bg-card rounded-lg shadow-lg border border-border text-xs font-medium">
                  API Gateway
                </div>
                <div className="absolute bottom-[20%] right-[15%] p-3 bg-card rounded-lg shadow-lg border border-border text-xs font-medium">
                  Settlement Layer
                </div>
                <div className="absolute top-[40%] right-[10%] p-3 bg-card rounded-lg shadow-lg border border-border text-xs font-medium">
                  Treasury
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
