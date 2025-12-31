import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bitcoin, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  DashboardActions,
  AddAssetButton,
} from "@/components/dashboard/Actions";

function EthereumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L3.5 13L12 18L20.5 13L12 2Z" />
      <path d="M3.5 13L12 22L20.5 13" />
    </svg>
  );
}

import { BytusIcon } from "@/components/ui/BytusIcon";

const initialAssets = [
  {
    name: "US Dollar",
    symbol: "USD",
    balance: "24,531.89",
    value: 24531.89,
    change: "+0.0%",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Bytus",
    symbol: "BYTS",
    balance: "12,450.00",
    value: 14800.0,
    change: "+12.5%",
    isPositive: true,
    icon: BytusIcon,
    color: "bg-white text-primary dark:text-background",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: "0.4521",
    value: 28450.0,
    change: "+2.4%",
    isPositive: true,
    icon: Bitcoin,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "4.210",
    value: 8120.45,
    change: "-1.2%",
    isPositive: false,
    icon: EthereumIcon,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function WalletPage() {
  const [assets, setAssets] = useState(initialAssets);
  // Total Net Worth is now derived state

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) => {
        return prevAssets.map((asset) => {
          if (asset.symbol === "USD") return asset;

          const fluctuation = (Math.random() - 0.5) * (asset.value * 0.002);
          const newValue = asset.value + fluctuation;

          return {
            ...asset,
            value: newValue,
            isPositive: fluctuation > 0,
          };
        });
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Derived state for total net worth
  const totalNetWorth = assets.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              My Wallet
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your fiat and crypto assets.
            </p>
          </div>
          <AddAssetButton />
        </div>

        {/* Total Balance Card */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
            <CardContent className="p-8 relative z-10">
              <p className="text-muted-foreground font-medium mb-2">
                Total Net Worth
              </p>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                $
                {totalNetWorth.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h2>
              <div className="flex gap-3">
                <DashboardActions />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[200px] text-muted-foreground">
              {/* Placeholder for a Pie Chart */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full border-8 border-muted mx-auto mb-2 border-t-primary border-r-accent" />
                <p className="text-sm">70% Crypto / 30% Fiat</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Your Assets</h3>
          <div className="grid gap-4">
            {assets.map((asset) => (
              <Card
                key={asset.symbol}
                className="hover:shadow-md transition-shadow cursor-pointer border-border"
              >
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        asset.color,
                      )}
                    >
                      {/* @ts-expect-error - dynamic image loading */}
                      {asset.image ? (
                        /* @ts-expect-error - dynamic image loading */
                        <img
                          src={asset.image}
                          alt={asset.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <asset.icon className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">
                        {asset.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {asset.balance} {asset.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-foreground">
                      $
                      {asset.value.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </h4>
                    <p
                      className={cn(
                        "text-sm flex items-center justify-end gap-1",
                        asset.isPositive === undefined
                          ? "text-muted-foreground"
                          : asset.isPositive
                            ? "text-green-600"
                            : "text-destructive",
                      )}
                    >
                      {asset.isPositive !== undefined &&
                        (asset.isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        ))}
                      {asset.change}
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
