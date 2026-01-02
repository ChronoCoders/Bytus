import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, AlertCircle, Clock, Activity, Server, Globe, Database, Shield } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

export default function Status() {
  const systems = [
    { name: "API Gateway", status: "operational", uptime: "99.99%", icon: Server },
    { name: "Dashboard & UI", status: "operational", uptime: "100%", icon: Globe },
    { name: "Payment Processing", status: "operational", uptime: "99.98%", icon: Activity },
    { name: "Webhooks", status: "operational", uptime: "99.95%", icon: Database },
    { name: "Compliance Engine", status: "operational", uptime: "100%", icon: Shield },
    { name: "Settlement Layer", status: "operational", uptime: "98.50%", icon: Clock },
  ];

  const incidents = [
    {
      date: "Oct 24, 2025",
      title: "Delayed Settlements in EUR Region",
      status: "resolved",
      updates: [
        { time: "14:30 UTC", message: "All pending settlements have been processed." },
        { time: "10:15 UTC", message: "We are investigating reports of delayed SEPA transfers." },
      ]
    },
    {
      date: "Sep 12, 2025",
      title: "Scheduled Maintenance: API V1",
      status: "completed",
      updates: [
        { time: "04:00 UTC", message: "Maintenance completed successfully." },
        { time: "02:00 UTC", message: "Starting scheduled database upgrades." },
      ]
    }
  ];

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
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-display font-bold">System Status</h1>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-full text-sm font-medium border border-green-500/20">
                <CheckCircle2 className="w-4 h-4" />
                All Systems Operational
              </div>
            </div>

            {/* System Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {systems.map((system, i) => (
                <div key={i} className="bg-card p-6 rounded-2xl border border-border flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <system.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{system.name}</div>
                      <div className="text-xs text-muted-foreground">{system.uptime} uptime</div>
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    system.status === "operational" ? "text-green-500" : "text-yellow-500"
                  )}>
                    {system.status === "operational" ? (
                      <>Operational <CheckCircle2 className="w-4 h-4" /></>
                    ) : (
                      <>Degraded Performance <AlertCircle className="w-4 h-4" /></>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Past Incidents */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Past Incidents</h2>
              <div className="space-y-6">
                {incidents.map((incident, i) => (
                  <div key={i} className="border-l-2 border-border pl-8 relative pb-8 last:pb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-muted border-4 border-background" />
                    <div className="mb-2">
                      <span className="text-sm text-muted-foreground">{incident.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-4">{incident.title}</h3>
                    <div className="space-y-4">
                      {incident.updates.map((update, j) => (
                        <div key={j} className="text-sm">
                          <span className="font-mono text-muted-foreground mr-3">{update.time}</span>
                          <span className="text-foreground/80">{update.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}