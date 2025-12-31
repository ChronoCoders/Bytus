import { motion } from "framer-motion";
import { Link } from "wouter";
import { DashboardPreview } from "@/components/ui/DashboardPreview";
import { MobileAppMockup } from "@/components/ui/MobileAppMockup";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ProductPreview() {
  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              A Unified Financial Experience
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Seamlessly manage your digital and fiat assets across all devices. 
              Our intuitive dashboard and mobile app keep you in control, wherever you go.
            </p>
            <Link href="/dashboard">
              <Button variant="link" className="text-primary gap-2 text-lg">
                Explore the Platform <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="relative flex justify-center perspective-1000">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-5xl"
          >
            <div className="relative">
              {/* Desktop Dashboard Preview */}
              <div className="rounded-xl shadow-2xl bg-card border border-border/50 overflow-hidden">
                <DashboardPreview />
              </div>

              {/* Mobile App Overlay - Positioned to overlap */}
              <motion.div 
                initial={{ opacity: 0, x: 20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -right-4 -bottom-12 md:-right-12 md:-bottom-20 w-[200px] md:w-[280px] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem]"
              >
                <MobileAppMockup />
              </motion.div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
