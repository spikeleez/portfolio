import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#timeline" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsubscribe;
  }, [scrollY]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl border-b border-white/5" : ""
      }`}
      style={{ backgroundColor: scrolled ? `rgba(5, 5, 5, 0.9)` : "transparent" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-lg font-bold tracking-wider text-white/90 hover:text-white transition-colors"
          whileHover={{ scale: 1.02 }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          CAUÃ MATTOS<span className="text-white/40">.portfolio</span>
        </motion.a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
              whileHover={{ y: -1 }}
              onClick={(e) => handleClick(e, link.href)}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {isOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-xl"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors tracking-wide"
              onClick={(e) => handleClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
