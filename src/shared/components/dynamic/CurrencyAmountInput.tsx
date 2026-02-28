"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import icnArrowSolidDown from "@/assets/images/icons/icn_arrow_solid_down.svg";

export type CurrencyOption = {
  value: string;
  label: string;
  flag: string;
};

type CurrencyAmountInputProps = {
  label: string;
  amount: string;
  onAmountChange: (v: string) => void;
  currency: CurrencyOption;
  onCurrencyChange: (c: CurrencyOption) => void;
  options: CurrencyOption[];
};

export function CurrencyAmountInput({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  options,
}: CurrencyAmountInputProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-secondary mb-2">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-xl overflow-visible relative bg-white hover:border-primary transition-colors">
        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="w-full px-4 py-4 text-sm font-medium text-secondary outline-none bg-transparent"
        />

        {/* Divider */}
        <div className="w-px h-8 bg-gray-300 flex-shrink-0" />

        {/* Currency Selector */}
        <div ref={ref} className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-3.5 text-secondary hover:bg-gray-50 rounded-r-xl transition-colors"
          >
            <Image
              src={currency.flag}
              alt={currency.label}
              width={28}
              height={28}
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-secondary whitespace-nowrap">
              {currency.label}
            </span>
            <Image src={icnArrowSolidDown} alt="Dropdown Arrow" width={24} height={24} />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[220px]">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onCurrencyChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-blue-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                    currency.value === opt.value
                      ? "bg-blue-50 text-primary font-medium"
                      : "text-secondary"
                  }`}
                >
                  <Image
                    src={opt.flag}
                    alt={opt.label}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm">{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrencyAmountInput;
