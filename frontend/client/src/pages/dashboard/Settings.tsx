import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lock, Loader2, Building2, CheckCircle2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings Saved",
        description: "Your business profile has been updated.",
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage business profile, team members, and compliance.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Business Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                Business Profile
              </CardTitle>
              <CardDescription>
                Company details and public information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl font-bold border border-border">
                  AC
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">Acme Corp Inc.</h3>
                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Business
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    defaultValue="Acme Corp Inc."
                    autoComplete="organization"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input
                    id="regNumber"
                    defaultValue="US-DE-882910"
                    disabled
                    className="bg-muted"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    defaultValue="finance@acmecorp.com"
                    type="email"
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    defaultValue="https://acmecorp.com"
                    autoComplete="url"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="min-w-[120px]"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    Team Members
                  </CardTitle>
                  <CardDescription>
                    Manage access to your dashboard.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Alexandra Chen",
                    email: "alexandra@acmecorp.com",
                    role: "Owner",
                  },
                  {
                    name: "Marcus Thorne",
                    email: "marcus@acmecorp.com",
                    role: "Admin",
                  },
                  {
                    name: "David Kim",
                    email: "david@acmecorp.com",
                    role: "Viewer",
                  },
                ].map((member) => (
                  <div
                    key={member.email}
                    className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                        {member.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-muted-foreground" />
                Security & Compliance
              </CardTitle>
              <CardDescription>
                Protect your account and view compliance status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-4">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Required for all team members.
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Enforced
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-4">
                <div>
                  <h4 className="font-medium">KYC/KYB Status</h4>
                  <p className="text-sm text-muted-foreground">
                    Level 3 - Unlimited Processing
                  </p>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Verified
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
