"use client";

import React, { useState } from "react";
import { Mail, MessageSquareText, Monitor, Smartphone, Trash2, Star, Pencil } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type NotificationMethod = "email" | "sms";

type Device = {
  id: string;
  name: string;
  lastUsed: string;
  type: "desktop" | "mobile";
  preferred?: boolean;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const activeSession: Device = {
  id: "s1",
  name: 'MacBook Pro 16" - Chrome (v122)',
  lastUsed: "Now",
  type: "desktop",
};

const linkedDevices: Device[] = [
  {
    id: "d1",
    name: "iPhone 14 Pro MAX, iOS 17.3",
    lastUsed: "24-03-2026, 07:30am",
    type: "mobile",
    preferred: true,
  },
  {
    id: "d2",
    name: "Windows PC, Firefox (v121), Windows 11",
    lastUsed: "24-03-2026, 12:45pm",
    type: "desktop",
  },
];

// ─── Notifications Tab ────────────────────────────────────────────────────────

function NotificationsTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<NotificationMethod>("email");
  const [savedMethod, setSavedMethod] = useState<NotificationMethod>("email");

  const handleSave = () => {
    setSavedMethod(selectedMethod);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedMethod(savedMethod);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col min-h-[400px]">
      <div className="flex-1">
        <h3 className="text-base md:text-lg font-medium text-secondary mb-6">
          Select how you want to receive security notifications
        </h3>

        <RadioGroup
          value={selectedMethod}
          onValueChange={(val) => setSelectedMethod(val as NotificationMethod)}
          disabled={!isEditing}
          className="space-y-0"
        >
          {/* Email option */}
          <label
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
              isEditing ? "hover:bg-gray-50" : ""
            } ${!isEditing ? "opacity-80" : ""}`}
          >
            <RadioGroupItem value="email" id="email" />
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary">Email</p>
              <p className="text-sm text-gray-500">kobas.marais@abcarchitects.co.za</p>
            </div>
          </label>

          {/* SMS option */}
          <label
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
              isEditing ? "hover:bg-gray-50" : ""
            } ${!isEditing ? "opacity-80" : ""}`}
          >
            <RadioGroupItem value="sms" id="sms" />
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <MessageSquareText className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary">SMS</p>
              <p className="text-sm text-gray-500">+27 082 123 4567</p>
            </div>
          </label>
        </RadioGroup>
      </div>

      {/* Footer action */}
      <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
        {isEditing ? (
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleCancel}>
              CANCEL
            </Button>
            <Button onClick={handleSave}>SAVE CHANGES</Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            CHANGE SETTINGS
            <Pencil className="w-4 h-4 ml-2" strokeWidth={1.5} />
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Linked Devices Tab ───────────────────────────────────────────────────────

function DeviceIcon({ type }: { type: "desktop" | "mobile" }) {
  return type === "mobile" ? (
    <Smartphone className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
  ) : (
    <Monitor className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
  );
}

function DeviceRow({
  checkbox,
  icon,
  name,
  lastUsed,
  preferredAction,
  onDelete,
}: {
  checkbox: React.ReactNode;
  icon: React.ReactNode;
  name: string;
  lastUsed: string;
  preferredAction?: React.ReactNode;
  onDelete: () => void;
}) {
  return (
    <div className="grid grid-cols-[24px_24px_1fr_1fr_auto_40px] items-center gap-4 py-4">
      <div>{checkbox}</div>
      <div>{icon}</div>
      <p className="text-sm font-medium text-secondary">{name}</p>
      <p className="text-sm text-gray-500">Last used on: {lastUsed}</p>
      <div className="min-w-[180px] flex justify-end">{preferredAction}</div>
      <div className="flex justify-center">
        <button
          className="p-2 hover:bg-red-50 rounded-md transition-colors"
          aria-label={`Remove ${name}`}
          onClick={onDelete}
        >
          <Trash2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function LinkedDevicesTab() {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [preferredId, setPreferredId] = useState<string | null>("d1");

  const toggleDevice = (id: string) => {
    setSelectedDevices((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h3 className="text-base md:text-lg font-medium text-secondary mb-6">
        Profile linked to the following devices
      </h3>

      {/* Active sessions */}
      <div className="mb-8">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
          Active Sessions
        </p>
        <div className="border-b border-gray-100">
          <DeviceRow
            checkbox={
              <Checkbox
                checked
                disabled
                className="data-[state=checked]:bg-gray-300 data-[state=checked]:border-gray-300"
              />
            }
            icon={<DeviceIcon type={activeSession.type} />}
            name={activeSession.name}
            lastUsed={activeSession.lastUsed}
            onDelete={() => {}}
          />
        </div>
      </div>

      {/* Other linked devices */}
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
          Other Linked Devices
        </p>
        <div className="divide-y divide-gray-100">
          {linkedDevices.map((device) => {
            const isPreferred = preferredId === device.id;
            return (
              <DeviceRow
                key={device.id}
                checkbox={
                  <Checkbox
                    checked={selectedDevices.includes(device.id)}
                    onCheckedChange={() => toggleDevice(device.id)}
                  />
                }
                icon={<DeviceIcon type={device.type} />}
                name={device.name}
                lastUsed={device.lastUsed}
                preferredAction={
                  isPreferred ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-3 rounded-md bg-gray-200 text-xs font-medium text-gray-600 uppercase tracking-wide">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      Preferred
                    </span>
                  ) : (
                    <button
                      onClick={() => setPreferredId(device.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-md border border-gray-300 bg-white text-xs font-medium text-primary uppercase tracking-wide hover:bg-gray-50 transition-colors"
                    >
                      <Star className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Set as Preferred
                    </button>
                  )
                }
                onDelete={() => {}}
              />
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-gray-200">
        <p className="text-sm text-secondary">
          Don&apos;t recognise any of them? Remove them to secure your profile
        </p>
        <Button variant="outline" disabled={selectedDevices.length === 0}>
          REMOVE SELECTED DEVICES
        </Button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Tab = "notifications" | "devices";

export function ManageProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("notifications");

  const tabs: { id: Tab; label: string }[] = [
    { id: "notifications", label: "Notifications" },
    { id: "devices", label: "Linked Devices" },
  ];

  return (
    <div className="page-container py-8">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-gray-200 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-6 px-4 text-sm md:text-base font-medium border-b-2 transition-colors mr-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "devices" && <LinkedDevicesTab />}
        </div>
      </div>
    </div>
  );
}
