import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "wouter";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-5xl">
            <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-lg p-6 md:flex items-center justify-between gap-6 ring-1 ring-black/5 dark:ring-white/10">
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">We value your privacy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                  <Link href="/cookies">
                    <a className="text-primary hover:underline underline-offset-4">Cookie Policy</a>
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy">
                    <a className="text-primary hover:underline underline-offset-4">Privacy Policy</a>
                  </Link>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                <Button variant="outline" onClick={handleDecline}>
                  Decline
                </Button>
                <Button onClick={handleAccept}>
                  Accept All
                </Button>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 md:hidden text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
