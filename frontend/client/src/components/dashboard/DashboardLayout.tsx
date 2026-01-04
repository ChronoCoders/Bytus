import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Landmark,
  ArrowRightLeft,
  Key,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
// import userAvatar from "@assets/stock_images/professional_user_av_7ffae08f.jpg";
const userAvatar = "/profile_avatar.jpg";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Landmark, label: "Treasury", href: "/dashboard/treasury" },
    {
      icon: ArrowRightLeft,
      label: "Transactions",
      href: "/dashboard/transactions",
    },
    { icon: Key, label: "API Keys", href: "/dashboard/api-keys" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0">
        <div className="p-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="text-3xl" />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Link href="/">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">
              <LogOut className="w-5 h-5" />
              Sign Out
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="text-3xl" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-muted-foreground"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-3">
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:flex items-center max-w-md w-full relative ml-4">
              <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
              <Input
                id="global-search"
                name="search"
                placeholder="Search payments, logs, settings..."
                className="pl-10 bg-muted/50 border-input focus:bg-card transition-all"
              />
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Acme Corp</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent outline-none focus:ring-2 focus:ring-primary/20">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 p-3">
                      <div className="flex justify-between w-full">
                        <span className="font-medium">Batch Settlement</span>
                        <span className="text-xs text-muted-foreground">
                          2m ago
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Settlement #8821 initiated successfully.
                      </p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 p-3">
                      <div className="flex justify-between w-full">
                        <span className="font-medium">API Limit Warning</span>
                        <span className="text-xs text-muted-foreground">
                          1h ago
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Approaching 80% of daily request limit.
                      </p>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="w-full text-center justify-center text-primary font-medium cursor-pointer">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="h-8 w-px bg-border mx-1 hidden sm:block" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full ml-1"
                  >
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage
                        src={userAvatar}
                        alt="John Doe"
                        className="object-cover"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john@acmecorp.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <div className="w-full cursor-pointer">
                        Business Profile
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/api-keys">
                      <div className="w-full cursor-pointer">API Keys</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <div className="w-full cursor-pointer">Team Settings</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/">
                      <div className="w-full cursor-pointer text-destructive focus:text-destructive">
                        Log out
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}