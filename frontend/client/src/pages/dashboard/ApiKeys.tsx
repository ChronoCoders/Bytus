import { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Plus, Copy, Trash2 } from "lucide-react";
import { api } from "../../lib/api";
import { useLocation } from "wouter";
import { useToast } from "../../hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  created_at: string;
  last_used: string | null;
  permissions: string[];
  status: string;
}

export default function ApiKeys() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [showCreatedKey, setShowCreatedKey] = useState(false);
  const [creating, setCreating] = useState(false);

  const loadApiKeys = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getApiKeys();
      setKeys(data);
    } catch (err: any) {
      if (err.message?.includes("401") || err.message?.includes("Unauthorized")) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        setLocation("/login");
      } else {
        setError(err.message || "Failed to load API keys");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApiKeys();
  }, []);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a key name",
        variant: "destructive",
      });
      return;
    }

    try {
      setCreating(true);
      const result = await api.createApiKey(newKeyName.trim());
      setCreatedKey(result.secret_key);
      setShowCreatedKey(true);
      setNewKeyName("");
      await loadApiKeys();
      toast({
        title: "Success",
        description: "API key created successfully",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to create API key",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteKey = async (keyId: string, keyName: string) => {
    if (!confirm(`Are you sure you want to delete "${keyName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await api.deleteApiKey(keyId);
      await loadApiKeys();
      toast({
        title: "Success",
        description: "API key deleted successfully",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete API key",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleCloseCreatedKeyDialog = () => {
    setShowCreatedKey(false);
    setCreatedKey(null);
    setIsCreateDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">API Keys</h1>
            <p className="text-muted-foreground">
              Manage API keys for programmatic access
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create API Key</DialogTitle>
                <DialogDescription>
                  Enter a name for your new API key. This will help you identify
                  it later.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name">Key Name</Label>
                  <Input
                    id="key-name"
                    placeholder="e.g., Production Server"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateKey} disabled={creating}>
                  {creating ? "Creating..." : "Create Key"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={showCreatedKey} onOpenChange={handleCloseCreatedKeyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>API Key Created</DialogTitle>
              <DialogDescription>
                Copy this key now. You won't be able to see it again.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <code className="flex-1 text-sm break-all">{createdKey}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => createdKey && copyToClipboard(createdKey)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCloseCreatedKeyDialog}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="p-6">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading API keys...
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              {error}
              <Button
                variant="outline"
                className="mt-4"
                onClick={loadApiKeys}
              >
                Retry
              </Button>
            </div>
          ) : keys.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No API keys yet. Create one to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {keys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{key.name}</h3>
                      <Badge
                        variant={
                          key.status === "active" ? "default" : "secondary"
                        }
                      >
                        {key.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">
                      {key.key_prefix}...
                    </p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Created: {formatDate(key.created_at)}</span>
                      <span>Last used: {formatDate(key.last_used)}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteKey(key.id, key.name)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 bg-muted/50">
          <h2 className="text-lg font-semibold mb-2">API Key Security</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Store API keys securely and never commit them to version control</li>
            <li>• Rotate keys regularly and immediately if compromised</li>
            <li>• Use different keys for different environments</li>
            <li>• Monitor key usage in your dashboard</li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
