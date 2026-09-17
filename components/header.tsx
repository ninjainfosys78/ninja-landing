"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const closeAllMenus = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    const onDocPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeAllMenus();
      }
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, []);

  // Scroll-aware: hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);
      
      if (currentY < 80) {
        setHidden(false);
      } else if (currentY > lastScrollY.current + 4) {
        setHidden(true);
        setMobileOpen(false);
      } else if (currentY < lastScrollY.current - 4) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 px-6 sm:px-8 lg:px-12 2xl:px-16 mt-4"
      style={{
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform: hidden ? 'translateY(-120%)' : 'translateY(0)',
      }}
      role="banner"
    >
      <motion.div
        className="max-w-[1600px] mx-auto h-20 flex items-center justify-between transition-all duration-300"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundColor: isScrolled || pathname !== "/" ? '#F7F6F2' : 'rgba(247,246,242,0.35)',
          backdropFilter: 'blur(14px)',
          padding: isScrolled ? '0 1.5rem' : '0 2rem',
          borderRadius: '0.5rem',
          border: isScrolled || pathname !== "/" ? '1px solid rgba(11,13,18,0.08)' : '1px solid rgba(255,255,255,0.4)',
          boxShadow: isScrolled ? '0 10px 30px -10px rgba(11,13,18,0.15)' : 'none'
        }}
      >
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Ninja Infosys home"
        >
          <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Ninja Infosys Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold font-heading transition-colors text-[#0b0d12]">
            Ninja Infosys
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-10 whitespace-nowrap ml-12"
          aria-label="Main navigation"
        >
          {/* About Us with Dropdown */}
          <div className="relative group/about">
            <Link
              href="/about"
              className="text-[15px] font-semibold transition-colors flex items-center gap-1 hover:text-[#2563EB] text-[#0b0d12]/70"
            >
              {language === 'en' ? 'About Us' : 'हाम्रो बारेमा'}
              <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover/about:rotate-180" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
            </Link>

            {/* Mega Dropdown */}
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible translate-y-2 group-hover/about:opacity-100 group-hover/about:visible group-hover/about:translate-y-0 transition-all duration-300">
              <div className="bg-white border border-[#0b0d12]/10 p-6 min-w-[240px] shadow-2xl flex flex-col gap-4">
                {[
                  { label: 'Who we are', labelNe: 'हामी को हौं', href: '/about#who-we-are' },
                  { label: 'Our Core', labelNe: 'हाम्रो मूल', href: '/about#our-core' },
                  { label: 'Engineering Principles', labelNe: 'सिद्धान्तहरू', href: '/about#engineering-principles' },
                  { label: 'Leadership', labelNe: 'नेतृत्व', href: '/about#leadership' },
                  { label: 'Our story', labelNe: 'हाम्रो कथा', href: '/about#our-story' }
                ].map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="text-sm text-[#0b0d12]/50 hover:text-[#0b0d12] transition-colors py-1 flex items-center gap-3 group/sub"
                  >
                    <div className="w-1 h-1 bg-[#2563EB] rounded-full scale-0 group-hover/sub:scale-100 transition-transform" />
                    {language === 'en' ? subItem.label : subItem.labelNe}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Solutions with Dropdown */}
          <div className="relative group/solutions">
            <Link
              href="/solutions"
              className="text-[15px] font-semibold transition-colors flex items-center gap-1 hover:text-[#2563EB] text-[#0b0d12]/70"
            >
              {language === 'en' ? 'Solutions' : 'समाधानहरू'}
              <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover/solutions:rotate-180" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
            </Link>

            {/* Solutions Mega Dropdown */}
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible translate-y-2 group-hover/solutions:opacity-100 group-hover/solutions:visible group-hover/solutions:translate-y-0 transition-all duration-300">
              <div className="bg-white border border-[#0b0d12]/10 p-6 min-w-[280px] shadow-2xl flex flex-col gap-4">
                {[
                  { label: 'Government & Municipality', labelNe: 'सरकार तथा नगरपालिका', href: '/solutions?cat=gov' },
                  { label: 'Education', labelNe: 'शिक्षा', href: '/solutions?cat=edu' },
                  { label: 'Healthcare', labelNe: 'स्वास्थ्य', href: '/solutions?cat=health' },
                  { label: 'Fintech', labelNe: 'फिनटेक', href: '/solutions?cat=fin' },
                  { label: 'Corporate Solutions', labelNe: 'कर्पोरेट समाधान', href: '/solutions?cat=corp' }
                ].map((sol) => (
                  <Link
                    key={sol.label}
                    href={sol.href}
                    className="text-sm text-[#0b0d12]/50 hover:text-[#0b0d12] transition-colors py-1 flex items-center gap-3 group/sub"
                  >
                    <div className="w-1 h-1 bg-[#2563EB] rounded-full scale-0 group-hover/sub:scale-100 transition-transform" />
                    {language === 'en' ? sol.label : sol.labelNe}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {[
            { label: 'Insights', labelNe: 'अन्तर्दृष्टि', href: '/blogs' },
            { label: 'Partners', labelNe: 'साझेदारहरू', href: '/partners' },
            { label: 'Contact', labelNe: 'सम्पर्क', href: '/contact' }
          ].map((item) => (
            <Link 
              key={item.label}
              href={item.href}
              className="text-[15px] font-semibold transition-colors hover:text-[#2563EB] text-[#0b0d12]/70"
            >
              {language === 'en' ? item.label : item.labelNe}
            </Link>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setLanguage(language === "en" ? "ne" : "en")}
            className="hidden sm:block w-24 shrink-0 text-center text-[13px] font-bold tracking-wider transition-colors uppercase text-[#0b0d12]/40 hover:text-[#0b0d12]"
          >
            {language === "en" ? "नेपाली" : "English"}
          </button>

          <button 
            onClick={() => {
              if (pathname === "/") {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.href = "/contact";
              }
            }}
            className="hidden lg:inline-flex items-center gap-2 bg-[#E31B23] text-white px-7 py-3 text-[15px] font-bold transition-all hover:brightness-110 active:scale-95 shadow-sm w-[230px] justify-center shrink-0"
          >
            <span className="whitespace-nowrap">{language === 'en' ? 'Build with us' : 'हामीसँग निर्माण गर्नुहोस्'}</span>
            <ArrowRight size={16} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 transition-colors text-[#0b0d12]"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.div>
    </header>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-20 z-40 overflow-y-auto pt-10"
            style={{ backgroundColor: '#F7F6F2' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
             <motion.div
               className="p-8 space-y-10"
               initial="hidden"
               animate="show"
               exit="hidden"
               variants={{
                 hidden: {},
                 show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
               }}
             >
               <nav className="flex flex-col gap-8 text-2xl font-bold font-heading">
                  {[
                    { label: 'About Us', href: '/about' },
                    { label: 'Solutions', href: '/solutions' },
                    { label: 'Insights', href: '/blogs' },
                    { label: 'Partners', href: '/partners' },
                    { label: 'Contact', href: '/contact' }
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                      }}
                    >
                      <Link href={item.href} onClick={closeAllMenus} className="text-[#0b0d12] hover:text-[#2563EB] transition-colors">
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
               </nav>
             </motion.div>
          </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}
