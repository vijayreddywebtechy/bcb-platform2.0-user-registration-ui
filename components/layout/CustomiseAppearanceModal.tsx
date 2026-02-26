"use client";

import { useState } from "react";
import Image from "next/image";
import { Moon, Landmark, Sparkles, Briefcase, SquareArrowOutUpRight, Files, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import icnPaint from "@/assets/images/icons/icn_paint.svg";

interface CustomiseAppearanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface MyLinksItems {
  documents: boolean;
  queryTracker: boolean;
  helpCenter: boolean;
  accounts: boolean;
}

export default function CustomiseAppearanceModal({
  open,
  onOpenChange,
}: CustomiseAppearanceModalProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [cashFlows, setCashFlows] = useState(true);
  const [myLinks, setMyLinks] = useState(true);
  const [myLinksItems, setMyLinksItems] = useState<MyLinksItems>({
    documents: true,
    queryTracker: true,
    helpCenter: false,
    accounts: true,
  });
  const [businessAccounts, setBusinessAccounts] = useState(true);
  const [digitalHubLinks, setDigitalHubLinks] = useState(true);
  const [formalStatements, setFormalStatements] = useState(true);

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleApply = () => {
    onOpenChange(false);
  };

  const updateMyLinksItem = (key: keyof MyLinksItems, checked: boolean) => {
    setMyLinksItems((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[590px] !rounded-2xl p-0 gap-0 [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Image src={icnPaint} alt="Customize" width={24} height={24} />
            </div>
            <div>
              <DialogTitle className="text-lg md:text-xl font-medium text-primary-dark">
                Customize Appearance
              </DialogTitle>
              <DialogDescription className="text-sm md:text-base text-primary-dark mt-0.5">
                Customize your dashboard experience
              </DialogDescription>
            </div>
          </div>
          <DialogClose asChild>
            <button
              type="button"
              className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 hover:bg-primary-dark transition-colors"
            >
              <X className="w-4 h-4 text-white" strokeWidth={2.5} />
            </button>
          </DialogClose>
        </div>

        {/* Body */}
        <div className="px-6 max-h-[60vh] overflow-y-auto">
          {/* Dark mode */}
          <div className="flex items-center justify-between py-5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-primary-dark" strokeWidth={1.5} />
              <span className="text-sm sm:text-base font-medium text-primary-dark">Dark mode</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          {/* Cash flows */}
          <div className="flex items-center justify-between py-5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Landmark className="w-5 h-5 text-primary-dark" strokeWidth={1.5} />
              <span className="text-sm sm:text-base font-medium text-primary-dark">Cash flows</span>
            </div>
            <Switch checked={cashFlows} onCheckedChange={setCashFlows} />
          </div>

          {/* My links */}
          <div className="py-5 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary-dark" strokeWidth={1.5} />
                <span className="text-sm sm:text-base font-medium text-primary-dark">My links</span>
              </div>
              <Switch checked={myLinks} onCheckedChange={setMyLinks} />
            </div>

            {myLinks && (
              <div className="ml-8 mt-4 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={myLinksItems.documents}
                    onCheckedChange={(checked) => updateMyLinksItem("documents", !!checked)}
                  />
                  <span className="text-sm text-secondary">Documents</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={myLinksItems.queryTracker}
                    onCheckedChange={(checked) => updateMyLinksItem("queryTracker", !!checked)}
                  />
                  <span className="text-sm text-secondary">Query tracker</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={myLinksItems.helpCenter}
                    onCheckedChange={(checked) => updateMyLinksItem("helpCenter", !!checked)}
                  />
                  <span className="text-sm text-secondary">help center</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={myLinksItems.accounts}
                    onCheckedChange={(checked) => updateMyLinksItem("accounts", !!checked)}
                  />
                  <span className="text-sm text-secondary">Accounts</span>
                </label>
              </div>
            )}
          </div>

          {/* Business accounts */}
          <div className="flex items-center justify-between py-5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-primary-dark" strokeWidth={1.5} />
              <span className="text-sm sm:text-base font-medium text-primary-dark">
                Business accounts
              </span>
            </div>
            <Switch checked={businessAccounts} onCheckedChange={setBusinessAccounts} />
          </div>

          {/* Digital hub links */}
          <div className="flex items-center justify-between py-5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <SquareArrowOutUpRight className="w-5 h-5 text-primary-dark" strokeWidth={1.5} />
              <span className="text-sm sm:text-base font-medium text-primary-dark">
                Digital hub links
              </span>
            </div>
            <Switch checked={digitalHubLinks} onCheckedChange={setDigitalHubLinks} />
          </div>

          {/* Formal statements */}
          <div className="flex items-center justify-between py-5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Files className="w-5 h-5 text-primary-dark" strokeWidth={1.5} />
              <span className="text-sm sm:text-base font-medium text-primary-dark">
                Formal statements
              </span>
            </div>
            <Switch checked={formalStatements} onCheckedChange={setFormalStatements} />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex gap-4 px-6 py-6">
          <Button variant="outline" className="flex-1 h-12 text-base" onClick={handleCancel}>
            CANCEL
          </Button>
          <Button className="flex-1 h-12 text-base" onClick={handleApply}>
            APPLY
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
