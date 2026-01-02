import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { Link } from "wouter";
import { GlobeVisualization } from "@/components/ui/GlobeVisualization";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-primary/5 to-transparent -z-10 rounded-bl-[100px]" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-accent text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Next Gen Hybrid Banking
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.1] mb-6">
              Enterprise Crypto <br />
              <span className="text-gradient">Payment Infrastructure</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Accept crypto payments globally for businesses and merchants. Settle in fiat instantly. Zero volatility risk.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/onboarding/signup" className={cn(buttonVariants({ variant: "default" }), "h-14 px-8 rounded-full text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all")}>
                  Request Demo
              </Link>
              <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }), "h-14 px-8 rounded-full text-lg border-border text-foreground hover:bg-muted")}>
                  Contact Sales
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-muted-foreground text-sm font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span>Regulated Infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                <span>Instant Finality</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 flex items-center justify-center">
               <GlobeVisualization />
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 lg:right-10 bg-card/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border max-w-[200px] z-20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <ArrowRight className="w-4 h-4 -rotate-45" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Received</div>
                    <div className="text-sm font-bold text-foreground">+ $125,000.00</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-0 lg:left-10 bg-card/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border z-20"
              >
                 <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Global Settlement</div>
                    <div className="text-sm font-bold text-foreground">T+0 Instant</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}