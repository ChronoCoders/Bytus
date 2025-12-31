import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Download,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const initialTransactions = [
  { id: "TX-1001", type: "Deposit", method: "Bank Transfer", amount: "+$2,000.00", status: "Completed", date: "Oct 24, 2024", icon: ArrowDownLeft, color: "text-green-600" },
  { id: "TX-1002", type: "Payment", method: "Netflix", amount: "-$14.99", status: "Completed", date: "Oct 23, 2024", icon: ArrowUpRight, color: "text-gray-900" },
  { id: "TX-1003", type: "Withdrawal", method: "Bitcoin Wallet", amount: "-0.025 BTC", status: "Pending", date: "Oct 23, 2024", icon: ArrowUpRight, color: "text-gray-900" },
  { id: "TX-1004", type: "Deposit", method: "Stripe Payout", amount: "+$3,400.00", status: "Completed", date: "Oct 21, 2024", icon: ArrowDownLeft, color: "text-green-600" },
  { id: "TX-1005", type: "Payment", method: "Apple Store", amount: "-$299.00", status: "Completed", date: "Oct 20, 2024", icon: ArrowUpRight, color: "text-gray-900" },
  { id: "TX-1006", type: "Exchange", method: "USD to BYTS", amount: "$500.00", status: "Completed", date: "Oct 19, 2024", icon: ArrowUpRight, color: "text-blue-600" },
  { id: "TX-1007", type: "Payment", method: "Starbucks", amount: "-$5.40", status: "Completed", date: "Oct 18, 2024", icon: ArrowUpRight, color: "text-gray-900" },
];

export default function TransactionsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [filter, setFilter] = useState("All");

  const filteredTransactions = initialTransactions.filter(tx => {
    const matchesSearch = 
      tx.method.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.includes(searchTerm);
    
    const matchesFilter = filter === "All" || tx.type === filter;

    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Export Successful",
        description: "Your transaction history has been downloaded.",
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Transactions</h1>
            <p className="text-muted-foreground mt-1">View and manage your transaction history.</p>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search transactions..." 
              className="pl-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["All", "Deposit", "Payment", "Withdrawal", "Exchange"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className="whitespace-nowrap"
              >
                {f === "All" ? "All Transactions" : f + "s"}
              </Button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Transaction</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <tx.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{tx.method}</div>
                          <div className="text-xs text-muted-foreground">{tx.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{tx.type}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        tx.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      )}>
                        {tx.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                    <TableCell className={cn("text-right font-medium", tx.amount.startsWith("+") ? "text-green-600" : "text-foreground")}>
                      {tx.amount}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}