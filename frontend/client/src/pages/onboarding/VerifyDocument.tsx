import { useState } from "react";
import { useLocation } from "wouter";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  UploadCloud,
  FileCheck,
  ArrowRight,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function VerifyDocument() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleContinue = () => {
    setIsLoading(true);
    // Simulate upload/scan
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/onboarding/verify-face");
    }, 2000);
  };

  return (
    <OnboardingLayout step={2}>
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Verify Business Entity
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Please upload your Certificate of Incorporation or Business License.
          </p>
        </div>

        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:bg-muted/50",
            file ? "bg-green-500/10 border-green-500/30" : "",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept="image/*,.pdf"
          />

          <div className="flex flex-col items-center justify-center gap-4">
            {file ? (
              <>
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  <FileCheck className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Ready to upload
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Click or drag file to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG or PNG (max. 10MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button
            className="w-full h-11 text-base group"
            disabled={!file || isLoading}
            onClick={handleContinue}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying Document...
              </div>
            ) : (
              <>
                Verify Document{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
