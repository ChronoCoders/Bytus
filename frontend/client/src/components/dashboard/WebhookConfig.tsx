import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Webhook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WebhookConfig() {
  const { toast } = useToast();
  const [url, setUrl] = useState("https://api.yourcompany.com/webhooks/bytus");
  const [enabled, setEnabled] = useState(true);

  const handleSave = () => {
    toast({
      title: "Webhook Configuration Saved",
      description: "Test event has been sent to verify the endpoint.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Webhook className="w-5 h-5 text-primary" />
          <div>
            <CardTitle>Webhook Configuration</CardTitle>
            <CardDescription>Receive real-time payment notifications</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Endpoint URL</Label>
          <div className="flex gap-2">
            <Input 
              id="webhook-url" 
              name="webhook-url"
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              className="font-mono text-sm"
              autoComplete="off"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="active-status">Active Status</Label>
            <p className="text-xs text-muted-foreground">Enable or disable event delivery</p>
          </div>
          <Switch id="active-status" name="active-status" checked={enabled} onCheckedChange={setEnabled} />
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="outline" size="sm">Send Test Event</Button>
          <Button size="sm" onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
