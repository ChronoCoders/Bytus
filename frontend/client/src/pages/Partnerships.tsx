import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Handshake, Building2, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Partnerships() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
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
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                <Handshake className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Partner with Bytus
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Join our ecosystem of banks, payment processors, and fintech
                innovators building the future of compliant digital finance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                <Building2 className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Financial Institutions
                </h3>
                <p className="text-muted-foreground text-sm">
                  Banks and EMIs looking to offer crypto-native services to
                  their corporate clients without managing custody.
                </p>
              </div>
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                <Globe className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-2">Payment Gateways</h3>
                <p className="text-muted-foreground text-sm">
                  PSPs wanting to expand their settlement options with instant,
                  low-cost stablecoin rails.
                </p>
              </div>
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                <Users className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-2">Enterprise Merchants</h3>
                <p className="text-muted-foreground text-sm">
                  Large-scale businesses seeking to integrate direct crypto
                  acceptance into their checkout flow.
                </p>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Let's Build Together</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                We offer dedicated support, custom integration engineering, and
                revenue sharing for strategic partners.
              </p>
              <Link href="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 rounded-full text-lg">
                  Contact Partnerships Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
