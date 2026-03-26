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
              <h2 className="font-serif text-4xl text-primary-dark mb-6">Our Story</h2>
              <div className="space-y-4 text-text-muted text-lg font-light leading-relaxed">
                <p>
                  Founded on principles of empathy and unwavering support, Royalty Funeral Services has been a pillar of strength for families in their most difficult times. We believe every life is unique and deserves to be celebrated with personalized care.
                </p>
                <p>
                  Our dedicated team brings decades of combined experience, ensuring that every detail is handled meticulously. From the initial consultation to the final farewell, we walk alongside you, honoring your traditions, beliefs, and wishes.
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
                To provide a dignified world-class royal service to all our clients.
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
                To offer a seamless, dignified service that respects cultural and religious beliefs of our clients.
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
            <p className="text-text-muted text-lg">The principles that guide every aspect of our care.</p>
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
