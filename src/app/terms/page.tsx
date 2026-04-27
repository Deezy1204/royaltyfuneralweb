"use client";

import { motion, Variants } from "framer-motion";
import { FileText, ShieldCheck, Clock, UserCheck, AlertCircle, Info } from "lucide-react";

export default function Terms() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-white text-primary-dark py-24 md:py-32 relative overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.05]" />
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block p-3 rounded-2xl bg-primary/10 backdrop-blur-md mb-6"
          >
            <FileText className="text-primary w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="font-serif text-5xl md:text-6xl mb-6 tracking-tight text-primary-dark"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="text-text-muted text-xl font-light"
          >
            Ensuring transparency, trust, and professional service delivery for every Royalty policy holder.
          </motion.p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-24 bg-background-cream">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Policy Coverage */}
            <motion.div variants={itemVariants} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-primary/5">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-primary w-6 h-6" />
                </div>
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-primary-dark">Policy Package Coverage</h2>
                  <p className="text-text-muted leading-relaxed text-lg font-light">
                    The Royalty Policy package covers the Policy holder, spouse, and unmarried children up to 21 years of age, or 25 years old (inclusive) if the child is at a recognized educational institution and is classified as a dependent.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Premium Payments */}
            <motion.div variants={itemVariants} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-primary/5">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Clock className="text-amber-600 w-6 h-6" />
                </div>
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-primary-dark">Grace Period & Arrears</h2>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-text-muted text-lg font-light">
                      <span className="text-primary font-bold">•</span>
                      <span>You have only <strong>1 month grace period</strong> for arrear premiums.</span>
                    </li>
                    <li className="flex gap-3 text-text-muted text-lg font-light">
                      <span className="text-primary font-bold">•</span>
                      <span>In the event that you default for <strong>2 months</strong>, the policy will <strong>Lapse</strong>.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Policy Alterations */}
            <motion.div variants={itemVariants} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-primary/5">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <UserCheck className="text-blue-600 w-6 h-6" />
                </div>
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-primary-dark">Policy Alterations</h2>
                  <p className="text-text-muted leading-relaxed text-lg font-light">
                    Only the policy holder is allowed to alter or change any information on the policy document.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Qualification & Waiting Periods */}
            <motion.div variants={itemVariants} className="bg-white text-primary-dark p-8 md:p-10 rounded-3xl shadow-sm border border-primary/10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Info className="text-primary w-6 h-6" />
                </div>
                <div className="space-y-6 flex-1">
                  <h2 className="font-serif text-2xl text-primary-dark">Qualification & Waiting Periods</h2>
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-primary/10">
                      <h3 className="font-semibold text-primary/90 mb-1">General Qualification</h3>
                      <p className="text-text-muted font-light">A member qualifies for cover after <strong>3 consecutive payments</strong>.</p>
                    </div>
                    <div className="pb-4 border-b border-primary/10">
                      <h3 className="font-semibold text-primary/90 mb-1">Accidental Death</h3>
                      <p className="text-text-muted font-light">No waiting period, provided you have made the first payment up to 3 months.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary/90 mb-1">Suicidal & Other Causes</h3>
                      <p className="text-text-muted font-light">Suicidal death and other specific causes (suicide and accident excluded) – 6 calendar month waiting period or 3 months where applicable.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Disclaimer Footer */}
            <motion.div variants={itemVariants} className="text-center pt-8">
              <p className="text-text-muted/60 text-sm">
                Royalty Funeral Services reserves the right to update these terms. Please contact our office for the most current policy details.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
