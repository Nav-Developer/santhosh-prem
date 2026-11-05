"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type NavLink = { label: string; href: string; section?: string };

const links: NavLink[] = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Coaching", href: "/#coaching", section: "coaching" },
  { label: "Shop", href: "/#shop", section: "shop" },
];

const JOIN: NavLink = {
  label: "Join Now",
  href: "/join",
};
const sectionIds = links.flatMap((l) => (l.section ? [l.section] : []));

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < 120) setActiveSection("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 120)
            setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (link: NavLink) =>
    link.section
      ? isHome && activeSection === link.section
      : pathname === link.href;

  const handleClick = (e: React.MouseEvent, link: NavLink) => {
    setOpen(false);
    if (!isHome || !link.section) return;
    const el = document.getElementById(link.section);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${link.section}`);
    setActiveSection(link.section);
  };

  const handleLogo = (e: React.MouseEvent) => {
    setOpen(false);
    if (!isHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
    setActiveSection("");
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        aria-label="Main navigation"
        className={`flex items-center justify-between border-b-2 px-5 py-3 transition-all duration-300 md:px-10 ${
          scrolled
            ? "border-[#ff3b30] bg-[#0b1020]"
            : "border-white/10 bg-[#0b1020]/60 backdrop-blur"
        }`}
      >
        <Link
          href="/"
          onClick={handleLogo}
          aria-label="Santhosh Prem home"
          className="font-display text-2xl text-white"
        >
          Santhosh Prem<span className="text-[#ff3b30]">.</span>
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.label} className="relative">
                <Link
                  href={link.href}
                  onClick={(e) => handleClick(e, link)}
                  aria-current={active ? "page" : undefined}
                  className={`font-display relative block px-4 py-2 text-lg tracking-wide transition-colors hover:text-[#ff3b30] ${
                    active ? "text-[#ff3b30]" : "text-white/70"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-line"
                      className="absolute inset-x-3 -bottom-[3px] h-[3px] bg-[#ff3b30]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href={JOIN.href}
            onClick={(e) => handleClick(e, JOIN)}
            className="font-display bg-[#ff3b30] px-5 py-2 text-lg text-white transition hover:bg-white hover:text-black"
          >
            Join Now
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((p) => !p)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 border-2 border-white/30 md:hidden"
          >
            <span
              className={`h-0.5 w-5 bg-[#ff3b30] transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-[#ff3b30] transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-[#ff3b30] transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col border-b-2 border-[#ff3b30] bg-[#0b1020] md:hidden"
          >
            {links.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.label} className="border-t border-white/10">
                  <Link
                    href={link.href}
                    onClick={(e) => handleClick(e, link)}
                    className={`font-display block px-6 py-4 text-2xl ${
                      active ? "bg-[#ff3b30] text-white" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export { Nav as Navbar };
export default Nav;
