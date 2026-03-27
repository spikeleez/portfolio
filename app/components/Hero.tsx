import { motion } from "framer-motion";

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.03,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
} as const;

export default function Hero() {
  const title = "Unreal Engine 5";
  const subtitle = "C++ & Multiplayer Programmer";

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm tracking-[0.3em] text-white/30 uppercase mb-6"
        >
          Gameplay Programmer
        </motion.p>

        {/* Main title - letter by letter */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="inline-block text-white/95"
              style={{ marginRight: char === " " ? "0.25em" : "0" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg md:text-xl text-white/40 font-light tracking-wide mb-12"
        >
          {subtitle}
        </motion.h2>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.8, ease: "easeInOut" }}
          className="w-16 h-px bg-white/20 mx-auto mb-12"
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            className="px-8 py-3 border border-white/20 text-white/80 text-sm tracking-wider hover:bg-white/5 hover:border-white/40 transition-all duration-300 rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            VER PROJETOS
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-3 bg-white/5 border border-white/10 text-white/60 text-sm tracking-wider hover:bg-white/10 hover:text-white/80 transition-all duration-300 rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            CONTATO
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/0 via-white/20 to-white/0"
          />
        </motion.div>
      </div>
    </section>
  );
}
