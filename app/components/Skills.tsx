import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const skillCategories = [
  {
    title: "Core",
    skills: [
      { name: "C++", level: 85 },
      { name: "Blueprints", level: 95 },
      { name: "Unreal Engine 5", level: 90 },
    ],
  },
  {
    title: "Gameplay Systems",
    skills: [
      { name: "Gameplay Ability System (GAS)", level: 90 },
      { name: "Gameplay Features / Modular Gameplay", level: 85 },
      { name: "Behavior Trees & AI", level: 80 },
    ],
  },
  {
    title: "Networking",
    skills: [
      { name: "Multiplayer Replication", level: 85 },
      { name: "Dedicated Server", level: 75 },
      { name: "Local Multiplayer", level: 90 },
    ],
  },
  {
    title: "Tools & Pipeline",
    skills: [
      { name: "Git / GitHub", level: 85 },
      { name: "Tortoise SVN", level: 80 },
      { name: "Otimização & Escalabilidade", level: 80 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.3em] text-white/30 uppercase mb-8">
            Skills
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-20">
            Tecnologias & Especialidades
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal key={category.title} delay={catIndex * 0.1}>
              <div>
                <h3 className="text-xs tracking-[0.2em] text-white/30 uppercase mb-6">
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-white/60">{skill.name}</span>
                        <span className="text-xs text-white/25 font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/10 relative overflow-hidden rounded-full">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-white/25 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: catIndex * 0.1 + skillIndex * 0.1,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
