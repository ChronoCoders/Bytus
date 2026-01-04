import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Wallet,
  Store,
  Lock,
  ArrowRight,
  Server,
  FileCheck,
  Layers,
} from "lucide-react";

const features = {
  business: [
    {
      icon: Store,
      title: "Merchant Payment Gateway",
      description:
        "Accept Bitcoin, Ethereum, and 50+ cryptocurrencies. Instant settlement in USD, EUR, or your local currency.",
      link: "/features#gateway",
    },
    {
      icon: Wallet,
      title: "Treasury Automation",
      description:
        "Optimize idle corporate cash across DeFi protocols. Automated rebalancing, real-time reporting, institutional custody integration.",
      link: "/features#treasury",
    },
    {
      icon: FileCheck,
      title: "Compliance Infrastructure",
      description:
        "Built-in KYC/AML, transaction monitoring, and jurisdiction-aware controls. Regulatory-ready out of the box.",
      link: "/features#compliance",
    },
    {
      icon: Server,
      title: "API-First Integration",
      description:
        "RESTful APIs, webhooks, and SDKs for seamless integration with existing financial systems.",
      link: "/features#api",
    },
    {
      icon: Lock,
      title: "Multi-Signature Controls",
      description:
        "Enterprise-grade security with customizable approval workflows for high-value transactions.",
      link: "/features#security",
    },
    {
      icon: Layers,
      title: "Batch Payment Processing",
      description:
        "Execute thousands of crypto payments simultaneously with consolidated reporting.",
      link: "/features#payouts",
    },
  ],
};

export function Features() {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Enterprise Scale
          </h2>
          <p className="text-muted-foreground text-lg">
            A complete financial stack for businesses operating in the digital
            asset economy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.business.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
              <Link
                href={feature.link}
                className="inline-flex items-center text-accent font-semibold text-sm hover:underline"
              >
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
