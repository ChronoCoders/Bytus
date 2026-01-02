import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyCardProps {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
  permissions: string[];
  status: "active" | "revoked";
}

export function ApiKeyCard({ name, prefix, created, lastUsed, permissions, status }: ApiKeyCardProps) {
  const { toast } = useToast();
  const [showKey, setShowKey] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`${prefix}sk_live_...`);
    toast({
      title: "API Key Copied",
      description: "Key copied to clipboard. Keep it secure.",
    });
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-base font-medium">{name}</CardTitle>
          <div className="flex gap-2">
             {permissions.map(p => (
               <Badge key={p} variant="outline" className="text-[10px] px-1.5 py-0 h-5 font-normal bg-background">
                 {p}
               </Badge>
             ))}
          </div>
        </div>
        <Badge variant={status === "active" ? "default" : "destructive"}>
          {status === "active" ? "Active" : "Revoked"}
        </Badge>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md font-mono text-sm border border-border">
          <span className="text-muted-foreground flex-1">
            {showKey ? `${prefix}sk_live_837492837492834` : `${prefix}•••••••••••••••••••••`}
          </span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowKey(!showKey)}>
            {showKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
            <Copy className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Created: {created}</span>
          <span>Last used: {lastUsed}</span>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 py-2 px-4 flex justify-end">
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 gap-2">
          <Trash2 className="w-3 h-3" /> Revoke Key
        </Button>
      </CardFooter>
    </Card>
  );
}
