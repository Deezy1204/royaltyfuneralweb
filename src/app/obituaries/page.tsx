"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, CalendarDays } from "lucide-react";

const obituaries = [
  {
    id: "ob-1",
    name: "Margaret Thandiwe Moyo",
    years: "1945 - 2026",
    date: "March 15, 2026",
    location: "Bulawayo, Zimbabwe",
    image: "https://images.pexels.com/photos/17794572/pexels-photo-17794572.jpeg",
    excerpt: "A beloved mother, grandmother, and pillar of the community, Margaret passed away peacefully surrounded by her family."
  },
  {
    id: "ob-2",
    name: "James Dube",
    years: "1952 - 2026",
    date: "March 10, 2026",
    location: "Bulawayo, Zimbabwe",
    image: "https://images.pexels.com/photos/7317669/pexels-photo-7317669.jpeg",
    excerpt: "James was known for his generous spirit, infectious laugh, and lifelong dedication to education and youth mentorship."
  },
  {
    id: "ob-3",
    name: "Sarah Nyasha Chikono",
    years: "1960 - 2026",
    date: "February 28, 2026",
    location: "Mutare, Zimbabwe",
    image: "https://images.pexels.com/photos/31046047/pexels-photo-31046047.jpeg",
    excerpt: "Sarah's green thumb and warm kitchen welcomed everyone. She leaves behind a legacy of love, kindness, and deep faith."
  }
];

export default function Obituaries() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-background-cream">
      
      <section className="py-20 container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-primary/10 pb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <h1 className="font-serif text-5xl md:text-6xl text-primary-dark mb-4">Obituaries & Tributes</h1>
            <p className="text-text-muted text-xl font-light">
              Honoring the beautiful lives, enduring legacies, and cherished memories of those we have proudly served.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-auto relative"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name..." 
                className="w-full md:w-72 pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white"
              />
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {obituaries.map((ob, i) => (
            <motion.div 
              key={ob.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start group hover:shadow-md transition-shadow"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-background-cream shadow-inner relative">
                <Image src={ob.image} alt={ob.name} fill className="object-cover" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-serif text-3xl text-primary-dark mb-1">{ob.name}</h2>
                <div className="text-xl text-primary mb-4 font-medium">{ob.years}</div>
                
                <p className="text-text-muted text-lg mb-6 max-w-2xl leading-relaxed">
                  "{ob.excerpt}"
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-gray-500 mb-6 md:mb-0">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-primary/70" />
                    <span>Service: {ob.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary/70" />
                    <span>{ob.location}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 md:self-center">
                <button className="bg-primary/10 text-primary px-6 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-colors whitespace-nowrap">
                  View Tribute Wall
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-colors">
            Load More Tributes
          </button>
        </div>

      </section>

    </div>
  );
}
