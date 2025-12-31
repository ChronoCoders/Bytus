import { motion } from "framer-motion";
import { Network, Layers, ArrowRightLeft } from "lucide-react";
// import ecosystemImage from "@assets/generated_images/visualization_of_hybrid_blockchain_bridge_connecting_private_and_public_networks.png";
const ecosystemImage = "/visualization_of_hybrid_blockchain_bridge_connecting_private_and_public_networks.png";

export function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">The Hybrid Ecosystem</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Bytus combines the best of both worlds: the speed and security of a private 
              Proof of Authority blockchain with the vast liquidity of public networks.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-card"
          >
            <img 
              src={ecosystemImage} 
              alt="Hybrid Blockchain Architecture" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-8">
              <div className="text-white">
                <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Architecture</div>
                <h3 className="text-2xl font-bold">Private Core ↔ Public Bridge</h3>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-4 items-start group"
            >
              <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Network className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Private PoA Blockchain</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our core banking layer runs on a permissioned Proof of Authority network. 
                  This ensures instant finality, zero gas fees for users, and complete regulatory compliance.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-4 items-start group"
            >
              <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <ArrowRightLeft className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Cross-Chain Bridges</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seamlessly move assets between Bytus and major public chains like Ethereum, 
                  Binance Smart Chain, and Polygon without technical headaches.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4 items-start group"
            >
              <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Layers className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">BYTS Infrastructure Token</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A mandatory operational asset for network access and settlement. 
                  BYTS is not a consumer payment currency, but an infrastructure token requiring locking for service access.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex gap-4 items-start group"
            >
              <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Network className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Operational Governance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Governance is restricted to locked token holders who participate in key decisions regarding fee structures, network expansion, and validator admission.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
