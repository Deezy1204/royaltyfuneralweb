"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookHeart, CircleDot, FileType2, Flower2, Heart, ShieldPlus } from "lucide-react";
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
    </div>
  );
}
