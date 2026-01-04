import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeft,
  Check,
  Shield,
  Code,
  Server,
  Zap,
  Globe,
  FileJson,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

export default function FeaturesPage() {
  const developerFeatures = [
    {
      title: "RESTful API",
      id: "api",
      description:
        "Integrate payments into your application with a few lines of code. Our API is designed for developers, with predictable resource-oriented URLs and standard HTTP response codes.",
      icon: Server,
      details: [
        "Predictable resource URLs",
        "Standard HTTP response codes",
        "JSON-encoded bodies",
        "Idempotent requests",
      ],
    },
    {
      title: "Webhooks",
      id: "webhooks",
      description:
        "Stay in sync with real-time events. Configure webhooks to receive instant notifications for payments, payouts, and settlement status changes.",
      icon: Zap,
      details: [
        "Real-time event delivery",
        "Signature verification",
        "Automatic retries",
        "Event history logs",
      ],
    },
    {
      title: "Client SDKs",
      id: "sdks",
      description:
        "Accelerate development with official libraries for Node.js, Python, Ruby, PHP, and Go. Type-safe and production-ready out of the box.",
      icon: Code,
      details: [
        "Type definitions included",
        "Automatic error handling",
        "Pagination support",
        "Comprehensive documentation",
      ],
    },
  ];

  const businessFeatures = [
    {
      title: "Merchant Gateway",
      id: "gateway",
      description:
        "Accept cryptocurrency payments from customers globally and receive settlements in your preferred local currency instantly.",
      icon: Globe,
      details: [
        "Plug-and-play API integration",
        "Automatic volatility protection",
        "Next-day FIAT settlement",
        "Recurring billing support",
      ],
    },
    {
      title: "Compliance Suite",
      id: "compliance",
      description:
        "Navigate the regulatory landscape with confidence. Our built-in tools handle KYC/AML checks automatically for every transaction.",
      icon: Shield,
      details: [
        "Automated KYB verification",
        "Real-time AML monitoring",
        "Regulatory reporting tools",
        "Travel Rule compliance",
      ],
    },
    {
      title: "Treasury Management",
      id: "treasury",
      description:
        "Gain deep insights into your financial operations. Track revenue, manage DeFi yields, and generate tax reports from a single command center.",
      icon: FileJson,
      details: [
        "Multi-user access controls",
        "Treasury Optimization (Compound V3)",
        "Automated rebalancing",
        "Audit trail logs",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Enterprise Features | API, Webhooks & Treasury"
        description="Explore Bytus features: RESTful API for developers, Merchant Gateway for businesses, and comprehensive Treasury Management tools."
        keywords={[
          "payment api",
          "webhooks",
          "merchant gateway",
          "compliance tools",
          "treasury management",
        ]}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <Link href="/">
            <div className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              Enterprise Infrastructure for <br />
              <span className="text-gradient">Digital Finance</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              From powerful APIs for developers to comprehensive treasury tools
              for finance teams, Bytus provides the complete stack for modern
              business payments.
            </p>
          </motion.div>

          <div className="space-y-32">
            {/* Developer Section */}
            <section id="developer" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-border flex-1" />
                <h2 className="text-2xl font-bold text-muted-foreground uppercase tracking-widest">
                  Developer Experience
                </h2>
                <div className="h-px bg-border flex-1" />
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {developerFeatures.map((feature, idx) => (
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
                    id={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card p-8 rounded-3xl border border-border shadow-lg hover:shadow-xl transition-shadow scroll-mt-32"
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
                    Ready to scale your payment infrastructure?
                  </h2>
                  <p className="text-primary-foreground/80 mb-8 text-lg leading-relaxed">
                    Join forward-thinking enterprises using Bytus to process
                    millions in cross-border payments. Get your API keys today
                    and start building.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-background text-primary hover:bg-muted h-12 px-8 rounded-full text-lg font-semibold shadow-lg shadow-black/10">
                      Get API Keys
                    </Button>
                    <Button
                      variant="outline"
                      className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 h-12 px-8 rounded-full text-lg"
                    >
                      Read Documentation
                    </Button>
                  </div>
                </div>

                {/* Visual removed to focus on B2B API context */}
                <div className="relative flex justify-center lg:justify-end hidden lg:flex">
                  <div className="p-6 bg-background/10 backdrop-blur-md rounded-2xl border border-white/10 text-primary-foreground font-mono text-sm shadow-2xl max-w-md w-full">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                      <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                    <div className="space-y-2 opacity-80">
                      <p>
                        <span className="text-purple-300">POST</span>{" "}
                        /v1/payments
                      </p>
                      <p className="pl-4">{`{`}</p>
                      <p className="pl-8">
                        <span className="text-blue-300">"amount"</span>: 12500,
                      </p>
                      <p className="pl-8">
                        <span className="text-blue-300">"currency"</span>:
                        "usd",
                      </p>
                      <p className="pl-8">
                        <span className="text-blue-300">"customer"</span>:
                        "cus_8s9d8s",
                      </p>
                      <p className="pl-4">{`}`}</p>
                      <p className="mt-4">
                        <span className="text-green-300">200 OK</span>
                      </p>
                    </div>
                  </div>
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
