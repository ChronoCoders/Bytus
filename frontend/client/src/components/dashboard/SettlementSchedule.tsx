import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const settlements = [
  {
    id: "SET-8821",
    date: "Today, 17:00",
    amount: "$45,230.50",
    currency: "USD",
    status: "Scheduled",
    items: 142,
  },
  {
    id: "SET-8820",
    date: "Yesterday",
    amount: "$38,190.00",
    currency: "USD",
    status: "Completed",
    items: 118,
  },
  {
    id: "SET-8819",
    date: "Oct 24",
    amount: "€12,450.00",
    currency: "EUR",
    status: "Completed",
    items: 45,
  },
];

export function SettlementSchedule() {
  return (
    <Card className="col-span-3 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Settlement Batches</CardTitle>
            <CardDescription>
              Upcoming and recent fiat settlements
            </CardDescription>
          </div>
          <a
            href="#"
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settlements.map((settlement) => (
              <TableRow
                key={settlement.id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium text-xs">
                  {settlement.id}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {settlement.date}
                </TableCell>
                <TableCell className="text-sm font-bold">
                  {settlement.amount}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      settlement.status === "Completed"
                        ? "outline"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {settlement.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
