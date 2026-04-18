"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Award, HeartHandshake, Eye, Target, Heart, Star, Crown, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-primary-dark text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url("https://images.pexels.com/photos/17794572/pexels-photo-17794572.jpeg")' }} />
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="font-serif text-5xl md:text-6xl mb-6 tracking-tight"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="text-white/80 text-xl font-light"
          >
            A legacy of compassionate care, honoring generations with dignity and profound respect.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-background-cream">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <h2 className="font-serif text-4xl text-primary-dark mb-6">About Us</h2>
              <div className="space-y-4 text-text-muted text-lg font-light leading-relaxed">
                <p>
                  Royalty Funeral Services is a professional funeral service provider committed to offering dignified, affordable, and compassionate funeral services. We serve both rural and urban communities, ensuring families receive respectful and reliable support during times of loss.
                </p>
                
                <h3 className="font-serif text-2xl text-primary-dark mt-8 mb-4">CHURCH & COMMUNITY PARTNERSHIPS</h3>
                <p>
                  Royalty Funeral Services works closely with churches and community institutions to provide faith-aligned funeral services that respect spiritual and cultural traditions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1 }}
              className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.pexels.com/photos/7317669/pexels-photo-7317669.jpeg"
                alt="Our dedicated team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-serif text-4xl text-primary-dark mb-8">Why Choose Us</h2>
            <p className="text-text-muted text-xl font-light leading-relaxed">
              Affordable funeral cover options, rural and urban coverage, compassionate staff, transparent policies, and professional service delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white border-b border-primary/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="bg-background-cream p-10 rounded-3xl border border-primary/10 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Eye size={32} />
              </div>
              <h2 className="font-serif text-3xl text-primary-dark mb-4">Our Vision</h2>
              <p className="text-text-muted text-lg leading-relaxed font-light">
                To be a trusted and respected funeral services provider known for professionalism, ethical conduct, and faith-sensitive service delivery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="bg-primary-dark text-white p-10 rounded-3xl shadow-lg flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center mb-6 relative overflow-hidden">
                <Target size={32} className="relative z-10" />
              </div>
              <h2 className="font-serif text-3xl mb-4">Our Mission</h2>
              <p className="text-white/80 text-lg leading-relaxed font-light">
                To provide accessible, dignified, and professional funeral services that ease emotional and financial burdens while honoring cultural and religious values.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background-cream">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-4xl text-primary-dark mb-4">Our Core Values</h2>
            <p className="text-text-muted text-lg">Dignity, Compassion, Faith, Integrity, and Professionalism guide every aspect of our service delivery</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {[
              { icon: Heart, title: "Empathy", desc: "Understanding and sharing the feelings of our clients during their difficult times." },
              { icon: Star, title: "Quality Service", desc: "Delivering excellence and exceeding expectations in every arrangement." },
              { icon: Crown, title: "Dignity", desc: "Honoring every individual with the utmost respect and reverence." },
              { icon: Users, title: "Team Work", desc: "Collaborating seamlessly to provide comprehensive and unwavering support." },
              { icon: Clock, title: "Timeless", desc: "Creating enduring memories and legacies that stand the test of time." },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className={`p-8 bg-white rounded-2xl border border-black/5 text-center shadow-sm hover:shadow-md transition-shadow ${i === 3 ? 'lg:col-start-1 lg:ml-auto' : ''} ${i === 4 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:mr-auto sm:max-w-md sm:mx-auto lg:max-w-full' : ''}`}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <val.icon className="text-primary" size={32} />
                </div>
                <h3 className="font-serif text-2xl text-primary-dark mb-3">{val.title}</h3>
                <p className="text-text-muted">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
