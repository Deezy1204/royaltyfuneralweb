import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <Link href="/" className="inline-block bg-white p-2 rounded-lg">
              <Image src="/images/logo.png" alt="Royalty Funeral Services" width={150} height={50} className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              Providing compassionate, respectful, and dignified funeral services to families during their time of need. Our commitment is to honor every life with care.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 border-b border-white/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3 text-white/80">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="/policies" className="hover:text-white transition-colors">Policy Options</Link></li>
              <li><Link href="/portal" className="hover:text-white transition-colors">Client Portal</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 border-b border-white/20 pb-2 inline-block">Services</h4>
            <ul className="space-y-3 text-white/80">
              <li><Link href="/services#funeral" className="hover:text-white transition-colors">Funeral Planning</Link></li>
              <li><Link href="/services#burial" className="hover:text-white transition-colors">Burial Services</Link></li>
                <li><Link href="/services#pre-planning" className="hover:text-white transition-colors">Pre-planning</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 border-b border-white/20 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 mt-1" size={20} />
                <span>Stand 15383, Khami Road Kelvin North 11, Bulawayo</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0" size={20} />
                <span>+263 71 787 4750 (24/7 Hotline)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0" size={20} />
                <span>+263 71 787 4747 (24/7 Hotline)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0" size={20} />
                <span>sales@royaltyfuneral.com</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-white/20 text-center text-white/60 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Royalty Funeral Services. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
