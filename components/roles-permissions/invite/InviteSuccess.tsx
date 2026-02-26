"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InviteSuccessProps {
  onAddAnother?: () => void;
  onDone?: () => void;
}

export default function InviteSuccess({ onAddAnother, onDone }: InviteSuccessProps) {
  return (
    <div className="w-full lg:max-w-[640px] m-auto flex flex-col items-center text-center py-10">
      {/* Success icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>

      {/* Heading */}
      <h1 className="text-base md:text-lg font-medium text-secondary mb-3">
        Invite(s) Sent Successfully
      </h1>

      {/* Description */}
      <p className="text-sm text-secondary leading-relaxed max-w-md mb-10">
        Your invite(s) have been sent. The invited user(s) will receive an email with instructions
        on how to access the Business Hub. You can track the status of your invites from the Roles
        &amp; Permissions page.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button variant="outline" onClick={onAddAnother} className="sm:w-56">
          ADD ANOTHER USER
        </Button>
        <Button onClick={onDone} className="sm:w-56">
          DONE
        </Button>
      </div>
    </div>
  );
}
