"use client";

export default function DashboardFooter() {
  return (
    <footer className="bg-dashboard-header text-white font-bspro">
      <div className="px-6 py-5 max-w-[1400px] mx-auto">
        <div className="flex flex-wrap gap-6 text-[13px] mb-3">
          <a href="#" className="hover:underline uppercase tracking-wide font-medium">
            Conditions of Access
          </a>
          <a href="#" className="hover:underline uppercase tracking-wide font-medium">
            Disclaimer
          </a>
          <a href="#" className="hover:underline uppercase tracking-wide font-medium">
            Privacy Statement
          </a>
        </div>
        <p className="text-[12px] text-white/90 max-w-3xl leading-relaxed">
          Standard Bank is a licensed financial services provider in terms of the Financial Advisory and Intermediary Services Act and a registered credit provider in terms of the National Credit Act, registration number NCRCP65.
        </p>
      </div>
    </footer>
  );
}
