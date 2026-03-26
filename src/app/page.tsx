"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Clock } from "lucide-react";
import { Phone, CheckCircle2, DollarSign, Map, HeartHandshake } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 800], [0, 250]);

  return (
    <div className="flex flex-col min-h-screen bg-primary-dark">
      {/* Hero Section */}
      <section className="sticky top-0 h-screen flex items-center justify-center overflow-hidden z-0">
        <div className="absolute inset-0 bg-primary-dark/90 z-10" />
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.pexels.com/photos/17794572/pexels-photo-17794572.jpeg")' }}
        />
        
        <motion.div 
          style={{ y: textY }}
          className="container relative z-20 px-4 md:px-8 text-center text-white"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 font-medium tracking-tight text-white/95"
          >
            Honoring Life <br />
            <span className="text-white/80 italic font-light">with Dignity...</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.5 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-10 font-light"
          >
            Providing compassionate, respectful, and dignified funeral services, cremation, and grief support to help families navigate their time of need.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/services" className="bg-white text-primary-dark px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all flex items-center gap-2 group shadow-xl">
              Learn About Our Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all">
              Request a Consultation
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content Layer (Scrolls over Hero) */}
      <motion.div 
        initial={{ opacity: 0.8, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.05 }}
        className="relative z-30 bg-background-cream flex flex-col pt-12 shadow-[0_-15px_40px_rgba(0,0,0,0.5)] origin-bottom rounded-t-[3rem] overflow-hidden"
      >
        {/* Values Section */}
        <section className="py-24 bg-background-cream">
        <div className="container px-4 md:px-8 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary-dark mb-6">Our Commitment</h2>
            <p className="text-text-muted text-lg">
              We understand that planning a funeral can be overwhelming. Our dedicated team is here to guide you through every step with compassion, professionalism, and unwavering support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Compassionate Care", desc: "We provide emotional support and handle every detail with the utmost sensitivity." },
              { icon: Shield, title: "Dignified Services", desc: "Honoring your loved one's legacy with respectful and personalized ceremonies." },
              { icon: Clock, title: "24/7 Availability", desc: "We are available around the clock to assist you whenever you need us." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, delay: i * 0.15 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5 hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className="text-primary group-hover:text-white transition-colors duration-300" size={32} />
                </div>
                <h3 className="font-serif text-2xl text-primary-dark mb-4">{feature.title}</h3>
                <p className="text-text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white border-t border-primary/5">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-primary-dark mb-6">Exclusive Member Benefits</h2>
            <p className="text-text-muted text-lg">
              When you choose Royalty Funeral Services, you gain access to comprehensive benefits designed to provide complete peace of mind.
            </p>
          </div>

          {/* Highlighted Catchy Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0 }}
              className="bg-primary-dark text-white p-8 rounded-2xl shadow-lg relative overflow-hidden"
            >
              <DollarSign className="absolute -right-4 -top-4 w-32 h-32 text-white/5" />
              <h3 className="font-serif text-2xl mb-4 text-primary-light">Premium Cash-Back</h3>
              <p className="text-white/80 font-light text-lg">Enjoy 1 full year of premium cash-back for every claim-free 5-year period.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.15 }}
              className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden"
            >
              <Map className="absolute -right-4 -top-4 w-32 h-32 text-white/10" />
              <h3 className="font-serif text-2xl mb-4">Nationwide Coverage</h3>
              <p className="text-white/80 font-light text-lg">Burial anywhere within the borders of Zimbabwe at no extra cost to you or your family.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.3 }}
              className="bg-background-cream p-8 rounded-2xl border border-primary/10 shadow-sm relative overflow-hidden text-primary-dark"
            >
              <HeartHandshake className="absolute -right-4 -top-4 w-32 h-32 text-primary/5" />
              <h3 className="font-serif text-2xl mb-4 text-primary">No Age Limit</h3>
              <p className="text-text-muted font-light text-lg">Cover starting at just $6 per individual, ensuring everyone can plan for the future with dignity.</p>
            </motion.div>
          </div>

          {/* Expanded Benefits List */}
          <div className="bg-background-cream/50 p-8 md:p-12 rounded-3xl border border-primary/5">
            <h3 className="font-serif text-2xl text-primary-dark mb-8 text-center border-b border-primary/10 pb-4 inline-block mx-auto flex justify-center">Comprehensive Funeral Services Included</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
              {[
                "Grocery Allowance & Airtime",
                "Body Removal & Mortuary Services",
                "Body Wash & Professional Dressing",
                "Quality Casket & Hearse Provision",
                "Transport for Mourners",
                "Repatriation Services",
                "Funeral Cash Plan",
                "Optional Spousal/Principal Death Benefit"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted mt-8 text-center italic">* Certain benefits are subject to waiting periods and chosen plans. E.g., The $6 plan includes a 2-tier casket, hearse, and a $50 cash allowance with a 6-month waiting period.</p>
          </div>
        </div>
      </section>
      
      {/* Featured Services */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0 }}
              className="max-w-2xl"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-primary-dark mb-4">Our Services</h2>
              <p className="text-text-muted text-lg">Comprehensive care and arrangements tailored to your family's needs and traditions.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.2 }}
            >
              <Link href="/services" className="text-primary font-medium hover:text-primary-dark flex items-center gap-2 mt-6 md:mt-0 underline-offset-4 hover:underline">
                View All Services
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {[
              { title: "Funeral Planning", img: "https://images.pexels.com/photos/7317669/pexels-photo-7317669.jpeg", desc: "Traditional and modern funeral arrangements designed to celebrate life's meaningful moments." },
              { title: "Burial Services", img: "https://images.pexels.com/photos/31046047/pexels-photo-31046047.jpeg", desc: "Respectful burial arrangements including casket selection, plot coordination, and graveside ceremonies." },
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: i * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-2xl mb-6 aspect-[4/3] bg-gray-100 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <h3 className="font-serif text-3xl text-primary-dark mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-text-muted mb-4 text-lg">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action pre-footer */}
      <section className="py-24 bg-primary text-white">
        <div className="container px-4 md:px-8 mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium">We Are Here For You</h2>
            <p className="text-white/80 text-xl mb-10 font-light">Whether you need immediate assistance or are planning for the future, our dedicated staff is ready to help 24 hours a day.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-primary-dark px-8 py-4 rounded-full font-medium hover:bg-background-cream transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Contact Us Today
              <Phone size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
      
      </motion.div>
    </div>
  );
}
