"use client";

import { BellRing } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-600 mb-6">
        <BellRing className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-black text-zinc-900 mb-2">Smart Alerts</h1>
      <p className="text-zinc-500 max-w-md">Manage your price alerts, cross-market notifications, and custom triggers from this unified dashboard (Feature expanding soon).</p>
    </div>
  );
}