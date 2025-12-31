import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  Plus,
  Shield,
  Lock,
  Wifi,
  EyeOff,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CardsPage() {
  const { toast } = useToast();
  const [frozenCards, setFrozenCards] = useState<Record<string, boolean>>({});
  const [pinVisible, setPinVisible] = useState(false);

  const toggleFreeze = (cardId: string = "default") => {
    setFrozenCards((prev) => {
      const newState = { ...prev, [cardId]: !prev[cardId] };
      toast({
        title: newState[cardId] ? "Card Frozen" : "Card Unfrozen",
        description: newState[cardId]
          ? "Your card is now temporarily locked."
          : "Your card is active and ready to use.",
        variant: newState[cardId] ? "destructive" : "default",
      });
      return newState;
    });
  };

  const isFrozen = frozenCards["default"] || false;

  const handleShowPin = () => {
    // In a real app, this would require authentication
    setPinVisible(true);
    setTimeout(() => setPinVisible(false), 3000); // Hide after 3 seconds
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Cards
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your physical and virtual cards.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4" />
                Get New Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order New Card</DialogTitle>
                <DialogDescription>
                  Choose your card type. Physical cards will be shipped to your
                  registered address.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="border rounded-xl p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-center space-y-2">
                  <CreditCard className="w-8 h-8 mx-auto text-primary" />
                  <div className="font-medium">Virtual Card</div>
                  <div className="text-xs text-muted-foreground">
                    Instant activation
                  </div>
                </div>
                <div className="border rounded-xl p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-center space-y-2">
                  <div className="w-8 h-8 mx-auto bg-foreground rounded-md" />
                  <div className="font-medium">Physical Metal</div>
                  <div className="text-xs text-muted-foreground">
                    Shipped in 3-5 days
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() =>
                    toast({
                      title: "Card Ordered",
                      description: "Your new card is on the way!",
                    })
                  }
                >
                  Order Card
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Card Preview */}
          <div className="space-y-6">
            <div className="relative aspect-[1.586/1] w-full max-w-md mx-auto perspective-1000 group">
              <div
                className={`w-full h-full rounded-2xl bg-linear-to-br from-gray-900 to-black p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden transition-all duration-500 transform group-hover:scale-105 ${isFrozen ? "grayscale opacity-80" : ""}`}
              >
                {/* Card Background Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16" />

                {isFrozen && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-[2px]">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-medium">Card Frozen</span>
                    </div>
                  </div>
                )}

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center">
                      {/* Chip */}
                      <div className="w-8 h-6 rounded border border-yellow-500/50 bg-yellow-600/20 relative overflow-hidden">
                        <div className="absolute inset-0 grid grid-cols-2 gap-px bg-yellow-500/30">
                          <div className="border-r border-yellow-500/30" />
                          <div />
                        </div>
                        <div className="absolute top-1/2 w-full h-px bg-yellow-500/30" />
                      </div>
                    </div>
                    <Wifi className="w-6 h-6 rotate-90 opacity-70" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xl sm:text-2xl font-mono tracking-widest opacity-90">
                      <span>••••</span>
                      <span>••••</span>
                      <span>••••</span>
                      <span>4242</span>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[10px] opacity-60 uppercase tracking-wider mb-1">
                          Card Holder
                        </div>
                        <div className="font-medium tracking-wide">
                          JOHN DOE
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] opacity-60 uppercase tracking-wider mb-1">
                          Expires
                        </div>
                        <div className="font-medium tracking-wide">12/28</div>
                      </div>
                      <div className="font-bold italic text-2xl ml-4">VISA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <Button
                variant={isFrozen ? "default" : "outline"}
                className={`flex flex-col items-center gap-2 h-auto py-4 border-border hover:text-primary ${isFrozen ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : "hover:bg-accent"}`}
                onClick={() => toggleFreeze("default")}
              >
                <Lock className="w-5 h-5" />
                <span className="text-xs">
                  {isFrozen ? "Unfreeze" : "Freeze"}
                </span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 border-border hover:bg-accent hover:text-primary relative"
                onClick={handleShowPin}
              >
                {pinVisible ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
                <span className="text-xs">
                  {pinVisible ? "1234" : "Show Pin"}
                </span>
                {pinVisible && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 border-border hover:bg-accent hover:text-primary"
              >
                <Shield className="w-5 h-5" />
                <span className="text-xs">Settings</span>
              </Button>
            </div>
          </div>

          {/* Card Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Controls</CardTitle>
                <CardDescription>
                  Manage how your card can be used.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    id: "online",
                    label: "Online Payments",
                    desc: "Allow payments on websites and apps",
                  },
                  {
                    id: "atm",
                    label: "ATM Withdrawals",
                    desc: "Allow cash withdrawals at ATMs",
                  },
                  {
                    id: "international",
                    label: "International Use",
                    desc: "Allow payments outside your home country",
                  },
                  {
                    id: "contactless",
                    label: "Contactless Payments",
                    desc: "Tap to pay functionality",
                  },
                ].map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between space-x-2"
                  >
                    <Label
                      htmlFor={setting.id}
                      className="flex flex-col space-y-1"
                    >
                      <span>{setting.label}</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        {setting.desc}
                      </span>
                    </Label>
                    <Switch
                      id={setting.id}
                      defaultChecked={setting.id !== "international"}
                      onCheckedChange={(checked) => {
                        toast({
                          title: "Setting Updated",
                          description: `${setting.label} has been ${checked ? "enabled" : "disabled"}.`,
                        });
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending Limits</CardTitle>
                <CardDescription>
                  Set daily and monthly spending limits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily Limit</span>
                    <span className="font-medium">$2,500 / $5,000</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/2 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
