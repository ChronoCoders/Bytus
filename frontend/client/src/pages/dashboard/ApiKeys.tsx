import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Key, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApiKeyCard } from "@/components/dashboard/ApiKeyCard";
import { WebhookConfig } from "@/components/dashboard/WebhookConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ApiKeysPage() {
  const { toast } = useToast();
  const [newKeyName, setNewKeyName] = useState("");

  const handleCreateKey = () => {
    toast({
      title: "API Key Created",
      description: "New secret key generated. Save it securely.",
    });
    setNewKeyName("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Developer API
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage API keys, webhooks, and integration settings.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4" />
                Create New Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create API Key</DialogTitle>
                <DialogDescription>
                  Generate a new secret key for server-side integration.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name">Key Name</Label>
                  <Input
                    id="key-name"
                    name="key-name"
                    placeholder="e.g. Production Server 1"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateKey}>Generate Key</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* API Keys List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Key className="w-4 h-4" /> Active Keys
            </h3>

            <div className="space-y-4">
              <ApiKeyCard
                id="key_1"
                name="Production Server"
                prefix="pk_live_"
                created="Oct 12, 2024"
                lastUsed="Just now"
                permissions={["read", "write", "payments"]}
                status="active"
              />
              <ApiKeyCard
                id="key_2"
                name="Staging Environment"
                prefix="pk_test_"
                created="Sep 28, 2024"
                lastUsed="2 hours ago"
                permissions={["read", "write"]}
                status="active"
              />
              <ApiKeyCard
                id="key_3"
                name="Audit Read-Only"
                prefix="pk_live_"
                created="Aug 15, 2024"
                lastUsed="1 day ago"
                permissions={["read"]}
                status="active"
              />
            </div>
          </div>

          {/* Webhook & Docs */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Configuration
            </h3>

            <WebhookConfig />

            <div className="bg-muted/50 rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">Integration Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-primary hover:underline">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Client Libraries (SDKs)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Testing Guide
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
