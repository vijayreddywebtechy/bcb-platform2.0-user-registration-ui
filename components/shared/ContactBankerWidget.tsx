"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import icnContactBook from "@/assets/images/icons/icn_contact_book.svg";
import icnChatWidget from "@/assets/images/icons/icn_chat_widget.svg";
import icnMail from "@/assets/images/icons/icn_mail.svg";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import { FloatingTextArea } from "@/components/ui/FloatingTextArea";

type WidgetView = "closed" | "contact" | "message";

export default function ContactBankerWidget() {
  const [view, setView] = useState<WidgetView>("closed");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const banker = {
    initials: "JK",
    name: "Jonathan Khumalo",
    role: "Relationship manager",
    email: "jane.khumalo@sbg.co.za",
    phone: "27 277182 72881",
  };

  function handleClose() {
    setView("closed");
    setSubject("");
    setMessage("");
  }

  function handleSend() {
    // placeholder — integrate with real API
    handleClose();
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── Contact Card ── */}
      {view === "contact" && (
        <div className="w-[300px] bg-white rounded-xl shadow-xl border border-blue-50 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* Header */}
          <div className="bg-primary-dark px-5 py-4 flex items-center justify-between">
            <span className="text-white text-sm sm:text-base">Contact your banker</span>
            <button onClick={handleClose} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="py-5">
            {/* Avatar + name */}
            <div className="flex items-center gap-3 mb-5 px-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-base font-medium text-secondary">
                {banker.initials}
              </div>
              <div>
                <p className="text-sm md:text-base font-medium text-secondary">{banker.name}</p>
                <p className="text-xs text-gray-500">{banker.role}</p>
              </div>
            </div>

            {/* Email row */}
            <button
              onClick={() => setView("message")}
              className="flex items-center justify-between w-full py-2 group hover:bg-blue-50 px-5"
            >
              <div className="flex items-center gap-3">
                <Image src={icnMail} alt="Email" width={20} height={20} />
                <span className="text-sm text-primary-dark">{banker.email}</span>
              </div>
              <div className="bg-blue-50 p-2 rounded-sm">
                <ChevronRight className="w-6 h-6 text-primary transition-transform" />
              </div>
            </button>

            {/* Phone row */}
            <div className="flex items-center gap-3 py-4 px-5 hover:bg-blue-50">
              <Phone className="w-5 h-5 text-primary-dark" />
              <span className="text-sm text-primary-dark">{banker.phone}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Message Form ── */}
      {view === "message" && (
        <div className="w-[300px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* Header */}
          <div className="bg-primary-dark px-5 py-4 flex items-center justify-between">
            <span className="text-white text-sm sm:text-base">Contact your banker</span>
            <button onClick={handleClose} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-5">
            {/* Icon + heading */}
            <div className="mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-3">
                <Image
                  src={icnMail}
                  alt="Email"
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                />
              </div>
              <h4 className="text-base font-medium text-secondary mb-1">Get in touch</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Provide details about what you need and a banker will get in touch with you shortly.
              </p>
            </div>

            {/* Banker info */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-base font-medium text-secondary">
                {banker.initials}
              </div>
              <div>
                <p className="text-sm md:text-base font-medium text-secondary">{banker.name}</p>
                <p className="text-xs text-gray-500">{banker.role}</p>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-4 mb-5">
              <FloatingTextField
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <FloatingTextArea
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>

            <Button className="w-full" onClick={handleSend}>
              SEND MESSAGE
            </Button>
          </div>
        </div>
      )}

      {/* ── Floating toggle button ── */}
      <button
        onClick={() => setView(view === "closed" ? "contact" : "closed")}
        className="w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors"
      >
        {view === "closed" ? (
          <div className="flex flex-col items-center gap-0.5">
            <Image src={icnContactBook} alt="Contact" width={48} height={48} className="" />
          </div>
        ) : (
          <ChevronDown className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
