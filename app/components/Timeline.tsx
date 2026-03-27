import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const timelineData = [
  {
    year: "2018",
    title: "First Contact",
    description:
      "Discovered Unreal Engine as a hobby, exploring the world of Blueprints and understanding the engine fundamentals.",
  },
  {
    year: "2019",
    title: "Deepening Knowledge",
    description:
      "Started dedicating myself more seriously, studying gameplay mechanics and expanding Blueprint scripting knowledge.",
  },
  {
    year: "2020",
    title: "Professional Decision",
    description:
      "Decisive moment: chose to pursue a career with Unreal Engine. Total focus on Gameplay Systems and game architecture.",
  },
  {
    year: "2022",
    title: "Multiplayer & AI",
    description:
      "Initiated studies in Multiplayer networking, Behavior Trees for AI, and took the first steps in C++.",
  },
  {
    year: "2023",
    title: "C++ & GAS",
    description:
      "Dived into C++ and the Gameplay Ability System. Discovered the power of scalability and professional solutions that GAS provides.",
  },
  {
    year: "2024",
    title: "Professional Industry",
    description:
      "Joined a professional studio. Worked with GAS and Local Multiplayer in an Action RPG, developing enemy AI, bosses, and designer tools.",
  },
  {
    year: "2025",
    title: "First Shipped Title",
    description:
      "Launched Nicktoons & The Dice of Destiny on Steam, PS5, Nintendo Switch, and Xbox. Full experience from prototype to multiplatform shipping.",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.3em] text-white/30 uppercase mb-8">
            Journey
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-20">
            From hobby to industry
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/10" />

          {timelineData.map((item, index) => (
            <ScrollReveal
              key={item.year}
              delay={index * 0.08}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div
                className={`relative flex items-start gap-8 mb-16 md:mb-12 ${
                  index % 2 === 0
                    ? "md:flex-row md:text-right"
                    : "md:flex-row-reverse md:text-left"
                }`}
              >
                {/* Dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-[15px] h-[15px] rounded-full border-2 border-white/20 bg-[#0a0a0a] z-10 flex items-center justify-center"
                  whileInView={{ borderColor: "rgba(255,255,255,0.5)" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-[5px] h-[5px] rounded-full bg-white/40" />
                </motion.div>

                {/* Content */}
                <div
                  className={`pl-10 md:pl-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                  }`}
                >
                  <span className="text-xs tracking-[0.2em] text-white/25 font-mono">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-white/80 mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
