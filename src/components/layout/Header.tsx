"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Policy Options", href: "/policies" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background-cream/90 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 z-50 group">
          <Image src="/images/logo.png" alt="Royalty Funeral Services" width={180} height={60} className="h-10 w-auto object-contain" priority />
          <div className="hidden sm:block">
            <span className="font-serif text-lg font-bold text-primary-dark block leading-none">Royalty</span>
            <span className="text-[10px] uppercase tracking-widest text-[#1e3a8a] font-black">Funeral Services</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`hover:text-primary transition-colors ${pathname === link.href ? "text-primary font-semibold" : "text-primary-dark"}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/portal" className="text-primary hover:text-primary-dark transition-colors font-semibold border border-primary/20 px-4 py-2 rounded-full hover:bg-primary/5">
            Client Portal
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+263717874750" className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors">
            <Phone size={16} />
            <span className="hidden lg:inline">24/7 Support</span>
          </a>
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-primary z-50 p-2"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-[72px] bg-background-cream z-40 overflow-y-auto border-t border-primary/10"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              <nav className="flex flex-col gap-4 text-center text-lg font-medium">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className={`p-3 rounded-lg ${pathname === link.href ? "bg-primary/10 text-primary" : "text-primary-dark hover:bg-white"}`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-primary/10 my-2" />
                <Link 
                  href="/portal" 
                  className="p-3 rounded-lg text-primary bg-primary/5 border border-primary/20"
                >
                  Client Portal
                </Link>
              </nav>

              <div className="mt-8 flex justify-center">
                <a href="tel:+263717874750" className="flex items-center justify-center gap-2 w-full max-w-sm px-6 py-4 bg-primary text-white rounded-xl font-medium shadow-lg hover:bg-primary-dark transition-colors">
                  <Phone size={20} />
                  <span>Call 24/7 Support</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
