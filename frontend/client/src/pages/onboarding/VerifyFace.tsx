import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Loader2, Camera, CheckCircle, ArrowRight } from "lucide-react";

export default function VerifyFace() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'request' | 'scanning' | 'success'>('request');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 'scanning') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep('success');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleStartScan = () => {
    setStep('scanning');
  };

  const handleFinish = () => {
    setLocation("/dashboard");
  };

  return (
    <OnboardingLayout step={3}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            {step === 'success' ? 'Verification Complete!' : 'Face Verification'}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            {step === 'success' 
              ? 'Your identity has been verified successfully. Welcome to Bytus.' 
              : 'We need to make sure it\'s really you. Please look at the camera.'}
          </p>
        </div>

        <div className="relative aspect-square max-w-[280px] mx-auto bg-black rounded-full overflow-hidden border-4 border-border shadow-inner">
           {/* Camera Simulation */}
           <div className="absolute inset-0 flex items-center justify-center">
             {step === 'request' && (
               <Camera className="w-16 h-16 text-muted-foreground opacity-50" />
             )}
             
             {step === 'scanning' && (
               <>
                 {/* Simulated video feed background */}
                 <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                 <div className="relative z-10 w-full h-full flex items-center justify-center">
                   <div className="w-48 h-64 border-2 border-white/50 rounded-full" />
                 </div>
                 {/* Scan Line */}
                 <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/20 to-transparent w-full h-full animate-[scan_2s_ease-in-out_infinite] z-20" />
               </>
             )}

             {step === 'success' && (
               <div className="absolute inset-0 bg-green-500 flex items-center justify-center animate-in fade-in zoom-in duration-500">
                 <CheckCircle className="w-24 h-24 text-white" />
               </div>
             )}
           </div>

           {/* Progress Ring for Scanning */}
           {step === 'scanning' && (
             <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
               <circle
                 cx="50%"
                 cy="50%"
                 r="48%"
                 fill="none"
                 stroke="#e5e7eb"
                 strokeWidth="4"
               />
               <circle
                 cx="50%"
                 cy="50%"
                 r="48%"
                 fill="none"
                 stroke="hsl(var(--primary))"
                 strokeWidth="4"
                 strokeDasharray="283" // Approx circumference for r=45% of 280px container.. simple approx
                 strokeDashoffset={283 - (283 * progress) / 100}
                 className="transition-all duration-100 ease-linear"
                 pathLength="283"
               />
             </svg>
           )}
        </div>

        {step === 'scanning' && (
          <p className="text-center text-sm font-medium text-primary animate-pulse">
            Scanning face geometry... {progress}%
          </p>
        )}

        <div className="pt-4">
          {step === 'request' && (
            <Button className="w-full h-11 text-base" onClick={handleStartScan}>
              <Camera className="mr-2 w-4 h-4" /> Start Camera
            </Button>
          )}

          {step === 'scanning' && (
            <Button className="w-full h-11 text-base" disabled>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Verifying...
            </Button>
          )}

          {step === 'success' && (
            <Button className="w-full h-11 text-base bg-green-600 hover:bg-green-700" onClick={handleFinish}>
              Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
}
