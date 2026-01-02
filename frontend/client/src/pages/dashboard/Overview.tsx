import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  TrendingUp,
  CreditCard,
  DollarSign,
  Activity,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

import { SendMoneyButton } from "@/components/dashboard/Actions";
import { ProcessingVolumeChart } from "@/components/dashboard/ProcessingVolumeChart";
import { BusLockStatus } from "@/components/dashboard/BusLockStatus";
import { SettlementSchedule } from "@/components/dashboard/SettlementSchedule";
import { cn } from "@/lib/utils";

export default function DashboardOverview() {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [monthlyVolume, setMonthlyVolume] = useState(0);
  const [txCount, setTxCount] = useState(0);
  const [pendingSettlement, setPendingSettlement] = useState(0);
  const [busLocked, setBusLocked] = useState(0);
  const [busRequired, setBusRequired] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const data = await api.getDashboardOverview();
      setMonthlyVolume(data.monthly_volume);
      setTxCount(data.transaction_count);
      setPendingSettlement(data.pending_settlement);
      setBusLocked(data.bus_locked);
      setBusRequired(data.bus_required);
    } catch (error) {
      toast({
        title: "Failed to load dashboard data",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    await fetchDashboardData();
    setTimeout(() => {
      setIsSyncing(false);
      toast({
        title: "Data Synced",
        description: "Dashboard updated with latest data.",
      });
    }, 500);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Merchant Dashboard</h1>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <p className="text-muted-foreground mt-1">Welcome back, Acme Corp! Here's your processing overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={handleSync} disabled={isSyncing}>
              <RefreshCcw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
              {isSyncing ? "Syncing..." : "Sync Ledger"}
            </Button>
            <SendMoneyButton label="Manual Payout" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-xs hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${monthlyVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          
          <BusLockStatus lockedAmount={busLocked} requiredAmount={busRequired} processingVolume={monthlyVolume} />
          
          <Card className="shadow-xs hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Transaction Count</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{txCount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-primary text-primary-foreground border-none shadow-lg shadow-primary/20 relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.02]">
            <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-primary-foreground/90">Pending Settlement</CardTitle>
              <CreditCard className="h-4 w-4 text-primary-foreground/90" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold mt-1">${pendingSettlement.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-primary-foreground/80">Next Batch: Today 17:00</p>
                <div className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">USD</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <ProcessingVolumeChart />
          <SettlementSchedule />
        </div>
        
        <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Payment from customer@acmecorp.com", type: "Gateway Payment", amount: "+$1,250.00", date: "Today, 14:32", icon: ArrowDownLeft, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", fee: "12 BUS" },
                  { name: "Batch Payout #8823", type: "Mass Payout", amount: "-$45,000.00", date: "Yesterday, 09:00", icon: ArrowUpRight, color: "text-foreground", bg: "bg-muted", fee: "150 BUS" },
                  { name: "API Transaction #TX-9938", type: "API Payment", amount: "+$320.00", date: "Yesterday, 16:45", icon: ArrowDownLeft, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", fee: "3 BUS" },
                  { name: "Payment from user_88293", type: "Gateway Payment", amount: "+$85.50", date: "Oct 24, 11:20", icon: ArrowDownLeft, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", fee: "1 BUS" },
                  { name: "Refund to order #9921", type: "Refund", amount: "-$120.00", date: "Oct 24, 10:05", icon: ArrowUpRight, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20", fee: "0 BUS" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 -mx-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", item.bg, item.color)}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.type} • Fee: {item.fee}</p>
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
    </DashboardLayout>
  );
}