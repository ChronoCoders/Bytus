import { ReactNode } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/lib/auth-context";

export function LoginRedirect({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
}