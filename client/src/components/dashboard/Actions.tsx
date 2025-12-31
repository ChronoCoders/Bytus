import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";

export function DashboardActions() {
  const [openSend, setOpenSend] = useState(false);
  const { toast } = useToast();
  const [openDeposit, setOpenDeposit] = useState(false);

  const handleSend = () => {
    setOpenSend(false);
    toast({
      title: "Transfer Initiated",
      description: "Your funds are being transferred securely.",
    });
  };

  const handleDeposit = () => {
    setOpenDeposit(false);
    toast({
      title: "Deposit Successful",
      description: "Funds have been added to your account.",
    });
  };

  return (
    <>
      <Dialog open={openDeposit} onOpenChange={setOpenDeposit}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-0 backdrop-blur-md">
            <ArrowUpRight className="w-4 h-4 mr-2" /> Deposit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogDescription>
              Add funds to your wallet from a connected bank account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount-deposit" className="text-right">
                Amount
              </Label>
              <Input id="amount-deposit" defaultValue="$1,000.00" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source" className="text-right">
                Source
              </Label>
              <div className="col-span-3 p-2 border rounded-md text-sm">
                Chase Bank •••• 4582
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleDeposit}>Confirm Deposit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openSend} onOpenChange={setOpenSend}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-0 backdrop-blur-md">
            <ArrowDownLeft className="w-4 h-4 mr-2" /> Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Transfer funds to an external account or wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount-withdraw" className="text-right">
                Amount
              </Label>
              <Input id="amount-withdraw" defaultValue="$500.00" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="destination" className="text-right">
                To
              </Label>
              <Input id="destination" placeholder="Wallet Address or Email" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSend}>Confirm Withdrawal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SendMoneyButton() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSend = () => {
    setOpen(false);
    toast({
      title: "Money Sent",
      description: "Your transfer has been processed successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <ArrowUpRight className="w-4 h-4" />
          Send Money
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Money</DialogTitle>
          <DialogDescription>
            Send crypto or fiat instantly to anyone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recipient" className="text-right">
              Recipient
            </Label>
            <Input id="recipient" placeholder="@username or address" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="asset" className="text-right">
              Asset
            </Label>
            <div className="col-span-3">
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option>US Dollar ($)</option>
                <option>Bytus (BYTS)</option>
                <option>Bitcoin (BTC)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input id="amount" placeholder="0.00" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSend}>Send Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AddAssetButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4" />
          Add Asset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
          <DialogDescription>
            Enable a new cryptocurrency wallet in your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
           <div className="grid grid-cols-2 gap-4">
              {['Solana', 'Cardano', 'Polkadot', 'Avalanche'].map(coin => (
                <div key={coin} className="border p-4 rounded-lg hover:bg-accent cursor-pointer flex items-center justify-between group">
                  <span className="font-medium">{coin}</span>
                  <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </div>
              ))}
           </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}