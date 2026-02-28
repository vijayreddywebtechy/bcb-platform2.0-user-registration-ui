"use client";

import { useState } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import iconForex from "@/assets/images/icons/icn_forex.svg";
import flagZA from "@/assets/images/icons/country_flag_south_africa.svg";
import flagUS from "@/assets/images/icons/country_flag_united_states.svg";
import CurrencyAmountInput, { CurrencyOption } from "@/shared/components/dynamic/CurrencyAmountInput";
import Link from "next/link";

type Props = {};

const currencyOptions: CurrencyOption[] = [
  { value: "zar", label: "South African Rand", flag: flagZA },
  { value: "usd", label: "United States Dollar", flag: flagUS },
];

function FXRateCalculator({}: Props) {
  const [buyAmount, setBuyAmount] = useState("15.68");
  const [sellAmount, setSellAmount] = useState("1.00");
  const [buyCurrency, setBuyCurrency] = useState<CurrencyOption>(
    currencyOptions.find((opt) => opt.value === "zar") || currencyOptions[0]
  );
  const [sellCurrency, setSellCurrency] = useState<CurrencyOption>(
    currencyOptions.find((opt) => opt.value === "usd") || currencyOptions[1]
  );

  const getCurrentDateTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: false,
    };
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const dateStr = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `${timeStr} UTC - ${dateStr}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 p-4 shadow-sm">
        <Image
          src={iconForex}
          alt="FX Rate Calculator"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <h2 className="text-base md:text-lg font-medium text-secondary">FX Rate Calculator</h2>
      </div>
      <div className="p-4">
        {/* Description */}
        <p className="text-sm text-secondary font-medium text-center mb-12">
          Need forex? Get an idea of how much it could cost.
        </p>

        {/* Current Time */}
        <div className="text-center mb-8">
          <p className="text-sm md:text-base text-gray-600">{getCurrentDateTime()}</p>
        </div>

        {/* Buy Section */}
        <CurrencyAmountInput
          label="Buy"
          amount={buyAmount}
          onAmountChange={setBuyAmount}
          currency={buyCurrency}
          onCurrencyChange={setBuyCurrency}
          options={currencyOptions}
        />

        {/* Sell Section */}
        <CurrencyAmountInput
          label="Sell"
          amount={sellAmount}
          onAmountChange={setSellAmount}
          currency={sellCurrency}
          onCurrencyChange={setSellCurrency}
          options={currencyOptions}
        />

        {/* Exchange Rate Result */}
        <div className="flex-1 text-center mt-8 mb-6">
          <p className="text-xs text-gray-500 mb-2">Applicable Rate</p>
          <p className="text-base font-medium text-secondary mb-1">
            {buyAmount} {buyCurrency.label}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-secondary">
            {sellAmount} {sellCurrency.label}
          </p>
        </div>
      </div>

      {/* Legal Disclaimer Link */}
      <div className="flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer transition-colors">
        <Info className="w-5 h-5 text-primary-dark" strokeWidth={2} />
        <span className="text-gray-500">
          View{" "}
          <Link href="/legal-disclaimer" className="font-medium text-primary-dark">
            Legal Disclaimer
          </Link>
        </span>
      </div>
    </div>
  );
}

export default FXRateCalculator;
