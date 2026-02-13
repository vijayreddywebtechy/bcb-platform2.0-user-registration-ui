"use client";

import { ArrowRight, Users, Shirt, FileDown, FileCheck } from "lucide-react";

const ACTIONS = [
  {
    title: "Roles & Permissions",
    description:
      "Invite, configure, approve and manage your teams access to your business profile.",
    icon: Users,
  },
  {
    title: "Customise Appearance",
    description:
      "Personalise your experience by configuring your dashboards layout, look and more.",
    icon: Shirt,
  },
  {
    title: "Download Documents",
    description:
      "Download or email your official stamped bank letters and statements in PDF format.",
    icon: FileDown,
  },
  {
    title: "Confirm Business Details",
    description:
      "Confirm your business details, notification preferences and trust devices.",
    icon: FileCheck,
  },
];

export default function DashboardActions() {
  return (
    <section className="bg-primary/10 border border-primary/20 rounded-lg p-5 font-bspro shadow-sm">
      <h2 className="text-secondary text-[18px] font-semibold mb-5 leading-tight">
        Next best actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACTIONS.map((item) => (
          <div
            key={item.title}
            className="bg-dashboard-nav text-white rounded-lg p-6 flex flex-col cursor-pointer hover:opacity-95 transition-opacity min-h-[200px] shadow-sm"
          >
            <item.icon className="w-10 h-10 mb-4 text-white" strokeWidth={1.5} />
            <h3 className="font-semibold text-[15px] mb-2 leading-tight">{item.title}</h3>
            <p className="text-[13px] leading-relaxed text-white/90 flex-1">{item.description}</p>
            <div className="flex justify-end mt-4">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
