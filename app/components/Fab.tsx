import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import ProjectModal from "./ProjectModal";
import ProjectCard from "./ProjectCard";

interface FabProduct {
  id: string;
  title: string;
  summary: string;
  description: string;
  documentation: string;
  thumbnail: string;
  video: string;
  tags: string[];
  githubUrl: string;
  storeUrl: string;
  downloadUrl: string;
  codeSnippets: { title: string; language: string; code: string }[];
  features: string[];
  links: { label: string; url: string }[];
}

interface FabProps {
  products: FabProduct[];
}

export default function Fab({ products }: FabProps) {
  const [selected, setSelected] = useState<FabProduct | null>(null);

  return (
    <section id="fab" className="relative py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-sm tracking-[0.3em] text-white/30 uppercase mb-8">
            Fab Store
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-4">
            Marketplace Products
          </h2>
          <p className="text-white/35 mb-20 max-w-lg">
            A selection of professional tools and assets available on the Fab marketplace, 
            designed to accelerate development with high-quality systems.
          </p>
        </ScrollReveal>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.08}>
              <ProjectCard
                project={product}
                onClick={() => setSelected(product)}
              />
            </ScrollReveal>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.2)" }}>
              No products found. Add products to the fab.ts file.
            </p>
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
