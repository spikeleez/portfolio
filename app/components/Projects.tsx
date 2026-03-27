import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import ProjectModal from "./ProjectModal";
import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  thumbnail: string;
  video: string;
  tags: string[];
  githubUrl: string;
  storeUrl: string;
  codeSnippets: { title: string; language: string; code: string }[];
  features: string[];
  links: { label: string; url: string }[];
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.3em] text-white/30 uppercase mb-8">
            Projetos
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-4">
            Trabalhos & Experimentos
          </h2>
          <p className="text-white/35 mb-20 max-w-lg">
            Uma seleção de projetos que demonstram minhas capacidades com
            Unreal Engine 5, C++, GAS e Multiplayer.
          </p>
        </ScrollReveal>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08}>
              <ProjectCard
                project={project}
                onClick={() => setSelected(project)}
              />
            </ScrollReveal>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.2)" }}>
              Nenhum projeto encontrado. Adicione projetos ao arquivo projects.json.
            </p>
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
