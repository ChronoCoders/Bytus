import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeft,
  Check,
  Shield,
  Wallet,
  Lock,
  Store,
  Globe,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileAppMockup } from "@/components/ui/MobileAppMockup";

export default function FeaturesPage() {
  const personalFeatures = [
    {
      title: "Unified Digital Wallet",
      id: "personal-wallet",
      description:
        "Experience the freedom of managing all your assets in one place. Our wallet supports multiple FIAT currencies (USD, EUR, GBP) alongside major cryptocurrencies.",
      icon: Wallet,
      details: [
        "Multi-currency support",
        "Biometric security integration",
        "Real-time balance updates",
        "Transaction history with export",
      ],
    },
    {
      title: "Global Debit Card",
      id: "card",
      description:
        "Spend your crypto as easily as cash. The Bytus card automatically converts your digital assets to local currency at the point of sale.",
      icon: Globe,
      details: [
        "Accepted worldwide",
        "No foreign transaction fees",
        "Virtual and physical cards",
        "Instant freeze/unfreeze",
      ],
    },
    {
      title: "Instant Exchange",
      id: "exchange",
      description:
        "Swap between currencies with zero friction. Our smart routing engine ensures you get the best market rates without hidden markups.",
      icon: RefreshCw,
      details: [
        "Zero-slippage guarantees",
        "Competitive exchange rates",
        "24/7 trading availability",
        "Limit and market orders",
      ],
    },
  ];

  const businessFeatures = [
    {
      title: "Merchant Gateway",
      description:
        "Accept cryptocurrency payments from customers globally and receive settlements in your preferred local currency instantly.",
      icon: Store,
      details: [
        "Plug-and-play API integration",
        "Automatic volatility protection",
        "Next-day FIAT settlement",
        "Recurring billing support",
      ],
    },
    {
      title: "Compliance Suite",
      description:
        "Navigate the regulatory landscape with confidence. Our built-in tools handle KYC/AML checks automatically for every transaction.",
      icon: Shield,
      details: [
        "Automated KYC verification",
        "Real-time AML monitoring",
        "Regulatory reporting tools",
        "GDPR compliant data handling",
      ],
    },
    {
      title: "Enterprise Dashboard",
      description:
        "Gain deep insights into your financial operations. Track revenue, manage payroll, and generate tax reports from a single command center.",
      icon: Lock,
      details: [
        "Multi-user access controls",
        "Advanced analytics & reporting",
        "Payroll processing integration",
        "Audit trail logs",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <Link href="/">
            <a className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </a>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              Powerful Features for <br />
              <span className="text-gradient">Every User</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Whether you're an individual looking for financial freedom or a
              business seeking efficiency, Bytus provides the tools you need to
              succeed in the digital economy.
            </p>
          </motion.div>

          <div className="space-y-32">
            {/* Personal Section */}
            <section id="personal" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-border flex-1" />
                <h2 className="text-2xl font-bold text-muted-foreground uppercase tracking-widest">
                  Personal Banking
                </h2>
                <div className="h-px bg-border flex-1" />
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {personalFeatures.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    id={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card p-8 rounded-3xl border border-border shadow-lg hover:shadow-xl transition-shadow scroll-mt-32"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-card-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Business Section */}
            <section id="business" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-border flex-1" />
                <h2 className="text-2xl font-bold text-muted-foreground uppercase tracking-widest">
                  Business Solutions
                </h2>
                <div className="h-px bg-border flex-1" />
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {businessFeatures.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card p-8 rounded-3xl border border-border shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-card-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-24">
            <div className="bg-primary rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Abstract background shapes */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                    Experience Banking on the Go
                  </h2>
                  <p className="text-primary-foreground/80 mb-8 text-lg leading-relaxed">
                    Download our top-rated mobile app and manage your crypto and
                    fiat assets from anywhere in the world. Real-time
                    notifications, instant transfers, and total control at your
                    fingertips.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-background text-primary hover:bg-muted h-12 px-8 rounded-full text-lg font-semibold shadow-lg shadow-black/10">
                      Download App
                    </Button>
                    <Button
                      variant="outline"
                      className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 h-12 px-8 rounded-full text-lg"
                    >
                      Contact Sales
                    </Button>
                  </div>
                </div>

                <div className="relative flex justify-center lg:justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full max-w-md"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[2.5rem] blur-xl transform rotate-6 scale-95" />
                    <div className="relative z-10 transform transition-transform duration-500 hover:scale-[1.02]">
                      <MobileAppMockup />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
