"use client";

import { Package, ArrowLeftRight, Shield, Lock } from "lucide-react";

export default function DashboardBottomCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 font-bspro">
      {/* Business Offers */}
      <section className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-5 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-secondary" />
            <h2 className="text-[18px] font-semibold text-secondary leading-tight">Business Offers</h2>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            Available offers 1
          </span>
        </div>
        <div className="p-4">
          <div className="aspect-video bg-neutral-200 rounded-lg mb-4 flex items-center justify-center text-neutral-500 text-sm">
            [Solar / business image placeholder]
          </div>
          <p className="text-sm text-secondary mb-4">
            Power your business the right way, without interruptions. Protect your business from load shedding and get the solar solutions you need with a business solar loan.
          </p>
          <button
            type="button"
            className="w-full py-2.5 bg-primary text-white font-medium rounded-md hover:bg-primary/90"
          >
            TELL ME MORE
          </button>
        </div>
      </section>

      {/* FX Rate Calculator */}
      <section className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeftRight className="w-5 h-5 text-secondary" />
          <h2 className="text-[18px] font-semibold text-secondary leading-tight">FX Rate Calculator</h2>
        </div>
        <p className="text-sm text-neutral-600 mb-3">
          Need forex? Get an idea of how much it could cost.
        </p>
        <p className="text-xs text-neutral-500 mb-4">23:59 UTC Sunday, 4 April 2026</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="border border-neutral-300 rounded p-3">
            <p className="text-xs text-neutral-500 mb-1">Buy</p>
            <p className="text-lg font-semibold text-secondary">15.68</p>
            <p className="text-sm text-secondary">South African Rand</p>
          </div>
          <div className="border border-neutral-300 rounded p-3">
            <p className="text-xs text-neutral-500 mb-1">Sell</p>
            <p className="text-lg font-semibold text-secondary">1.00</p>
            <p className="text-sm text-secondary">United States Dollar</p>
          </div>
        </div>
        <p className="text-sm text-secondary mb-3">
          Applicable Rate 15.68 South African Rand 1 United States Dollar
        </p>
        <a href="#" className="text-primary text-sm hover:underline">
          View Legal Disclaimer
        </a>
      </section>

      {/* Security Status */}
      <section className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-secondary" />
          <h2 className="text-[18px] font-semibold text-secondary leading-tight">Security Status</h2>
        </div>
        <div className="flex flex-col items-center py-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-3">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <p className="text-sm text-center text-secondary mb-2">
            Manage your trusted devices
          </p>
          <p className="text-sm text-center text-neutral-600 mb-4">
            Add or remove devices
          </p>
          <button
            type="button"
            className="border-2 border-primary text-primary font-medium px-4 py-2 rounded-md hover:bg-primary/5"
          >
            CHECK MY DEVICES
          </button>
        </div>
      </section>
    </div>
  );
}
