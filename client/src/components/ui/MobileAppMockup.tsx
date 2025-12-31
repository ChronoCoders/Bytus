import { ArrowUpRight, ArrowDownLeft, Wallet, Bitcoin, Activity } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

function EthereumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 2 9 15-9-15Z" />
      <path d="M12 2 3 17l9-15Z" />
      <path d="m12 22 9-5-9 5Z" />
      <path d="M12 22 3 17l9 5Z" />
      <path d="m12 22 9-5-9-15-9 15 9 5Z" />
    </svg>
  )
}

function SolanaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 18h12l4-4H8z" />
      <path d="M8 10h12l4-4H8z" />
      <path d="M4 2h12l4 4H8z" />
      <path d="M8 10L4 6" />
      <path d="M16 14l4 4" />
    </svg>
  )
}

const data = [
  { value: 4000 },
  { value: 3000 },
  { value: 5000 },
  { value: 2780 },
  { value: 1890 },
  { value: 2390 },
  { value: 3490 },
  { value: 4200 },
];

export function MobileAppMockup() {
  return (
    <div className="relative w-full max-w-[320px] mx-auto aspect-[9/19] bg-zinc-950 rounded-[2.5rem] border-[8px] border-zinc-900 shadow-2xl overflow-hidden font-sans select-none">
      {/* Status Bar */}
      <div className="absolute top-0 w-full h-8 px-6 flex justify-between items-center z-20 text-[10px] text-foreground font-medium">
        <span>9:41</span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 bg-foreground rounded-full opacity-20" />
          <div className="w-3 h-3 bg-foreground rounded-full opacity-20" />
          <div className="w-3 h-3 bg-foreground rounded-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative h-full w-full bg-background text-foreground overflow-hidden flex flex-col">
        
        {/* Header Section */}
        <div className="pt-12 px-6 pb-6 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">My Wallet</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-muted border border-border overflow-hidden">
              <img src="/profile_avatar.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Total Balance</div>
            <div className="text-3xl font-bold tracking-tight">$24,562.00</div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium">
              <ArrowUpRight className="w-3 h-3" />
              <span>+2.4% (24h)</span>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="h-32 w-full -mt-4 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-4 gap-2 px-6 mb-8">
          {[
            { icon: ArrowUpRight, label: "Send" },
            { icon: ArrowDownLeft, label: "Receive" },
            { icon: Wallet, label: "Buy" },
            { icon: Activity, label: "Swap" },
          ].map((action, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-muted/50 hover:bg-muted flex items-center justify-center text-primary transition-colors cursor-pointer">
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-muted-foreground">{action.label}</span>
            </div>
          ))}
        </div>

        {/* Assets List */}
        <div className="flex-1 bg-muted/30 rounded-t-[2rem] p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Assets</span>
            <span className="text-xs text-primary cursor-pointer">See All</span>
          </div>

          {[
            { name: "Bitcoin", symbol: "BTC", amount: "0.45", value: "$19,240", change: "+1.2%", color: "text-orange-500", bg: "bg-orange-500/10", Icon: Bitcoin },
            { name: "Ethereum", symbol: "ETH", amount: "4.20", value: "$8,120", change: "+4.5%", color: "text-indigo-500", bg: "bg-indigo-500/10", Icon: EthereumIcon },
            { name: "Solana", symbol: "SOL", amount: "145.0", value: "$3,402", change: "-0.8%", color: "text-emerald-500", bg: "bg-emerald-500/10", Icon: SolanaIcon },
          ].map((asset, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-background/50 p-2 -mx-2 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${asset.bg} ${asset.color} flex items-center justify-center`}>
                  <asset.Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">{asset.name}</div>
                  <div className="text-xs text-muted-foreground">{asset.amount} {asset.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{asset.value}</div>
                <div className={`text-xs ${asset.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {asset.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Nav Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/20 rounded-full" />
      </div>
    </div>
  );
}
