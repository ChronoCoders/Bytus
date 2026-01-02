import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock, AlertCircle } from "lucide-react";
import { BytusIcon } from "@/components/ui/BytusIcon";

interface TreasuryLockStatusProps {
  lockedAmount: number;
  totalAum: number;
}

export function TreasuryLockStatus({ lockedAmount, totalAum }: TreasuryLockStatusProps) {
  // 0.5% of AUM requirement
  const requiredAmount = Math.ceil(totalAum * 0.005);
  const percentage = Math.min((lockedAmount / requiredAmount) * 100, 100);
  const isHealthy = percentage >= 100;

  return (
    <Card className="shadow-xs hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Treasury Access Lock</CardTitle>
        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Lock className="h-3 w-3" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline mb-2">
          <div className="text-2xl font-bold text-foreground flex items-center gap-2">
            {lockedAmount.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ {requiredAmount.toLocaleString()}</span>
          </div>
          <BytusIcon className="h-4 w-4 text-primary" />
        </div>
        
        <Progress value={percentage} className="h-2 mb-2" />
        
        <div className="flex items-center justify-between text-xs">
          <span className={isHealthy ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
            {isHealthy ? "Compliance Met" : "Action Required"}
          </span>
          <span className="text-muted-foreground">0.5% of AUM</span>
        </div>

        {!isHealthy && (
          <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-xs text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
            <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
            <span>Increase lock to support total assets of ${totalAum.toLocaleString()}.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
