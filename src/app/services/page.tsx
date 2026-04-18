"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, BookHeart, CircleDot, FileType2, Flower2, 
  Heart, ShieldPlus, Clock, ShieldCheck, Sparkles, Church, 
  Truck, Archive, FileText 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const services = [
  {
    id: "funeral",
    title: "Funeral Planning",
    icon: Flower2,
    image: "https://images.pexels.com/photos/17794572/pexels-photo-17794572.jpeg",
    description: "Honoring lives with personalized and meaningful ceremonies. Whether you prefer a traditional service or a modern celebration of life, we align with your family's beliefs and wishes. We manage venue coordination, floral arrangements, transport, and officiating details.",
  },
  {
    id: "burial",
    title: "Burial Services",
    icon: CircleDot,
    image: "https://images.pexels.com/photos/7317677/pexels-photo-7317677.jpeg",
    description: "Providing a tranquil final resting place. We assist with selecting caskets, securing burial plots, organizing graveside committal services, and arranging for permanent memorials or headstones.",
  },
  {
    id: "pre-planning",
    title: "Pre-planning",
    icon: BookHeart,
    image: "https://images.pexels.com/photos/7317669/pexels-photo-7317669.jpeg",
    description: "Relieve your loved ones of the emotional and financial burden by making your arrangements in advance. Secure your legacy and ensure your final wishes are honored precisely as you desire.",
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(services[0].id);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-background-cream py-16 md:py-24 border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-serif text-5xl md:text-6xl text-primary-dark mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="text-text-muted text-xl font-light"
          >
            Comprehensive, compassionate care dedicated to honoring every life.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white min-h-[70vh]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-32 space-y-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`w-full text-left px-6 py-5 rounded-xl transition-all flex items-center justify-between group ${activeTab === service.id ? 'bg-primary text-white shadow-lg' : 'bg-background-cream hover:bg-gray-100 text-primary-dark'}`}
                  >
                    <span className="flex items-center gap-4 font-medium text-lg">
                      <service.icon size={22} className={activeTab === service.id ? 'text-white' : 'text-primary'} />
                      {service.title}
                    </span>
                    {activeTab === service.id && (
                      <motion.div layoutId="active-indicator">
                        <ArrowRight size={20} />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-2/3">
              {services.map((service) => (
                activeTab === service.id && (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-8"
                  >
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h2 className="font-serif text-4xl text-primary-dark mb-6">{service.title}</h2>
                      <p className="text-text-muted text-lg leading-relaxed mb-8">
                        {service.description}
                      </p>

                      {service.id === "pre-planning" ? (
                        <Link href="/contact" className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-colors font-medium">
                          Schedule a Consultation
                        </Link>
                      ) : (
                        <Link href="/contact" className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-colors font-medium">
                          Request Details
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Comprehensive Services Grid */}
      <section className="py-24 bg-background-cream">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-4xl text-primary-dark mb-4">Our Comprehensive Offerings</h2>
            <p className="text-text-muted text-lg font-light">Beyond our core planning, we provide a full range of professional funeral services to support you every step of the way.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "24-Hour Body Collection", desc: "Reliable and respectful retrieval services available at any time of day or night." },
              { icon: ShieldCheck, title: "Mortuary Services", desc: "State-of-the-art mortuary and refrigeration facilities to ensure dignified care." },
              { icon: Sparkles, title: "Body Preparation", desc: "Professional embalming and grooming services performed with the utmost respect." },
              { icon: Church, title: "Viewing & Chapel", desc: "Quiet spaces for personal viewing and meaningful chapel ceremonies." },
              { icon: Truck, title: "Hearse & Family Transport", desc: "Dignified transportation for the deceased and reliable vehicles for the family." },
              { icon: Archive, title: "Coffins & Caskets", desc: "A wide selection of high-quality coffins and caskets to suit every preference." },
              { icon: FileText, title: "Documentation Assistance", desc: "Expert guidance in managing funeral cover schemes and all necessary paperwork." },
              { icon: Heart, title: "Compassionate Support", desc: "Ongoing emotional support for the family throughout the entire process." }
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <s.icon size={28} />
                </div>
                <h3 className="font-serif text-xl text-primary-dark mb-3 leading-tight">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-dark text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="container relative z-10 mx-auto px-4">
          <h2 className="font-serif text-4xl mb-6">Need Immediate Assistance?</h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">Our team is available 24/7 to help you navigate this difficult time with dignity and respect.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary-dark px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-background-cream transition-colors">
              Contact Us Now
            </Link>
            <a href="tel:+263717874750" className="border-2 border-white/20 px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">
              Call Hotline
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
