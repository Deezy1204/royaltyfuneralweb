"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Award, HeartHandshake } from "lucide-react";

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
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl mb-6 tracking-tight"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
              transition={{ duration: 0.7 }}
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
              transition={{ duration: 0.7 }}
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

      {/* Values */}
      <section className="py-24 bg-white">
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

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: HeartHandshake, title: "Empathy", desc: "We listen with open hearts and provide emotional comfort during times of immense grief." },
              { icon: Award, title: "Excellence", desc: "We strive for perfection in every detail, ensuring dignified and flawless arrangements." },
              { icon: Users, title: "Community", desc: "We are deeply rooted in our community, dedicated to serving families from all walks of life." },
            ].map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 bg-background-cream rounded-2xl border border-black/5 text-center"
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
