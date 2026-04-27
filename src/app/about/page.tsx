"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { Users, Eye, Target, Heart, Star, Crown, Clock, UserCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function About() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const teamMembers = [
    { name: "B Sibanda", title: "Director", isDirector: true },
    { name: "F Ndlovu", title: "Director", isDirector: true },
    { name: "P Nkomo", title: "Team Member", isDirector: false },
    { name: "D Moyo", title: "Team Member", isDirector: false },
    { name: "D Ncube", title: "Team Member", isDirector: false },
    { name: "B Tshabangu", title: "Team Member", isDirector: false },
  ];

  const galleryItems = [
    { id: 1, title: "Head Office", category: "Offices", image: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 2, title: "Executive Hearse", category: "Hearses", image: "https://images.pexels.com/photos/8924041/pexels-photo-8924041.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 3, title: "Comfortable Setup", category: "Tents", image: "https://images.pexels.com/photos/2253832/pexels-photo-2253832.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 4, title: "Our Team Proceeding", category: "Men at Work", image: "https://images.pexels.com/photos/7317669/pexels-photo-7317669.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 5, title: "Branch Office", category: "Offices", image: "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 6, title: "Standard Hearse", category: "Hearses", image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 7, title: "Premium Tents", category: "Tents", image: "https://images.pexels.com/photos/1684422/pexels-photo-1684422.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 8, title: "Grave Preparation", category: "Men at Work", image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800" },
  ];

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryItems.length);
    }
  }, [selectedIndex, galleryItems.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  }, [selectedIndex, galleryItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  const teamContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const teamItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="bg-white text-primary-dark py-24 md:py-32 relative overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.03]" style={{ backgroundImage: 'url("https://images.pexels.com/photos/17794572/pexels-photo-17794572.jpeg")' }} />
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="font-serif text-5xl md:text-6xl mb-6 tracking-tight text-primary-dark"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="text-text-muted text-xl font-light"
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
              <Image 
                src="/images/logo.png" 
                alt="Royalty Funeral Services Logo" 
                width={400} 
                height={140} 
                className="h-32 md:h-40 w-auto object-contain mb-8" 
              />
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
              className="bg-white text-primary-dark p-10 rounded-3xl shadow-sm border border-primary/10 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 relative overflow-hidden">
                <Target size={32} className="relative z-10" />
              </div>
              <h2 className="font-serif text-3xl mb-4 text-primary-dark">Our Mission</h2>
              <p className="text-text-muted text-lg leading-relaxed font-light">
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

      {/* The Team Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-4xl text-primary-dark mb-4">The Team</h2>
            <p className="text-text-muted text-lg">Meet the dedicated professionals committed to guiding you with compassion and expertise during your time of need.</p>
          </motion.div>

          <motion.div
            variants={teamContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={teamItemVariants}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/10 text-center p-10 flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <UserCircle2 size={48} />
                </div>
                <h3 className="font-serif text-2xl text-primary-dark mb-2">{member.name}</h3>
                <p className="text-primary font-medium tracking-wide uppercase text-sm">
                  {member.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-background-cream relative">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-4xl text-primary-dark mb-4">Our Gallery</h2>
            <p className="text-text-muted text-lg">A visual overview of our facilities, standard fleets, and our dedicated team working seamlessly to provide comfort.</p>
          </motion.div>

          {/* Masonry / Grid Gallery */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {galleryItems.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-primary/10"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Profile */}
                <div className="absolute inset-0 bg-primary-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-block px-3 py-1 bg-white/20 text-white backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-xl text-white">
                      {item.title}
                    </h3>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox / Carousel */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }} 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50"
              aria-label="Close"
            >
              <X size={36} />
            </button>

            <button 
              onClick={showPrev}
              className="absolute left-4 md:left-10 text-white/70 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/50 rounded-full z-50"
              aria-label="Previous image"
            >
              <ChevronLeft size={48} />
            </button>
            
            <button 
              onClick={showNext}
              className="absolute right-4 md:right-10 text-white/70 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/50 rounded-full z-50"
              aria-label="Next image"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div 
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl h-[70vh] md:h-[85vh] mx-4 md:mx-auto mt-8 flex flex-col items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={galleryItems[selectedIndex].image.replace("w=800", "w=1600")}
                  alt={galleryItems[selectedIndex].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-8 left-0 right-0 text-center text-white/80">
                <p className="font-medium text-lg">{galleryItems[selectedIndex].title}</p>
                <p className="text-sm opacity-80">{selectedIndex + 1} of {galleryItems.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
