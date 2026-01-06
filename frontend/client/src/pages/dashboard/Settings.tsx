import { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { api } from "../../lib/api";
import { useLocation } from "wouter";
import { useToast } from "../../hooks/use-toast";

interface UserSettings {
  company_name: string;
  email: string;
  website: string;
  registration_number: string;
  kyc_status: string;
}

export default function Settings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>({
    company_name: "",
    email: "",
    website: "",
    registration_number: "",
    kyc_status: "pending",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getSettings();
      setSettings(data);
    } catch (err: any) {
      if (err.message?.includes("401") || err.message?.includes("Unauthorized")) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        setLocation("/login");
      } else {
        setError(err.message || "Failed to load settings");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.updateSettings({
        company_name: settings.company_name,
        email: settings.email,
        website: settings.website,
      });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12 text-muted-foreground">
          Loading settings...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12 text-red-500">
          {error}
          <Button
            variant="outline"
            className="mt-4"
            onClick={loadSettings}
          >
            Retry
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and business information
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={settings.company_name}
                    onChange={(e) =>
                      setSettings({ ...settings, company_name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={settings.website}
                    onChange={(e) =>
                      setSettings({ ...settings, website: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registration-number">
                    Registration Number
                  </Label>
                  <Input
                    id="registration-number"
                    value={settings.registration_number}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Contact support to update this field
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">KYC Status</h2>
                <Badge className={getKycStatusColor(settings.kyc_status)}>
                  {settings.kyc_status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {settings.kyc_status === "verified"
                  ? "Your account is fully verified. You have access to all features."
                  : settings.kyc_status === "pending"
                  ? "Your verification is being reviewed. This typically takes 1-2 business days."
                  : "Please contact support for more information about your verification status."}
              </p>
              {settings.kyc_status !== "verified" && (
                <Button variant="outline" disabled>
                  Upload Documents
                </Button>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button variant="outline" onClick={loadSettings}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
