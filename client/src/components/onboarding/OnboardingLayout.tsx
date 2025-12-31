import { Link } from "wouter";
import { Check } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step: number;
}

export function OnboardingLayout({ children, step }: OnboardingLayoutProps) {
  const steps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Identity" },
    { number: 3, label: "Verification" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="text-3xl" />
          </Link>
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login">
              <a className="text-primary font-medium hover:underline">Log in</a>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        {/* Progress Steps */}
        <div className="w-full max-w-3xl mb-12">
          <div className="relative flex justify-between">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-border -z-10 -translate-y-1/2 rounded-full" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((s) => {
              const isCompleted = s.number < step;
              const isCurrent = s.number === step;

              return (
                <div
                  key={s.number}
                  className="flex flex-col items-center gap-2 bg-transparent px-2"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4",
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isCurrent
                          ? "bg-card border-primary text-primary"
                          : "bg-card border-border text-muted-foreground",
                    )}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : s.number}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium uppercase tracking-wider",
                      isCurrent || isCompleted
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <div className="w-full max-w-md bg-card rounded-2xl shadow-xl shadow-primary/5 border border-border p-8">
          {children}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground max-w-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy.
          Your information is encrypted and securely stored.
        </p>
      </main>
    </div>
  );
}
