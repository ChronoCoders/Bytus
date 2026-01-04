import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/lib/auth-context";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginRedirect } from "@/components/LoginRedirect";
import { Loader2 } from "lucide-react";

const Home = lazy(() => import("@/pages/Home.tsx"));
const Login = lazy(() => import("@/pages/Login.tsx"));
const Signup = lazy(() => import("@/pages/onboarding/Signup.tsx"));
const VerifyDocument = lazy(
  () => import("@/pages/onboarding/VerifyDocument.tsx"),
);
const VerifyFace = lazy(() => import("@/pages/onboarding/VerifyFace.tsx"));
const Overview = lazy(() => import("@/pages/dashboard/Overview.tsx"));
const Transactions = lazy(() => import("@/pages/dashboard/Transactions.tsx"));
const Treasury = lazy(() => import("@/pages/dashboard/Treasury.tsx"));
const ApiKeys = lazy(() => import("@/pages/dashboard/ApiKeys.tsx"));
const Settings = lazy(() => import("@/pages/dashboard/Settings.tsx"));
const Features = lazy(() => import("@/pages/Features.tsx"));
const Contact = lazy(() => import("@/pages/Contact.tsx"));
const Partnerships = lazy(() => import("@/pages/Partnerships.tsx"));
const Status = lazy(() => import("@/pages/Status.tsx"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy.tsx"));
const TermsOfUse = lazy(() => import("@/pages/TermsOfUse.tsx"));
const Cookies = lazy(() => import("@/pages/Cookies.tsx"));
const Disclaimer = lazy(() => import("@/pages/Disclaimer.tsx"));
const KycAml = lazy(() => import("@/pages/KycAml.tsx"));
const NotFound = lazy(() => import("@/pages/not-found.tsx"));

function ScrollToTop() {
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="bytus-theme">
        <AuthProvider>
          <Toaster />
          <ScrollToTop />
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            }
          >
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/features" component={Features} />
              <Route path="/contact" component={Contact} />
              <Route path="/partnerships" component={Partnerships} />
              <Route path="/status" component={Status} />
              <Route path="/privacy" component={PrivacyPolicy} />
              <Route path="/terms" component={TermsOfUse} />
              <Route path="/cookies" component={Cookies} />
              <Route path="/disclaimer" component={Disclaimer} />
              <Route path="/kyc-aml" component={KycAml} />

              <Route path="/login">
                <LoginRedirect>
                  <Login />
                </LoginRedirect>
              </Route>

              <Route path="/onboarding/signup">
                <LoginRedirect>
                  <Signup />
                </LoginRedirect>
              </Route>

              <Route
                path="/onboarding/verify-document"
                component={VerifyDocument}
              />
              <Route path="/onboarding/verify-face" component={VerifyFace} />

              <Route path="/dashboard">
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              </Route>

              <Route path="/dashboard/transactions">
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              </Route>

              <Route path="/dashboard/treasury">
                <ProtectedRoute>
                  <Treasury />
                </ProtectedRoute>
              </Route>

              <Route path="/dashboard/api-keys">
                <ProtectedRoute>
                  <ApiKeys />
                </ProtectedRoute>
              </Route>

              <Route path="/dashboard/settings">
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              </Route>

              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
