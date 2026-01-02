import { cn } from "@/lib/utils";

interface BytusIconProps {
  className?: string;
}

export function BytusIcon({ className }: BytusIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={cn("w-6 h-6", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text 
        x="12" 
        y="12" 
        dy=".35em" 
        textAnchor="middle" 
        fontSize="16" 
        fontWeight="bold" 
        fontFamily="sans-serif"
      >
        B
      </text>
    </svg>
  );
}
