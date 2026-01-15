"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import placeholderData from "@/data/placeholder.json";

const { navbar } = placeholderData;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuLinks = [
    { name: "Home", href: "#hero" },
    { name: "Rooms", href: "#floor" },
    { name: "Amenities", href: "#why-us" },
    { name: "About", href: "#about" },
    { name: "Destinations", href: "#cities" },
    { name: "Contact", href: "#footer" },
  ];

  return (
    <>
      {/* Main Navigation Bar - Floating Pill */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4"
      >
        <nav
          className={cn(
            "flex items-center justify-between px-6 md:px-8 py-3 rounded-full transition-all duration-300",
            "bg-white/95 backdrop-blur-md border border-border/50 shadow-lg shadow-black/5"
          )}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center">
            <svg
              width="40"
              height="24"
              viewBox="0 0 40 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-foreground"
            >
              <path
                d="M8 6C8 6 4 10 4 12C4 14 6 16 8 16C10 16 12 14 12 12C12 10 10 8 12 6C14 4 18 4 20 6C22 8 20 12 20 12C20 12 18 16 20 18C22 20 26 20 28 18C30 16 28 12 28 12C28 12 26 8 28 6C30 4 34 4 36 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navbar.barLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-3 group"
            aria-label="Open menu"
          >
            {/* Hamburger Lines */}
            <div className="flex flex-col gap-1.5">
              <span className="w-5 h-[2px] bg-foreground rounded-full transition-all duration-200 group-hover:w-6" />
              <span className="w-5 h-[2px] bg-foreground rounded-full transition-all duration-200 group-hover:w-4" />
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:block">
              Menu
            </span>
          </button>
        </nav>
      </motion.header>

      {/* Expandable Full Screen Menu - Slides from Right */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel - Slides from Right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[480px] bg-[#1a1a1a] overflow-y-auto"
            >
              <div className="flex flex-col min-h-full p-8 md:p-12">
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="self-start flex items-center justify-center w-12 h-12 bg-white rounded-sm hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[#1a1a1a]" />
                </motion.button>

                {/* Menu Links */}
                <nav className="mt-12 md:mt-16 flex-1">
                  <ul className="space-y-2">
                    {menuLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <a
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="group block py-2"
                        >
                          <span className="text-3xl md:text-4xl font-medium text-white/90 group-hover:text-primary transition-colors duration-200">
                            {link.name}
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Contact & Socials Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mt-auto pt-12 space-y-8"
                >
                  {/* Contact */}
                  <div>
                    <p className="text-sm text-white/40 mb-3">Contact</p>
                    <div className="space-y-1">
                      <a
                        href={`mailto:${navbar.contact.email}`}
                        className="block text-white/70 hover:text-primary transition-colors text-sm underline underline-offset-2"
                      >
                        {navbar.contact.email}
                      </a>
                      <a
                        href={`tel:${navbar.contact.phone}`}
                        className="block text-white/70 hover:text-primary transition-colors text-sm underline underline-offset-2"
                      >
                        {navbar.contact.phone}
                      </a>
                    </div>
                  </div>

                  {/* Socials */}
                  <div>
                    <p className="text-sm text-white/40 mb-3">Socials</p>
                    <div className="space-y-1">
                      {navbar.socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-white/70 hover:text-primary transition-colors text-sm underline underline-offset-2"
                        >
                          {social.name === "Twitter" ? "X / Twitter" : social.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
