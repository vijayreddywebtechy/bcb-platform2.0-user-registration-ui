"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBoxProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({
  placeholder = "Search...",
  value,
  onChange,
}: SearchBoxProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <Search
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors ${
          isFocused ? "text-primary-dark" : "text-neutral-700"
        }`}
        strokeWidth={1.5}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-neutral-500 text-base font-normal h-12 outline-none transition-all duration-200 ${
          isFocused
            ? "border-2 border-primary"
            : "border border-neutral-700 hover:border-neutral-600"
        }`}
      />
    </div>
  );
}
