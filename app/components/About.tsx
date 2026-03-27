import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.3em] text-white/30 uppercase mb-8">
            Sobre
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-12 leading-tight">
            +6 anos de Unreal Engine.
            <br />
            <span className="text-white/40">2 anos na indústria profissional.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <p className="text-white/50 leading-relaxed">
                Comecei a explorar a Unreal Engine em 2018, inicialmente atraído pelo
                poder visual dos Blueprints como uma válvula criativa. O que começou
                como hobby rapidamente se transformou em uma paixão profunda. Em 2020,
                tomei a decisão definitiva de seguir carreira profissional com a Unreal
                Engine, mergulhando fundo na arquitetura de Gameplay Systems.
              </p>
              <p className="text-white/50 leading-relaxed">
                Minha jornada no C++ e no Gameplay Ability System (GAS) em 2023 foi um
                ponto de virada — descobri a escalabilidade elegante que o GAS
                proporciona para projetos de nível profissional, e ele se tornou a
                base do meu toolkit técnico.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="space-y-6">
              <p className="text-white/50 leading-relaxed">
                Em 2024, ingressei em um estúdio profissional onde desenvolvi
                sistemas de IA para inimigos, boss encounters e mecânicas de combate
                para um Action RPG utilizando GAS e C++. Meu foco foi construir
                ability systems data-driven e designer-friendly, capacitando a equipe
                de design a iterar na dinâmica de combate de forma independente.
              </p>
              <p className="text-white/50 leading-relaxed">
                Em 2025, lancei meu primeiro título profissional —{" "}
                <span className="text-white/70 font-medium">
                  Nicktoons & The Dice of Destiny
                </span>{" "}
                — na Steam, PlayStation 5, Nintendo Switch e Xbox. Essa experiência
                consolidou minha expertise em todo o pipeline de desenvolvimento, do
                protótipo ao shipping em múltiplas plataformas.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/5">
            {[
              { value: "6+", label: "Anos de UE" },
              { value: "2+", label: "Anos Profissional" },
              { value: "1", label: "Título Lançado" },
              { value: "4", label: "Plataformas" },
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
