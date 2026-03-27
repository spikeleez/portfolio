import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";

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

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.button
      ref={cardRef}
      className="group w-full text-left relative"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: "1.25rem",
        cursor: "pointer",
      }}
    >
      {/* Card container with proper overflow */}
      <div
        className="relative w-full h-full"
        style={{
          backgroundColor: "#111111",
          border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.06)"}`,
          borderRadius: "1.25rem",
          overflow: "hidden",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          boxShadow: isHovered
            ? "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03)"
            : "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Mouse glow effect */}
        <div
          className="absolute pointer-events-none z-[1]"
          style={{
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Border glow effect following mouse */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            borderRadius: "1.25rem",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.03), transparent 40%)`,
          }}
        />

        {/* Thumbnail - extra 4px height to eliminate seam line */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            backgroundColor: "#111111",
            overflow: "hidden",
            marginBottom: "-4px",
          }}
        >
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "calc(100% + 4px)",
                objectFit: "cover",
                transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                opacity: isHovered ? 0.9 : 0.6,
                transform: isHovered ? "scale(1.06)" : "scale(1)",
                transformOrigin: "center center",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "#0a0a0a",
            }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.08)" }}>
                Preview
              </span>
            </div>
          )}

          {/* Bottom gradient - blends into card bg */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              background: "linear-gradient(to top, #111111 2%, rgba(17, 17, 17, 0.5) 40%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Hover overlay - "Ver Detalhes" pill */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              transition: "opacity 0.4s ease, background-color 0.4s ease",
              opacity: isHovered ? 1 : 0,
              backgroundColor: isHovered ? "rgba(0, 0, 0, 0.15)" : "transparent",
            }}
          >
            <motion.span
              initial={false}
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "0.625rem 1.25rem",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.85)",
                backgroundColor: "rgba(0, 0, 0, 0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: "999px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              View Details
            </motion.span>
          </div>
        </div>

        {/* Card body - relative to sit on top of the overlapping thumbnail */}
        <div className="p-6" style={{ position: "relative", zIndex: 3, backgroundColor: "#111111" }}>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-wider uppercase px-2.5 py-1"
                style={{
                  color: "rgba(255, 255, 255, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span
                className="text-[9px] tracking-wider px-1"
                style={{ color: "rgba(255, 255, 255, 0.2)" }}
              >
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-base font-semibold mb-2 transition-colors duration-300"
            style={{
              color: isHovered ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.82)",
            }}
          >
            {project.title}
          </h3>

          {/* Summary */}
          <p
            className="text-xs line-clamp-2"
            style={{
              color: "rgba(255, 255, 255, 0.38)",
              lineHeight: "1.7",
            }}
          >
            {project.summary}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
