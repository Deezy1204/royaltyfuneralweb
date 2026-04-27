"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, HelpCircle, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Resources() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <section className="bg-white text-primary-dark py-24 relative overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://images.pexels.com/photos/17794572/pexels-photo-17794572.jpeg')] bg-cover bg-center" />
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl mb-6 text-primary-dark"
          >
            Resources & Guides
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted text-xl font-light"
          >
            Helpful information to guide you through planning, grief, and honoring your loved one's memory.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background-cream">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* Guides Section */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <h2 className="font-serif text-3xl text-primary-dark">Planning Guides</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: "What to do when a death occurs", desc: "A step-by-step guide on the immediate actions to take." },
                  { title: "Checklist for funeral planning", desc: "Ensure you have all necessary documents and information." },
                  { title: "Writing a meaningful obituary", desc: "Tips and templates to help you capture your loved one's story." }
                ].map((guide, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary/30 transition-colors group cursor-pointer"
                  >
                    <h3 className="text-xl font-medium text-primary-dark mb-2 group-hover:text-primary transition-colors">{guide.title}</h3>
                    <p className="text-text-muted mb-4">{guide.desc}</p>
                    <span className="text-primary text-sm font-semibold flex items-center gap-1">Read Guide <ArrowRight size={14} /></span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQs Section */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="text-primary" size={24} />
                </div>
                <h2 className="font-serif text-3xl text-primary-dark">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { q: "How much does a funeral cost?", a: "Costs vary widely based on your choices (burial vs. cremation, type of service). Please contact us or view our policies for transparent pricing." },
                  { q: "What is required to repatriate remains?", a: "Repatriation requires specific legal documents and coordination with embassies. We handle this entire complex process for you." },
                  { q: "Can I pre-plan my own funeral?", a: "Absolutely. Pre-planning relieves your family of difficult decisions. You can choose all details and pre-fund the arrangements." },
                  { q: "How long does the cremation process take?", a: "The actual cremation takes a few hours, but securing necessary permits and documentation typically takes 48-72 hours." }
                ].map((faq, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <h3 className="text-lg font-medium text-primary-dark mb-2">{faq.q}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
      
      {/* Blog Teaser */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-primary-dark mb-4">Latest Articles</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">Insights, news, and supportive articles from our team of care professionals.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Navigating the First Year of Grief", img: "https://images.pexels.com/photos/7317669/pexels-photo-7317669.jpeg", category: "Grief Support" },
              { title: "The Importance of Memorialization", img: "https://images.pexels.com/photos/31046047/pexels-photo-31046047.jpeg", category: "Education" },
              { title: "Understanding Modern Cremation Options", img: "https://images.pexels.com/photos/17794572/pexels-photo-17794572.jpeg", category: "Planning" }
            ].map((post, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="rounded-2xl overflow-hidden aspect-video relative mb-4">
                  <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary">{post.category}</div>
                </div>
                <h3 className="font-serif text-2xl text-primary-dark mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <Link href="#" className="flex items-center gap-1 text-sm font-medium text-gray-500 group-hover:text-primary transition-colors">Read Article <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
