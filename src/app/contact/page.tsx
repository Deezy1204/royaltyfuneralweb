"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background-cream">
      
      <section className="py-20 text-center container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl text-primary-dark mb-6"
        >
          Contact Us
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-text-muted text-xl font-light mb-12"
        >
          We are available 24 hours a day, 7 days a week to assist you. Please reach out to us with any questions or for immediate assistance.
        </motion.p>
      </section>

      <section className="pb-24 container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-16 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Contact Details & Map Area */}
          <div className="bg-primary-dark text-white p-12 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-3xl mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 hover:bg-white/5 p-4 rounded-xl transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-xl mb-1">24/7 Phone Support</h4>
                    <p className="text-white/70 tracking-wide">+263 242 123 456</p>
                    <p className="text-white/70 tracking-wide">+263 772 123 456 (Mobile/WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 hover:bg-white/5 p-4 rounded-xl transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-xl mb-1">Email Us</h4>
                    <p className="text-white/70 tracking-wide">care@royaltyfunerals.co.zw</p>
                    <p className="text-white/70 tracking-wide">info@royaltyfunerals.co.zw</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 hover:bg-white/5 p-4 rounded-xl transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-xl mb-1">Main Office</h4>
                    <p className="text-white/70 tracking-wide leading-relaxed">
                      123 Royalty Avenue<br />
                      Borrowdale, Bulawayo<br />
                      Zimbabwe
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-12 pl-8">
            <h2 className="font-serif text-3xl text-primary-dark mb-8">Send Us a Message</h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50" placeholder="+263..." />
              </div>

              <div className="space-y-2">
                <label htmlFor="nature" className="text-sm font-medium text-gray-700">Nature of Inquiry</label>
                <select id="nature" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50">
                  <option>Immediate Need</option>
                  <option>Pre-planning</option>
                  <option>Policy Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
