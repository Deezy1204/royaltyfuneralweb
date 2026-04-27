"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function OfficesPage() {
  const offices = [
    {
      city: "Bulawayo",
      address: ["Stand 15383, Khami Road", "Kelvin North 11, Bulawayo", "Zimbabwe"],
      phones: ["+263 71 787 4750", "+263 71 787 4747"],
      iframeSrc: "https://maps.google.com/maps?q=-20.156920,28.535489&t=&z=17&ie=UTF8&iwloc=&output=embed",
      mapLink: "https://maps.google.com/?q=-20.156920,28.535489"
    },
    {
      city: "iNyathi",
      address: ["iNyathi Center", "iNyathi", "Zimbabwe"],
      phones: ["+263 71 000 0000", "+263 71 000 0001"],
      iframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113401.75836481745!2d28.7246!3d-19.6748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDQwJzI5LjMiUyAyOMKwNDMnMjguNiJF!5e1!3m2!1sen!2szw!4v1620000000000!5m2!1sen!2szw",
      mapLink: "https://maps.google.com/?q=-19.6748,28.7246"
    },
    {
      city: "Plumtree",
      address: ["Plumtree CBD", "Plumtree", "Zimbabwe"],
      phones: ["+263 71 000 0002", "+263 71 000 0003"],
      iframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113401.75836481745!2d27.8181!3d-20.485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDI5JzA2LjAiUyAyN8KwNDknMDMuMiJF!5e1!3m2!1sen!2szw!4v1620000000000!5m2!1sen!2szw",
      mapLink: "https://maps.google.com/?q=-20.485,27.8181"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-cream">
      {/* Header Banner */}
      <section className="bg-white text-primary-dark pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.03]" style={{ backgroundImage: 'url("https://images.pexels.com/photos/17794572/pexels-photo-17794572.jpeg")' }} />
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="font-serif text-5xl md:text-6xl mb-6 tracking-tight text-primary-dark"
          >
            Our Offices
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="text-text-muted text-xl font-light"
          >
            Find our branches near you. We are dedicated to providing accessible, top-tier services to our communities.
          </motion.p>
        </div>
      </section>

      {/* Offices List */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="space-y-32">
            {offices.map((office, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={office.city} 
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
                >
                  {/* Details Section */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-1/2 flex flex-col items-start"
                  >
                    <div className="inline-flex items-center justify-center p-4 bg-primary/5 text-primary rounded-2xl mb-6 shadow-sm border border-primary/10">
                      <MapPin size={32} />
                    </div>
                    
                    <h2 className="font-serif text-4xl text-primary-dark mb-8">{office.city} Office</h2>
                    
                    <div className="space-y-6 mb-10 w-full">
                      <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                        <h3 className="text-sm font-semibold tracking-widest text-primary uppercase mb-3">Address</h3>
                        <div className="space-y-1 text-text-muted text-lg">
                          {office.address.map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                        <h3 className="text-sm font-semibold tracking-widest text-primary uppercase mb-3">Contact</h3>
                        <div className="space-y-2 text-text-muted text-lg">
                          {office.phones.map((phone, i) => (
                            <p key={i} className="flex items-center gap-3">
                              <Phone size={18} className="text-primary-dark/50" />
                              <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                                {phone}
                              </a>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      href={office.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary-dark hover:shadow-lg transition-all duration-300 group"
                    >
                      Get Directions
                      <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </motion.div>

                  {/* Map Section */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="w-full lg:w-1/2 aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white"
                  >
                    <iframe 
                      src={office.iframeSrc} 
                      className="absolute inset-0 w-full h-full border-0" 
                      allowFullScreen={false} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
