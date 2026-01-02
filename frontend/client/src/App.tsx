import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const FeaturesPage = lazy(() => import("@/pages/Features"));
const DashboardOverview = lazy(() => import("@/pages/dashboard/Overview"));
const TreasuryPage = lazy(() => import("@/pages/dashboard/Treasury"));
const TransactionsPage = lazy(() => import("@/pages/dashboard/Transactions"));
const ApiKeysPage = lazy(() => import("@/pages/dashboard/ApiKeys"));
const SettingsPage = lazy(() => import("@/pages/dashboard/Settings"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/onboarding/Signup"));
const VerifyDocument = lazy(() => import("@/pages/onboarding/VerifyDocument"));
const VerifyFace = lazy(() => import("@/pages/onboarding/VerifyFace"));
const Contact = lazy(() => import("@/pages/Contact"));
const Disclaimer = lazy(() => import("@/pages/Disclaimer"));
const TermsOfUse = lazy(() => import("@/pages/TermsOfUse"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const KycAml = lazy(() => import("@/pages/KycAml"));
const Partnerships = lazy(() => import("@/pages/Partnerships"));
const Status = lazy(() => import("@/pages/Status"));

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    // If there is a hash, scroll to it
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Otherwise scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/features" component={FeaturesPage} />
        <Route path="/dashboard" component={DashboardOverview} />
        <Route path="/dashboard/treasury" component={TreasuryPage} />
        <Route path="/dashboard/transactions" component={TransactionsPage} />
        <Route path="/dashboard/apikeys" component={ApiKeysPage} />
        <Route path="/dashboard/settings" component={SettingsPage} />
        
        {/* Redirects for legacy routes */}
        <Route path="/dashboard/wallet">
          {() => <TreasuryPage />}
        </Route>
        <Route path="/dashboard/cards">
           {() => <ApiKeysPage />}
        </Route>

        <Route path="/login" component={Login} />
        <Route path="/onboarding/signup" component={Signup} />
        <Route path="/onboarding/verify-document" component={VerifyDocument} />
        <Route path="/onboarding/verify-face" component={VerifyFace} />
        <Route path="/contact" component={Contact} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/terms" component={TermsOfUse} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/kyc-aml" component={KycAml} />
        <Route path="/partnerships" component={Partnerships} />
        <Route path="/status" component={Status} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

import { CookieBanner } from "@/components/layout/CookieBanner";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
