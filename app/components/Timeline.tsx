import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const timelineData = [
  {
    year: "2018",
    title: "Primeiro Contato",
    description:
      "Descobri a Unreal Engine como hobby, explorando o mundo dos Blueprints e entendendo os fundamentos do engine.",
  },
  {
    year: "2019",
    title: "Aprofundamento",
    description:
      "Comecei a me dedicar com mais seriedade, estudando mecânicas de gameplay e expandindo o conhecimento em Blueprint scripting.",
  },
  {
    year: "2020",
    title: "Decisão Profissional",
    description:
      "Momento decisivo: escolhi seguir carreira com a Unreal Engine. Foco total em Gameplay Systems e arquitetura de jogos.",
  },
  {
    year: "2022",
    title: "Multiplayer & AI",
    description:
      "Iniciei estudos em Multiplayer networking, Behavior Trees para IA e dei os primeiros passos em C++.",
  },
  {
    year: "2023",
    title: "C++ & GAS",
    description:
      "Mergulhei no C++ e no Gameplay Ability System. Descobri o poder da escalabilidade e das soluções profissionais que o GAS proporciona.",
  },
  {
    year: "2024",
    title: "Indústria Profissional",
    description:
      "Ingressei em estúdio profissional. Trabalhei com GAS e Multiplayer Local em Action RPG, desenvolvendo IA de inimigos, bosses e ferramentas para Game Designers.",
  },
  {
    year: "2025",
    title: "Primeiro Título Lançado",
    description:
      "Lancei Nicktoons & The Dice of Destiny na Steam, PS5, Nintendo Switch e Xbox. Experiência completa do protótipo ao shipping multiplataforma.",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.3em] text-white/30 uppercase mb-8">
            Jornada
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-20">
            Do hobby à indústria
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
