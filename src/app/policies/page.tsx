"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Policies() {
  const policies = [
    {
      name: "Standard Plan",
      icon: ShieldAlert,
      price: "$15/month",
      description: "Essential coverage for an individual or a couple, ensuring basic funeral needs are met.",
      features: [
        "Cover up to 2 individuals",
        "Basic funeral arrangement services",
        "Standard casket selection",
        "Transportation within 50km",
        "$1,000 grocery allowance payout"
      ]
    },
    {
      name: "Family Premium",
      icon: ShieldCheck,
      price: "$35/month",
      highlight: true,
      description: "Comprehensive coverage for the whole family, providing peace of mind and full-service arrangements.",
      features: [
        "Cover up to 6 family members",
        "Premium funeral arrangement services",
        "Upgraded casket or urn selection",
        "Nationwide transportation",
        "$2,500 grocery allowance payout",
        "Tombstone provision after 12 months"
      ]
    },
    {
      name: "Extended Family",
      icon: ShieldCheck,
      price: "$60/month",
      description: "Broad coverage that includes extended family members and dependents, offering maximum security.",
      features: [
        "Cover up to 10 individuals including parents/in-laws",
        "Premium funeral arrangement services",
        "Executive casket selection",
        "Nationwide transportation + repatriation assistance",
        "$5,000 grocery allowance payout",
        "Tombstone provision after 6 months",
        "Catering service for 100 guests"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background-cream">
      
      <section className="py-20 text-center container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl text-primary-dark mb-6"
        >
          Funeral Policy Options
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-text-muted text-xl font-light mb-12"
        >
          Secure your family's future and relieve them of financial burdens with our straightforward, comprehensive coverage plans.
        </motion.p>
      </section>

      <section className="pb-24 container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {policies.map((policy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 shadow-sm border ${policy.highlight ? 'border-primary ring-2 ring-primary/20 shadow-xl scale-105 z-10' : 'border-gray-200'} flex flex-col h-full`}
            >
              {policy.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium tracking-wide">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <policy.icon size={40} className={`mb-6 ${policy.highlight ? 'text-primary' : 'text-primary-light'}`} />
                <h3 className="font-serif text-3xl text-primary-dark mb-2">{policy.name}</h3>
                <div className="text-4xl font-semibold mb-4 text-gray-900">{policy.price}</div>
                <p className="text-text-muted">{policy.description}</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {policy.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary mt-1 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                href="/contact" 
                className={`w-full text-center py-4 rounded-xl font-medium transition-all ${policy.highlight ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-background-cream text-primary-dark hover:bg-gray-200'}`}
              >
                Sign Up Now
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
