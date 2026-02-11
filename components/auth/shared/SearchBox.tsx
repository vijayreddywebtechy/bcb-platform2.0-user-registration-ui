"use client";

import { Search } from "lucide-react";
import { Input } from "../../ui/input";

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
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-neutral-900 pointer-events-none" strokeWidth='1.2' />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-neutral-500 placeholder:text-base placeholder:font-normal h-auto"
      />
    </div>
  );
}
