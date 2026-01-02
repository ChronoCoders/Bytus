import { 
  LayoutDashboard, 
  Landmark, 
  ArrowRightLeft, 
  Key, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  DollarSign,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", volume: 45000 },
  { name: "Feb", volume: 52000 },
  { name: "Mar", volume: 48000 },
  { name: "Apr", volume: 61000 },
  { name: "May", volume: 55000 },
  { name: "Jun", volume: 67000 },
  { name: "Jul", volume: 72000 },
];

export function DashboardPreview() {
  return (
    <div className="w-full bg-card rounded-xl border border-border shadow-2xl overflow-hidden font-sans select-none">
      {/* Top Bar / Header */}
      <div className="border-b border-border bg-card/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 max-w-md mx-4 bg-muted/50 rounded-md px-3 py-1.5 text-xs text-muted-foreground flex items-center">
          <Search className="w-3 h-3 mr-2 opacity-50" />
          Search payments, logs...
        </div>
        <div className="flex items-center gap-3">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <Avatar className="w-6 h-6 border border-border">
            <AvatarImage src="/user-avatar.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex h-[500px]">
        {/* Sidebar */}
        <div className="w-48 border-r border-border bg-card/50 p-4 hidden sm:block">
          <div className="font-bold text-lg mb-6 px-2 text-primary">Bytus</div>
          <div className="space-y-1">
            {[
              { icon: LayoutDashboard, label: "Overview", active: true },
              { icon: Landmark, label: "Treasury" },
              { icon: ArrowRightLeft, label: "Transactions" },
              { icon: Key, label: "API Keys" },
              { icon: Settings, label: "Settings" },
            ].map((item, i) => (
              <div 
                key={i}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-background/50 p-6 overflow-hidden relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Merchant Dashboard</h2>
              <p className="text-xs text-muted-foreground">Welcome back, Acme Corp!</p>
            </div>
            <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground">
              Sync Ledger
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <CardTitle className="text-xs font-medium text-muted-foreground">Monthly Volume</CardTitle>
                <DollarSign className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-lg font-bold text-foreground">$1,245,000</div>
                <p className="text-[10px] text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5% vs last month
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <CardTitle className="text-xs font-medium text-muted-foreground">Daily Tx Count</CardTitle>
                <Activity className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-lg font-bold text-foreground">1,452</div>
                <p className="text-[10px] text-muted-foreground mt-1">~48 per hour</p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-0">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm">Processing Volume</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorVolumePreview" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="volume"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorVolumePreview)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Overlay to simulate "more content below" */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
