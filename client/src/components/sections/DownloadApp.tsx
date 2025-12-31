import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function DownloadApp() {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground flex items-center justify-center gap-3">
            Get the App <span className="text-primary">→</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Experience the full power of Bytus on any device. Download our
            top-rated app today.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative group">
              <Button
                variant="outline"
                className="h-16 px-6 border-2 hover:border-primary hover:bg-primary/5 transition-all w-full opacity-60 cursor-not-allowed"
              >
                <div className="flex items-center gap-3 text-left">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-foreground transition-colors"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.57-.84 1.58.12 2.8.94 3.66 2.37-3.27 1.94-2.56 6.09.8 7.5-.66 1.48-1.57 2.85-2.54 3.2zm-2.92-16.2c.6 1.05-.07 2.65-.95 3.28-.9.7-2.52.86-3.15-.36-.58-1.12.1-2.6.98-3.28.98-.75 2.54-.7 3.12.36z" />
                  </svg>
                  <div>
                    <div className="text-[10px] uppercase font-bold opacity-60">
                      Download on the
                    </div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </div>
              </Button>
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                Coming Soon
              </div>
            </div>

            <div className="relative group">
              <Button
                variant="outline"
                className="h-16 px-6 border-2 hover:border-primary hover:bg-primary/5 transition-all w-full opacity-60 cursor-not-allowed"
              >
                <div className="flex items-center gap-3 text-left">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-foreground transition-colors"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.048 2.048 0 01-2.048-2.048V3.862a2.048 2.048 0 012.048-2.048zM15.27 13.478l4.937-4.937a1.024 1.04 0 010 1.458l-4.937 4.937-1.458-1.458 1.458 0zM15.27 10.522L5.083.336a2.048 2.048 0 012.048 0l8.139 10.186zM5.083 23.664L15.27 13.478l1.458 1.458-8.139 10.186a2.048 2.048 0 01-2.048 0z" />
                  </svg>
                  <div>
                    <div className="text-[10px] uppercase font-bold opacity-60">
                      Get it on
                    </div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </div>
              </Button>
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                Coming Soon
              </div>
            </div>

            <div className="relative group">
              <Button
                variant="outline"
                className="h-16 px-6 border-2 hover:border-primary hover:bg-primary/5 transition-all w-full opacity-60 cursor-not-allowed"
              >
                <div className="flex items-center gap-3 text-left">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-foreground transition-colors"
                  >
                    <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm10.949-1.551L24 0v11.551H10.949V1.898zM0 12.45h9.75v9.451L0 20.55V12.45zm10.949 0H24v11.551l-13.051-1.898V12.45z" />
                  </svg>
                  <div>
                    <div className="text-[10px] uppercase font-bold opacity-60">
                      Get it on
                    </div>
                    <div className="text-sm font-bold">Windows 10</div>
                  </div>
                </div>
              </Button>
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                Coming Soon
              </div>
            </div>

            <div className="relative group">
              <Button
                variant="outline"
                className="h-16 px-6 border-2 hover:border-primary hover:bg-primary/5 transition-all w-full opacity-60 cursor-not-allowed"
              >
                <div className="flex items-center gap-3 text-left">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-foreground transition-colors"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.08-3.11-1.06.05-2.35.71-3.11 1.61-.69.83-1.29 2.15-1.13 3.24 1.18.09 2.38-.91 3.16-1.74" />
                  </svg>
                  <div>
                    <div className="text-[10px] uppercase font-bold opacity-60">
                      Download on the
                    </div>
                    <div className="text-sm font-bold">Mac App Store</div>
                  </div>
                </div>
              </Button>
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                Coming Soon
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
