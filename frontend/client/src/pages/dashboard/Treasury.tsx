import { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { api } from "../../lib/api";
import { useNavigate } from "wouter";

interface TreasuryPosition {
  name: string;
  protocol: string;
  balance: string;
  value: number;
  apy: string;
}

export function Treasury() {
  const [, setLocation] = useNavigate();
  const [positions, setPositions] = useState<TreasuryPosition[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTreasury = async () => {
    try {
      setLoading(true);
      setError(null);
      const [positionsData, portfolioData] = await Promise.all([
        api.getTreasuryPositions(),
        api.getTreasuryPortfolio(),
      ]);
      setPositions(positionsData);
      setTotalValue(portfolioData.total_value);
    } catch (err: any) {
      if (err.message?.includes("401") || err.message?.includes("Unauthorized")) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        setLocation("/login");
      } else {
        setError(err.message || "Failed to load treasury data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTreasury();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const parseAPY = (apy: string): number => {
    return parseFloat(apy.replace("%", "")) || 0;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Treasury Management</h1>
            <p className="text-muted-foreground">
              Manage digital assets across multiple protocols
            </p>
          </div>
          <Button disabled>Deploy Capital</Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading treasury data...
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            {error}
            <Button
              variant="outline"
              className="mt-4"
              onClick={loadTreasury}
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(totalValue)}
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Positions</p>
                  <p className="text-3xl font-bold">{positions.length}</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Avg APY</p>
                  <p className="text-3xl font-bold">
                    {positions.length > 0
                      ? (
                          positions.reduce(
                            (sum, p) => sum + parseAPY(p.apy),
                            0
                          ) / positions.length
                        ).toFixed(2)
                      : "0.00"}
                    %
                  </p>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Active Positions</h2>
              {positions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No treasury positions yet. Deploy capital to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {positions.map((position, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <h3 className="font-semibold">{position.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {position.protocol}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-semibold">
                          {formatCurrency(position.value)}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">
                            {position.balance}
                          </p>
                          <Badge
                            variant="outline"
                            className={
                              parseAPY(position.apy) > 5
                                ? "text-green-500"
                                : ""
                            }
                          >
                            {parseAPY(position.apy) > 5 ? (
                              <TrendingUp className="mr-1 h-3 w-3" />
                            ) : (
                              <TrendingDown className="mr-1 h-3 w-3" />
                            )}
                            {position.apy} APY
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
