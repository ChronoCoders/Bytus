import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  CreditCard,
  RefreshCw,
  Store,
  Lock,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const features = {
  personal: [
    {
      icon: Wallet,
      title: "Unified Digital Wallet",
      description:
        "Manage FIAT and Crypto in one secure place. No more switching between apps.",
      link: "/features#personal",
    },
    {
      icon: CreditCard,
      title: "Global Debit Card",
      description:
        "Spend your digital assets anywhere Visa/Mastercard is accepted with real-time conversion.",
      link: "/features#personal",
    },
    {
      icon: RefreshCw,
      title: "Instant Exchange",
      description:
        "Swap between currencies instantly with low fees and transparent rates.",
      link: "/features#personal",
    },
  ],
  business: [
    {
      icon: Store,
      title: "Merchant Gateway",
      description:
        "Accept crypto payments and get settled in your local FIAT currency instantly.",
      link: "/features#business",
    },
    {
      icon: Lock,
      title: "Compliance First",
      description:
        "Built-in KYC/AML tools ensure your business meets all regulatory requirements.",
      link: "/features#business",
    },
    {
      icon: BarChart3,
      title: "Financial Dashboard",
      description:
        "Track all transactions, generate reports, and manage payroll from one dashboard.",
      link: "/features#business",
    },
  ],
};

export function Features() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">(
    "personal",
  );

  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            One Platform, Two Worlds
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you're spending daily or running a global business, Bytus
            has the tools you need.
          </p>

          <div className="mt-8 inline-flex bg-card p-1.5 rounded-full shadow-xs border border-border">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "personal"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For You
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "business"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Business
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {features[activeTab].map((feature, index) => (
              <motion.div
                key={feature.title + activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>
                <Link href={feature.link}>
                  <a className="inline-flex items-center text-accent font-semibold text-sm hover:underline">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
