import { cn } from "@/lib/utils";
import { Wifi } from "lucide-react";

interface CreditCardProps {
  className?: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  variant?: "silver" | "blue" | "dark" | "glass" | "image";
  imageSrc?: string;
}

export function CreditCard({ 
  className,
  cardNumber = "4242 4242 4242 4242",
  cardHolder = "JOHN DOE",
  expiryDate = "12/28",
  variant = "silver",
  imageSrc
}: CreditCardProps) {
  
  return (
    <div className={cn(
      "relative w-full aspect-[1.586] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden transition-all duration-300 select-none",
      // Variants
      variant === "silver" && "bg-gradient-to-br from-gray-100 via-gray-300 to-gray-200 border border-blue-400/30",
      variant === "blue" && "bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white shadow-blue-900/20",
      variant === "dark" && "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white border border-gray-700",
      variant === "glass" && "bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl",
      variant === "image" && "bg-transparent shadow-none",
      className
    )}>
      {variant === "image" && imageSrc && (
        <img 
          src={imageSrc} 
          alt="Credit Card Background" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Glossy overlay / Noise texture - Disable for image variant as it might conflict */}
      {variant !== "image" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-0" />
        </>
      )}
      
      {/* Blue Glow Border Effect (for silver/glass variants) */}
      {(variant === "silver" || variant === "glass") && (
        <div className="absolute inset-0 rounded-2xl border-[2px] border-blue-500/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)] pointer-events-none z-20" />
      )}

      <div className="relative z-30 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          {/* Chip - Hide if image variant (assuming image has chip, or we can toggle) 
              The user image HAS a chip, so we hide ours.
          */}
          {variant !== "image" ? (
            <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400 border border-yellow-500/50 flex flex-col justify-between p-[2px] relative overflow-hidden shadow-sm">
               <div className="absolute inset-0 border border-yellow-600/20 rounded-md" />
               <div className="w-full h-[1px] bg-yellow-700/30 mt-2" />
               <div className="w-full h-[1px] bg-yellow-700/30 mb-2" />
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-yellow-700/30" />
            </div>
          ) : <div />}
          
          {/* Contactless - Hide if image variant (user image has it) */}
          {variant !== "image" && (
            <Wifi className={cn(
              "w-8 h-8 rotate-90 opacity-80",
              (variant === "silver" || variant === "glass") ? "text-gray-600" : "text-white/80"
            )} />
          )}
        </div>

        <div className="space-y-4 pt-10 sm:pt-14">
          {/* Card Number */}
          <div className={cn(
            "text-xl sm:text-2xl font-mono tracking-[0.15em] drop-shadow-sm font-semibold",
            (variant === "silver" || variant === "image") ? "text-gray-800" : "text-white"
          )}>
            {cardNumber}
          </div>

          <div className="flex justify-between items-end">
            {/* Card Holder */}
            <div className="space-y-1">
              <div className={cn("text-[9px] uppercase tracking-widest font-semibold opacity-60", (variant === "silver" || variant === "image") ? "text-gray-600" : "text-blue-100")}>
                Card Holder
              </div>
              <div className={cn("font-medium tracking-wider uppercase text-sm sm:text-base", (variant === "silver" || variant === "image") ? "text-gray-800" : "text-white")}>
                {cardHolder}
              </div>
            </div>

            {/* Expiry */}
            <div className="space-y-1 text-right">
               <div className={cn("text-[9px] uppercase tracking-widest font-semibold opacity-60", (variant === "silver" || variant === "image") ? "text-gray-600" : "text-blue-100")}>
                Expires
              </div>
              <div className={cn("font-medium tracking-wider text-sm sm:text-base", (variant === "silver" || variant === "image") ? "text-gray-800" : "text-white")}>
                {expiryDate}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visa Logo - User image likely doesn't have it or we can overlay it */}
      <div className="absolute top-6 right-6 font-bold italic text-2xl tracking-tighter opacity-90 z-30">
        <span className={cn((variant === "silver" || variant === "image") ? "text-blue-800" : "text-white")}>VISA</span>
      </div>
    </div>
  );
}