import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BadgeDollarSign,
  Landmark,
  TrendingUp,
  ArrowRightLeft,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardActions } from "@/components/dashboard/Actions";
import { Button } from "@/components/ui/button";

const initialAssets = [
  { 
    name: "USDC Treasury",  
    protocol: "Compound V3", 
    balance: "250,000", 
    value: 250000.00, 
    apy: "4.8%", 
    isPositive: true,
    icon: BadgeDollarSign,
    color: "bg-blue-100 text-blue-600"
  },
  { 
    name: "Ethereum Liquidity", 
    protocol: "Uniswap V3", 
    balance: "45.2 ETH", 
    value: 125400.00, 
    apy: "12.5%", 
    isPositive: true,
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600"
  },
  { 
    name: "Operational Float", 
    protocol: "Internal Vault", 
    balance: "185,000 USD", 
    value: 185000.00, 
    apy: "0.0%", 
    isPositive: false,
    icon: Landmark, 
    color: "bg-green-100 text-green-600"
  },
  { 
    name: "BUS Reserve", 
    protocol: "Staking Contract", 
    balance: "50,000 BUS", 
    value: 62500.00, 
    apy: "8.2%", 
    isPositive: true,
    icon: Briefcase,
    color: "bg-orange-100 text-orange-600"
  },
];

export default function TreasuryPage() {
  const [assets] = useState(initialAssets);

  // Total Net Worth is now derived state
  const totalNetWorth = assets.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Treasury Management</h1>
            <p className="text-muted-foreground mt-1">Monitor corporate crypto holdings and DeFi positions.</p>
          </div>
          <Button className="gap-2">
             <ArrowRightLeft className="w-4 h-4" /> Rebalance Portfolio
          </Button>
        </div>

        {/* Total Balance Card */}
        <div className="grid gap-6 md:grid-cols-3">
           <Card className="shadow-xl relative overflow-hidden md:col-span-2">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
             <CardContent className="p-8 relative z-10">
               <p className="text-muted-foreground font-medium mb-2">Total Treasury Value</p>
               <h2 className="text-4xl font-bold mb-6 text-foreground">
                 ${totalNetWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
               </h2>
               <div className="flex gap-3">
                 <DashboardActions />
               </div>
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
               <CardTitle>Yield Performance</CardTitle>
               <CardDescription>Average APY across all positions</CardDescription>
             </CardHeader>
             <CardContent className="flex flex-col items-center justify-center h-[160px] text-muted-foreground">
               <div className="text-4xl font-bold text-green-600 mb-2">5.2%</div>
               <p className="text-sm">+$2,450 est. monthly revenue</p>
             </CardContent>
           </Card>
        </div>

        {/* Assets List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Active Positions</h3>
          <div className="grid gap-4">
            {assets.map((asset) => (
              <Card key={asset.name} className="hover:shadow-md transition-shadow cursor-pointer border-border">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", asset.color)}>
                        <asset.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{asset.name}</h4>
                      <p className="text-sm text-muted-foreground">{asset.protocol} • {asset.balance}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-foreground">
                      ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h4>
                    <p className={cn("text-sm flex items-center justify-end gap-1 font-medium", asset.apy !== "0.0%" ? "text-green-600" : "text-muted-foreground")}>
                      {asset.apy !== "0.0%" && <TrendingUp className="w-3 h-3" />}
                      APY: {asset.apy}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
