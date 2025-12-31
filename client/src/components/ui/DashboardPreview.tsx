import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  CreditCard,
  Settings,
  Bell,
  Search,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1900 },
  { name: "Mar", total: 1500 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 2100 },
  { name: "Jun", total: 3200 },
  { name: "Jul", total: 3800 },
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
          Search transactions...
        </div>
        <div className="flex items-center gap-3">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <Avatar className="w-6 h-6 border border-border">
            <AvatarImage src="/user-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
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
              { icon: Wallet, label: "My Wallet" },
              { icon: ArrowRightLeft, label: "Transactions" },
              { icon: CreditCard, label: "Cards" },
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
              <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
              <p className="text-xs text-muted-foreground">
                Welcome back, John!
              </p>
            </div>
            <Button
              size="sm"
              className="h-8 text-xs bg-primary text-primary-foreground"
            >
              Add Funds
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total Balance
                </CardTitle>
                <DollarSign className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-lg font-bold text-foreground">
                  $45,231.89
                </div>
                <p className="text-[10px] text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +20.1%
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Spending
                </CardTitle>
                <CreditCard className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-lg font-bold text-foreground">
                  $3,240.00
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  42 txns
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-0">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm">Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient
                        id="colorTotalPreview"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorTotalPreview)"
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
