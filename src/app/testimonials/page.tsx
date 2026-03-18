"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    content: "During the hardest days of our lives, the team at Royalty Funeral Services provided a level of compassion and professionalism that we will never forget. They handled every detail of our mother's service flawlessly.",
    author: "Grace Nyandoro",
    role: "Daughter of the late M. Nyandoro"
  },
  {
    content: "We felt truly supported and understood. Their pre-planning services gave my father peace of mind, and when the time came, everything was executed exactly as he wished with deep profound dignity.",
    author: "David Chibanda",
    role: "Son of the late P. Chibanda"
  },
  {
    content: "The bereavement support groups offered here were a lifeline for me after losing my husband. Thank you for not just being a funeral home, but a real community pillar.",
    author: "Susan Ndlovu",
    role: "Client"
  },
  {
    content: "Incredible attention to detail and so much warmth. They took care of the long-distance repatriation seamlessly and relieved all our stress. Highly recommended.",
    author: "The Makoni Family",
    role: "Bulawayo & London"
  }
];

export default function Testimonials() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background-cream">
      
      <section className="py-20 container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl text-primary-dark mb-6"
        >
          Family Testimonials
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-text-muted text-xl font-light mb-16"
        >
          Read words from the families we have been privileged to serve. We are humbled by their trust.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimony, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-left relative"
            >
              <Quote className="text-primary/10 absolute top-6 right-6" size={60} />
              <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10 italic">
                "{testimony.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-serif text-xl">
                  {testimony.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-primary-dark">{testimony.author}</h4>
                  <p className="text-sm text-gray-500">{testimony.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
