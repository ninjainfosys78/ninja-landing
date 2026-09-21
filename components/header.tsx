"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import NavDropdown from "@/components/header/nav-dropdown";
import { ABOUT_MENU_ITEMS, SOLUTIONS_MENU_ITEMS } from "@/components/header/nav-menu-items";
import { hasHeroBanner, isActiveLink, navLinkClass } from "@/components/header/nav-styles";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const overHero = hasHeroBanner(pathname) && !isScrolled && !mobileOpen;

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
      className={`fixed top-0 left-0 w-full z-50 border-b ${
        overHero ? "border-transparent bg-transparent" : "border-white/10 bg-[#0A1F4D]/95 backdrop-blur-md"
      }`}
      style={{
        boxShadow: isScrolled ? '0 12px 28px -18px rgba(4,10,28,0.6)' : 'none',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform: hidden ? 'translateY(-120%)' : 'translateY(0)',
      }}
      role="banner"
    >
      <motion.div
        className="max-w-[1600px] mx-auto h-[88px] px-6 sm:px-8 lg:px-12 2xl:px-16 flex items-center justify-between"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Ninja Infosys home"
        >
          <div className="relative w-14 h-14 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Ninja Infosys Logo"
              width={56}
              height={56}
              className="object-contain"
              priority
            />
          </div>
          <span className={`text-xl font-bold font-heading transition-colors text-white`}>
            Ninja Infosys
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={`hidden lg:flex items-center gap-1 whitespace-nowrap rounded-full border p-1.5 transition-all duration-500 ${
            overHero ? "border-white/15 bg-white/10 backdrop-blur-md" : "border-transparent bg-transparent"
          }`}
          aria-label="Main navigation"
        >
          <NavDropdown
            label={language === 'en' ? 'About Us' : 'हाम्रो बारेमा'}
            href="/about"
            active={isActiveLink(pathname, "/about")}
            language={language}
            panelWidthClass="min-w-[240px]"
            items={ABOUT_MENU_ITEMS}
          />

          <NavDropdown
            label={language === 'en' ? 'Solutions' : 'समाधानहरू'}
            href="/solutions"
            active={isActiveLink(pathname, "/solutions")}
            language={language}
            panelWidthClass="min-w-[280px]"
            items={SOLUTIONS_MENU_ITEMS}
          />

          {[
            { label: 'Blogs', labelNe: 'ब्लगहरू', href: '/blogs' },
            { label: 'Partners', labelNe: 'साझेदारहरू', href: '/partners' },
            { label: 'Contact', labelNe: 'सम्पर्क', href: '/contact' }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={navLinkClass(isActiveLink(pathname, item.href))}
            >
              {language === 'en' ? item.label : item.labelNe}
            </Link>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setLanguage(language === "en" ? "ne" : "en")}
            className={`hidden sm:block w-24 shrink-0 text-center text-[13px] font-bold tracking-wider transition-colors uppercase text-white/60 hover:text-white`}
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
            className={`hidden lg:inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[15px] font-bold transition-all active:scale-95 justify-center shrink-0 bg-[#E31B23] text-white shadow-sm hover:brightness-110`}
          >
            <span className="whitespace-nowrap">{language === 'en' ? 'Build with us' : 'हामीसँग निर्माण गर्नुहोस्'}</span>
            <ArrowRight size={16} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors text-white`}
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
            className="lg:hidden fixed inset-0 top-[88px] z-40 overflow-y-auto pt-10"
            style={{ backgroundColor: '#0A1F4D' }}
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
                    { label: 'Blogs', href: '/blogs' },
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
                      <Link href={item.href} onClick={closeAllMenus} className="text-white hover:text-[#7FA8FF] transition-colors">
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
