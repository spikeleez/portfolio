import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.3em] text-white/30 uppercase mb-8">
            About
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-12 leading-tight">
            +6 years of Unreal Engine.
            <br />
            <span className="text-white/40">2 years in the professional industry.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <p className="text-white/50 leading-relaxed">
                I started exploring Unreal Engine in 2018, initially drawn to the
                visual power of Blueprints as a creative outlet. What began
                as a hobby quickly turned into a deep passion. In 2020, I made
                the definitive decision to pursue a professional career with Unreal
                Engine, diving deep into the architecture of Gameplay Systems.
              </p>
              <p className="text-white/50 leading-relaxed">
                My journey into C++ and the Gameplay Ability System (GAS) in 2023 was a
                turning point — I discovered the elegant scalability that GAS
                provides for professional-level projects, and it became the
                foundation of my technical toolkit.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="space-y-6">
              <p className="text-white/50 leading-relaxed">
                In 2024, I joined a professional studio where I developed
                AI systems for enemies, boss encounters, and combat mechanics
                for an Action RPG using GAS and C++. My focus was building
                data-driven and designer-friendly ability systems, empowering the
                design team to iterate on combat dynamics independently.
              </p>
              <p className="text-white/50 leading-relaxed">
                In 2025, I launched my first professional title —{" "}
                <span className="text-white/70 font-medium">
                  Nicktoons & The Dice of Destiny
                </span>{" "}
                — on Steam, PlayStation 5, Nintendo Switch, and Xbox. This experience
                solidified my expertise across the entire development pipeline, from
                prototype to shipping on multiple platforms.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/5">
            {[
              { value: "6+", label: "Years of UE" },
              { value: "2+", label: "Professional Years" },
              { value: "1", label: "Shipped Title" },
              { value: "4", label: "Platforms" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white/80 mb-2">
                  {stat.value}
                </p>
                <p className="text-xs tracking-wider text-white/30 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
