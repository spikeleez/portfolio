import ParticleBackground from "~/components/ParticleBackground";
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";
import About from "~/components/About";
import Timeline from "~/components/Timeline";
import Skills from "~/components/Skills";
import Projects from "~/components/Projects";
import Fab from "~/components/Fab";
import Footer from "~/components/Footer";
import { projects } from "~/data/projects";
import { fabProducts } from "~/data/fab";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Projects projects={projects} />
        <Fab products={fabProducts} />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
