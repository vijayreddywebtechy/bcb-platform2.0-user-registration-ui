"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ConditionsOfAccessContent from "./ConditionsOfAccessContent";

interface ConditionsOfAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ConditionsOfAccessModal({
  open,
  onOpenChange,
}: ConditionsOfAccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col !rounded-2xl p-0 gap-0 [&>button]:right-4 [&>button]:top-4 [&>button]:text-white [&>button]:hover:text-white/90 [&>button]:hover:bg-white/10">
        {/* Header - #0051FF */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-[#0047E6] bg-[#0051FF] rounded-t-2xl">
          <DialogTitle className="text-lg md:text-xl font-medium text-white">
            Conditions of Access
          </DialogTitle>
          <DialogDescription className="text-sm text-white/90 mt-0.5">
            Platform Access Terms and Conditions
          </DialogDescription>
        </div>

        {/* Scrollable content from local PDF data */}
        <div className="flex-1 overflow-y-auto min-h-0 px-6 py-5 bg-white">
          <ConditionsOfAccessContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
