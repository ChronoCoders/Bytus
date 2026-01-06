import { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Search, Download } from "lucide-react";
import { api } from "../../lib/api";
import { useLocation } from "wouter";

interface Transaction {
  id: string;
  tx_type: string;
  amount: string;
  currency: string;
  status: string;
  created_at: string;
  customer_email: string | null;
}

export default function Transactions() {
  const [, setLocation] = useLocation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: any = { page, limit: 10 };
      if (search) params.search = search;
      if (filter !== "all") params.filter = filter;

      const data = await api.getTransactions(params);
      setTransactions(data.transactions);
      setTotal(data.total);
    } catch (err: any) {
      if (err.message?.includes("401") || err.message?.includes("Unauthorized")) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        setLocation("/login");
      } else {
        setError(err.message || "Failed to load transactions");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [page, filter]);

  const handleSearch = () => {
    setPage(1);
    loadTransactions();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "settled":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "failed":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">
              View and manage all payment transactions
            </p>
          </div>
          <Button variant="outline" disabled>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search by email or status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="settled">Settled</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading transactions...
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              {error}
              <Button
                variant="outline"
                className="mt-4"
                onClick={loadTransactions}
              >
                Retry
              </Button>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No transactions found
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Transaction ID</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-mono text-sm">
                          {tx.id.slice(0, 8)}...
                        </td>
                        <td className="py-3 px-4 capitalize">{tx.tx_type}</td>
                        <td className="py-3 px-4 font-semibold">
                          {parseFloat(tx.amount).toFixed(2)} {tx.currency}
                        </td>
                        <td className="py-3 px-4">
                          {tx.customer_email || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(tx.status)}>
                            {tx.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {formatDate(tx.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Showing {transactions.length} of {total} transactions
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={transactions.length < 10}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
