import { useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ArrowDownLeft, 
  RefreshCcw, 
  TrendingUp,
  CreditCard,
  DollarSign,
  Bitcoin,
  Wifi
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { SendMoneyButton } from "@/components/dashboard/Actions";
import { BytusIcon } from "@/components/ui/BytusIcon";

const initialData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1900 },
  { name: "Mar", total: 1500 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 2100 },
  { name: "Jun", total: 3200 },
  { name: "Jul", total: 3800 },
];

export default function DashboardOverview() {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);
  const [chartData, setChartData] = useState(initialData);
  const [balance, setBalance] = useState(45231.89);
  const [cryptoBalance] = useState(12450);
  const [cryptoValue, setCryptoValue] = useState(2350.00);

  const [timeRange, setTimeRange] = useState("1M");

  // Live data simulation
  useEffect(() => {
    // Generate data based on time range
    const generateData = () => {
      const points = timeRange === "1D" ? 24 : timeRange === "1W" ? 7 : timeRange === "1M" ? 30 : 12;
      const baseValue = 1000;
      return Array.from({ length: points }, (_, i) => ({
        name: timeRange === "1D" ? `${i}h` : timeRange === "1W" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i] : timeRange === "1M" ? `${i+1}` : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
        total: baseValue + Math.random() * 500
      }));
    };
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChartData(generateData());
  }, [timeRange]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate crypto balance slightly
      const fluctuation = (Math.random() - 0.5) * 10;
      setBalance(prev => prev + fluctuation);
      setCryptoValue(prev => prev + (fluctuation * 0.5));
      
      // Update chart data occasionally to simulate live market
      if (Math.random() > 0.7) {
        setChartData(prev => {
          const newData = [...prev];
          const lastValue = newData[newData.length - 1].total;
          const newLastValue = lastValue + (Math.random() - 0.5) * 100;
          newData[newData.length - 1] = { ...newData[newData.length - 1], total: newLastValue };
          return newData;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast({
        title: "Account Synced",
        description: "Your balances are up to date with the blockchain.",
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <p className="text-muted-foreground mt-1">Welcome back, John! Here's your financial overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={handleSync} disabled={isSyncing}>
              <RefreshCcw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
              {isSyncing ? "Syncing..." : "Sync"}
            </Button>
            <SendMoneyButton />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-xs hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-xs hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Native Token</CardTitle>
              <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-background">
                <BytusIcon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{cryptoBalance.toLocaleString()} BYTS</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +${cryptoValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (12%)
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-xs hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Spending</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$3,240.00</div>
              <p className="text-xs text-muted-foreground mt-1">
                42 transactions this month
              </p>
            </CardContent>
          </Card>
           <Card className="bg-primary text-primary-foreground border-none shadow-lg shadow-primary/20 relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.02]">
            <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-primary-foreground/90">Active Card</CardTitle>
              <Wifi className="h-4 w-4 text-primary-foreground/90 rotate-90" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-xl font-mono tracking-wider mt-1">•••• 4242</div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-primary-foreground/80">Exp 12/28</p>
                <div className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">VISA</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Chart Section */}
          <Card className="col-span-4 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>
                    Your asset growth over time
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                  {["1D", "1W", "1M", "1Y"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={cn(
                        "px-3 py-1 rounded-md text-xs font-medium transition-all",
                        timeRange === range 
                          ? "bg-background text-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      )}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))' }}
                      cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="col-span-3 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Netflix Subscription", type: "Subscription", amount: "-$14.99", date: "Today", icon: CreditCard, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
                  { name: "Received Bitcoin", type: "Crypto Deposit", amount: "+$1,250.00", date: "Yesterday", icon: Bitcoin, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
                  { name: "Starbucks Coffee", type: "Food & Drink", amount: "-$5.40", date: "Yesterday", icon: CreditCard, color: "text-muted-foreground", bg: "bg-muted" },
                  { name: "Freelance Payment", type: "Income", amount: "+$3,400.00", date: "Oct 24", icon: ArrowDownLeft, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
                  { name: "Apple Store", type: "Electronics", amount: "-$299.00", date: "Oct 22", icon: CreditCard, color: "text-muted-foreground", bg: "bg-muted" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 -mx-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", item.bg, item.color)}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-bold", item.amount.startsWith("+") ? "text-green-600" : "text-foreground")}>
                        {item.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}