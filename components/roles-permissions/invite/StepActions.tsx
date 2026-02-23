import { Button } from "@/components/ui/button";

interface StepActionsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
}

export default function StepActions({
  onBack,
  onNext,
  nextLabel = "NEXT",
  backLabel = "BACK",
  nextDisabled = false,
}: StepActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-10">
      {onBack && (
        <Button variant="outline" onClick={onBack} className="sm:w-56">
          {backLabel}
        </Button>
      )}
      {onNext && (
        <Button onClick={onNext} disabled={nextDisabled} className="sm:w-56">
          {nextLabel}
        </Button>
      )}
    </div>
  );
}
