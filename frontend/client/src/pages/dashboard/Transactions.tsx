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
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Download,
  Loader2,
  RefreshCw,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const initialTransactions = [
  {
    id: "TX-1001",
    type: "Gateway Payment",
    method: "Customer Transfer",
    amount: "+$2,000.00",
    status: "Settled",
    date: "Oct 24, 2024",
    icon: ArrowDownLeft,
    color: "text-green-600",
    fee: "12.5 BUS",
  },
  {
    id: "TX-1002",
    type: "API Charge",
    method: "Credit Card",
    amount: "+$145.50",
    status: "Settled",
    date: "Oct 24, 2024",
    icon: Code,
    color: "text-green-600",
    fee: "1.2 BUS",
  },
  {
    id: "TX-1003",
    type: "Refund",
    method: "Original Payment",
    amount: "-$120.00",
    status: "Pending",
    date: "Oct 23, 2024",
    icon: RefreshCw,
    color: "text-red-600",
    fee: "0.0 BUS",
  },
  {
    id: "TX-1004",
    type: "Batch Settlement",
    method: "Wire Transfer",
    amount: "-$45,230.50",
    status: "Completed",
    date: "Oct 23, 2024",
    icon: ArrowUpRight,
    color: "text-foreground",
    fee: "150 BUS",
  },
  {
    id: "TX-1005",
    type: "Gateway Payment",
    method: "Crypto (ETH)",
    amount: "+$3,400.00",
    status: "Settled",
    date: "Oct 21, 2024",
    icon: ArrowDownLeft,
    color: "text-green-600",
    fee: "25.0 BUS",
  },
  {
    id: "TX-1006",
    type: "Treasury Rebalance",
    method: "Swap",
    amount: "$50,000.00",
    status: "Completed",
    date: "Oct 19, 2024",
    icon: ArrowUpRight,
    color: "text-blue-600",
    fee: "45.0 BUS",
  },
  {
    id: "TX-1007",
    type: "Network Fee",
    method: "Bytus Chain",
    amount: "-150 BUS",
    status: "Completed",
    date: "Oct 18, 2024",
    icon: ArrowUpRight,
    color: "text-orange-600",
    fee: "-",
  },
];

export default function TransactionsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [filter, setFilter] = useState("All");

  const filteredTransactions = initialTransactions.filter((tx) => {
    const matchesSearch =
      tx.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.includes(searchTerm);

    const matchesFilter = filter === "All" || tx.type.includes(filter);

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
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Transaction History
            </h1>
            <p className="text-muted-foreground mt-1">
              Audit trail of all payments, settlements, and fees.
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, amount, or method..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["All", "Payment", "Settlement", "Refund", "Fee"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className="whitespace-nowrap"
              >
                {f === "All" ? "All Activity" : f + "s"}
              </Button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Network Fee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    className="hover:bg-muted/50 cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <tx.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {tx.id}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {tx.method}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-medium text-xs uppercase tracking-wide">
                      {tx.type}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          tx.status === "Settled" || tx.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
                        )}
                      >
                        {tx.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {tx.fee}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {tx.date}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-bold font-mono",
                        tx.amount.startsWith("+")
                          ? "text-green-600"
                          : tx.amount.startsWith("-")
                            ? "text-foreground"
                            : "text-blue-600",
                      )}
                    >
                      {tx.amount}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
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
