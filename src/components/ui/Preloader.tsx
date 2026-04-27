"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const { finishLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      finishLoading();
    }, 3000);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 1.2, 
                ease: "easeInOut" 
              }
            }}
            className="relative w-64 h-64 md:w-96 md:h-96"
          >
            <Image
              src="/images/logo.png"
              alt="Royalty Funeral Services"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          {/* Subtle loading indicator */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ 
              width: "200px",
              transition: { duration: 2.8, ease: "linear" }
            }}
            className="absolute bottom-20 h-0.5 bg-primary/20 overflow-hidden"
          >
            <motion.div 
              className="h-full bg-primary"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.8, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
