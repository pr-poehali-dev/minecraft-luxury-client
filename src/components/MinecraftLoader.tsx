import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface LoaderStep {
  id: string;
  name: string;
  progress: number;
  status: "pending" | "loading" | "complete";
}

interface MinecraftLoaderProps {
  onComplete?: () => void;
}

const MinecraftLoader = ({ onComplete }: MinecraftLoaderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<LoaderStep[]>([
    { id: "1", name: "Загрузка текстур", progress: 0, status: "loading" },
    { id: "2", name: "Загрузка моделей", progress: 0, status: "pending" },
    { id: "3", name: "Загрузка звуков", progress: 0, status: "pending" },
    { id: "4", name: "Инициализация клиента", progress: 0, status: "pending" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        const current = newSteps[currentStep];

        if (current && current.status === "loading") {
          current.progress += Math.random() * 15;

          if (current.progress >= 100) {
            current.progress = 100;
            current.status = "complete";

            if (currentStep < newSteps.length - 1) {
              newSteps[currentStep + 1].status = "loading";
              setCurrentStep(currentStep + 1);
            } else {
              clearInterval(interval);
              setTimeout(() => {
                onComplete?.();
              }, 500);
            }
          }
        }

        return newSteps;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [currentStep, onComplete]);

  const totalProgress = steps.reduce((acc, step) => acc + step.progress, 0) / steps.length;

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8 space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center animate-pulse">
            <Icon name="Box" size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold luxury-gradient-text">
            LUXURY CLIENT
          </h2>
          <p className="text-foreground/60">Загрузка ресурсов...</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Общий прогресс</span>
              <span>{Math.round(totalProgress)}%</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  step.status === "loading"
                    ? "bg-primary/10 border border-primary/20"
                    : step.status === "complete"
                    ? "bg-muted/50 opacity-60"
                    : "bg-muted/30 opacity-40"
                }`}
              >
                <div className="flex-shrink-0">
                  {step.status === "complete" ? (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                  ) : step.status === "loading" ? (
                    <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30" />
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-xs text-foreground/60">
                      {step.status === "loading" || step.status === "complete"
                        ? `${Math.round(step.progress)}%`
                        : ""}
                    </span>
                  </div>
                  {(step.status === "loading" || step.status === "complete") && (
                    <Progress value={step.progress} className="h-1" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-foreground/40 pt-4">
            <Icon name="Loader2" size={14} className="animate-spin" />
            <span>Пожалуйста, подождите...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinecraftLoader;