import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Cookies() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/">
          <a className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-display font-bold mb-8">Cookie Policy</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files stored on your device when you visit our website. They help us make the platform work efficiently and provide information to the owners of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
                <li>Remember your preferences and settings (e.g., theme selection).</li>
                <li>Authenticate your session and keep you logged in.</li>
                <li>Analyze how our platform is used to improve performance.</li>
                <li>Ensure the security of our services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Essential Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as logging in or setting privacy preferences.
                </p>

                <h3 className="text-xl font-semibold">Functional Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers.
                </p>

                <h3 className="text-xl font-semibold">Performance Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These allow us to count visits and traffic sources so we can measure and improve the performance of our site. All information these cookies collect is aggregated and therefore anonymous.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
              </p>
            </section>
            
            <section className="pt-8 border-t border-border mt-12">
              <p className="text-sm text-muted-foreground italic">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}