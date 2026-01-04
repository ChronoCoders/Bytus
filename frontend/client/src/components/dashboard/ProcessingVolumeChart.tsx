import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export function ProcessingVolumeChart() {
  const [timeRange, setTimeRange] = useState("1M");

  const data = useMemo(() => {
    // Simulate data changes based on time range
    const points =
      timeRange === "1D"
        ? 24
        : timeRange === "1W"
          ? 7
          : timeRange === "1M"
            ? 30
            : 12;
    const baseValue = 50000;
    return Array.from({ length: points }, (_, i) => ({
      name:
        timeRange === "1D"
          ? `${i}h`
          : timeRange === "1W"
            ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]
            : timeRange === "1M"
              ? `${i + 1}`
              : [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ][i],
      volume:
        baseValue +
        Math.abs(
          Math.sin(
            i * 1337 + (timeRange === "1W" ? 42 : timeRange === "1M" ? 123 : 0),
          ),
        ) *
          20000,
    }));
  }, [timeRange]);

  return (
    <Card className="col-span-4 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Processing Volume Trend</CardTitle>
            <CardDescription>
              Total transaction volume processed over time
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
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50",
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
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
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
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  backgroundColor: "hsl(var(--popover))",
                  color: "hsl(var(--popover-foreground))",
                }}
                cursor={{
                  stroke: "hsl(var(--primary))",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Volume",
                ]}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVolume)"
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
