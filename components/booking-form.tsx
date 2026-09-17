"use client";

import React, { useState } from "react";
import pb from "@/lib/pocketbase";
import { useLanguage } from "@/components/LanguageProvider";

const content = {
  en: {
    title: "Request Sent!",
    successMsg: "Thank you! Your consultation has been booked.",
    bookAnother: "Book Another",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    preferredDate: "Preferred Date",
    projectDesc: "Project Description",
    projectPlaceholder: "Tell us about your project goals...",
    submit: "Confirm Booking",
    processing: "Processing...",
  },
  ne: {
    title: "अनुरोध पठाइयो!",
    successMsg: "धन्यवाद! तपाईंको परामर्श बुक गरिएको छ।",
    bookAnother: "अर्को बुक गर्नुहोस्",
    fullName: "पूरा नाम",
    email: "इमेल ठेगाना",
    phone: "फोन नम्बर",
    preferredDate: "मनपर्ने मिति",
    projectDesc: "परियोजना विवरण",
    projectPlaceholder: "तपाईंको परियोजनाका लक्ष्यहरू बताउनुहोस्...",
    submit: "बुकिङ पुष्टि गर्नुहोस्",
    processing: "प्रक्रियामा...",
  }
};

export default function BookingForm() {
  const { language } = useLanguage();
  const t = content[(language ?? "en") as "en" | "ne"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_description: "",
    preferred_date: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/booking/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setMessage(t.successMsg);
        setFormData({ name: "", email: "", phone: "", project_description: "", preferred_date: "" });
      } else {
        const errorData = await response.json();
        setStatus("error");
        
        if (errorData.details && typeof errorData.details === 'object') {
          const fieldEntries = Object.entries(errorData.details);
          if (fieldEntries.length > 0) {
            const [field, errorObj]: [string, any] = fieldEntries[0];
            const msg = errorObj?.message || JSON.stringify(errorObj);
            setMessage(`Validation Error (${field}): ${msg}`);
          } else {
            setMessage(errorData.error || "Failed to book consultation.");
          }
        } else {
          setMessage(errorData.error || "Failed to book consultation.");
        }
      }
    } catch (err: any) {
      setStatus("error");
      setMessage("Failed to connect to server.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#0b0d12] mb-4">{t.title}</h3>
        <p className="text-[#0b0d12]/60 mb-8">{message}</p>
        <button 
          onClick={() => setStatus("idle")}
          className="px-8 py-3 bg-[#E31B23] text-white font-bold rounded hover:brightness-110 transition-colors"
        >
          {t.bookAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#0b0d12]/70 mb-2">{t.fullName}</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#0b0d12]/[0.03] border border-[#0b0d12]/15 rounded px-4 py-3 text-[#0b0d12] focus:outline-none focus:border-[#2563EB] transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0b0d12]/70 mb-2">{t.email}</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#0b0d12]/[0.03] border border-[#0b0d12]/15 rounded px-4 py-3 text-[#0b0d12] focus:outline-none focus:border-[#2563EB] transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#0b0d12]/70 mb-2">{t.phone}</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-[#0b0d12]/[0.03] border border-[#0b0d12]/15 rounded px-4 py-3 text-[#0b0d12] focus:outline-none focus:border-[#2563EB] transition-colors"
            placeholder="+977-98XXXXXXXX"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0b0d12]/70 mb-2">{t.preferredDate}</label>
          <input
            type="date"
            name="preferred_date"
            required
            value={formData.preferred_date}
            onChange={handleChange}
            className="w-full bg-[#0b0d12]/[0.03] border border-[#0b0d12]/15 rounded px-4 py-3 text-[#0b0d12] focus:outline-none focus:border-[#2563EB] transition-colors [color-scheme:light]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0b0d12]/70 mb-2">{t.projectDesc}</label>
        <textarea
          name="project_description"
          required
          rows={4}
          value={formData.project_description}
          onChange={handleChange}
          className="w-full bg-[#0b0d12]/[0.03] border border-[#0b0d12]/15 rounded px-4 py-3 text-[#0b0d12] focus:outline-none focus:border-[#2563EB] transition-colors resize-none"
          placeholder={t.projectPlaceholder}
        />
      </div>

      {status === "error" && <p className="text-red-500 text-sm">{message}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-[#E31B23] text-white font-bold rounded hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? t.processing : t.submit}
      </button>
    </form>
  );
}
