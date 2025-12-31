import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("font-display font-extrabold italic tracking-tight select-none flex items-baseline text-primary", className)}>
      <span>bytus</span>
      <span className="text-accent text-[0.5em] ml-0.5">.</span>
    </div>
  );
}
