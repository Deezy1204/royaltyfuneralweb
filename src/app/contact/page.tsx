"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nature: "Immediate Need",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  useEffect(() => {
    const plan = searchParams.get("plan");
    const tier = searchParams.get("tier");
    const dependents = searchParams.get("dependents");
    const total = searchParams.get("total");
    const currency = searchParams.get("currency") as "USD" | "ZAR" || "USD";

    if (plan && tier) {
      const formattedTotal = formatCurrency(parseFloat(total || "0"), currency);
      const prefillMessage = `I am interested in securing the ${plan.toUpperCase()} package for the ${tier} age group${dependents && parseInt(dependents) > 0 ? ` with ${dependents} additional dependents` : ""}. Total monthly premium: ${formattedTotal}`;
      
      setFormData(prev => ({
        ...prev,
        nature: "Policy Inquiry",
        message: prefillMessage
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill in your first name, email, and message." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message. Please try again.");
      }

      setStatus({ type: "success", message: "Message sent! We will get back to you shortly." });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", nature: "Immediate Need", message: "" });
    } catch (error: any) {
      setStatus({ type: "error", message: error.message || "Something went wrong." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Contact Details & Map Area */}
      <div className="bg-background-cream text-primary-dark p-6 sm:p-8 md:p-12 flex flex-col justify-between border-r border-primary/10">
        <div>
          <h2 className="font-serif text-3xl mb-8 text-primary-dark">Get in Touch</h2>
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-start gap-4 hover:bg-primary/5 p-3 sm:p-4 rounded-xl transition-colors cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Phone size={20} className="text-primary sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-lg sm:text-xl mb-1 text-primary-dark">24/7 Hotline Numbers</h4>
                <p className="text-text-muted tracking-wide text-sm sm:text-base break-words">+263 71 787 4750</p>
                <p className="text-text-muted tracking-wide text-sm sm:text-base break-words">+263 71 787 4747</p>
              </div>
            </div>

            <div className="flex items-start gap-4 hover:bg-primary/5 p-3 sm:p-4 rounded-xl transition-colors cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Mail size={20} className="text-primary sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-lg sm:text-xl mb-1 text-primary-dark">Email Us</h4>
                <p className="text-text-muted tracking-wide text-sm sm:text-base break-words">sales@royaltyfuneral.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 hover:bg-primary/5 p-3 sm:p-4 rounded-xl transition-colors cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-primary sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-lg sm:text-xl mb-1 text-primary-dark">Main Office</h4>
                <p className="text-text-muted tracking-wide leading-relaxed text-sm sm:text-base break-words">
                  Stand 15383, Khami Road<br />
                  Kelvin North 11, Bulawayo<br />
                  Zimbabwe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="p-6 sm:p-8 md:p-12">
        <h2 className="font-serif text-3xl text-primary-dark mb-8">Send Us a Message</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {status.message && (
            <div className={`p-4 rounded-xl text-sm ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {status.message}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" 
                placeholder="John" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" 
                placeholder="Doe" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" 
              placeholder="john@example.com" 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number (Optional)</label>
            <input 
              type="tel" 
              id="phone" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" 
              placeholder="+263..." 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="nature" className="text-sm font-medium text-gray-700">Nature of Inquiry</label>
            <select 
              id="nature" 
              value={formData.nature}
              onChange={(e) => setFormData({...formData, nature: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50"
            >
              <option>Immediate Need</option>
              <option>Pre-planning</option>
              <option>Policy Inquiry</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
            <textarea 
              id="message" 
              rows={4} 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 resize-none font-light" 
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
            )}
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-background-cream">
      <section className="py-20 text-center container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-serif text-5xl md:text-6xl text-primary-dark mb-6"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="text-text-muted text-xl font-light mb-12"
        >
          We are available 24 hours a day, 7 days a week to assist you. Please reach out to us with any questions or for immediate assistance.
        </motion.p>
      </section>

      <section className="pb-24 container mx-auto px-4 md:px-8">
        <Suspense fallback={
          <div className="h-[600px] bg-white rounded-3xl shadow-xl flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        }>
          <ContactForm />
        </Suspense>
      </section>
    </div>
  );
}
