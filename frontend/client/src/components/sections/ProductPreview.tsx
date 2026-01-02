import { motion } from "framer-motion";
import { Link } from "wouter";
import { DashboardPreview } from "@/components/ui/DashboardPreview";
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
              Enterprise-Grade Dashboard
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Manage treasury operations, monitor settlement batches, and control API access 
              from a powerful, unified command center designed for finance teams.
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
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
