import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer id="contact" className="relative py-32 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.3em] text-white/30 uppercase mb-8">
            Contact
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-6">
            Let's work together?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-white/40 max-w-lg mb-12 leading-relaxed">
            I'm always open to new opportunities and challenging projects.
            If you're looking for a Gameplay Programmer with expertise in C++, GAS, and
            Multiplayer, let's talk.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-4 mb-20">
            <a
              href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWtVcJRdmVZXCNDWslhlKPTtKxzWVtWcndbDnjWLZrZmHKHjhLDfjrqDrcPMdZTcvwgvNlrVb"
              className="px-6 py-3 border border-white/20 text-white/70 text-sm tracking-wider hover:bg-white/5 hover:border-white/40 transition-all duration-300 rounded-xl"
            >
              EMAIL
            </a>
            <a
              href="https://github.com/spikeleez"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/10 text-white/50 text-sm tracking-wider hover:bg-white/5 hover:border-white/30 hover:text-white/70 transition-all duration-300 rounded-xl"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/cauamattos"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/10 text-white/50 text-sm tracking-wider hover:bg-white/5 hover:border-white/30 hover:text-white/70 transition-all duration-300 rounded-xl"
            >
              LINKEDIN
            </a>
          </div>
        </ScrollReveal>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Spike. All rights reserved.
          </p>
          <p className="text-xs text-white/15">
            Unreal Engine 5 &middot; C++ &middot; Multiplayer
          </p>
        </div>
      </div>
    </footer>
  );
}
