import { motion } from "framer-motion";
import { Code2, Plug, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function IntegrationOptions() {
  const options = [
    {
      icon: Code2,
      title: "Rest API",
      description:
        "Direct integration for custom platforms with full control over the payment experience.",
      action: "Read Docs",
    },
    {
      icon: Plug,
      title: "Plugins",
      description:
        "Pre-built plugins for WooCommerce, Magento, Shopify, and other major platforms.",
      action: "View Plugins",
    },
    {
      icon: ShoppingCart,
      title: "Hosted Checkout",
      description:
        "No-code payment pages. Just generate a link and start accepting crypto immediately.",
      action: "Start Now",
    },
  ];

  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Seamless Integration
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose the integration method that fits your technical stack and
              business needs.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <option.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{option.title}</h3>
              <p className="text-muted-foreground mb-6 h-20">
                {option.description}
              </p>
              <Button
                variant="outline"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                {option.action} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
