"use client";

import { Link2, Monitor, ClipboardList, Laptop } from "lucide-react";

const LINKS = [
  {
    title: "Online Banking for Business",
    text: "I want to transact on Online Banking for Business",
    status: "Sign in automatically",
    icon: Monitor,
  },
  {
    title: "TradeOnline",
    text: "Submit trade instructions TradeOnline",
    status: "Sign in automatically",
    icon: ClipboardList,
  },
  {
    title: "Business Online",
    text: "I want to transact on Business Online",
    status: "You will need to sign in again",
    icon: Laptop,
  },
];

export default function DashboardDigitalLinks() {
  return (
    <section className="bg-white border border-neutral-200 rounded-lg p-5 font-bspro shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Link2 className="w-5 h-5 text-secondary" />
        <h2 className="text-[18px] font-semibold text-secondary leading-tight">Digital hub links</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LINKS.map((item) => (
          <div
            key={item.title}
            className="bg-dashboard-nav text-white rounded-lg p-5 relative cursor-pointer hover:opacity-95 transition-opacity min-h-[120px]"
          >
            <div className="absolute top-4 right-4 w-8 h-8 rounded bg-white/20 flex items-center justify-center">
              <item.icon className="w-4 h-4" />
            </div>
            <p className="text-[14px] font-medium pr-10 leading-relaxed">{item.text}</p>
            <p className="text-[12px] text-white/80 mt-3 leading-tight">{item.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
