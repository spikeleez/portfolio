import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CodeBlock from "./CodeBlock";
import VideoPlayer from "./VideoPlayer";

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

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ModalContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      {/* BACKDROP - 100% opaque black, covers EVERYTHING */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000000",
          zIndex: 99998,
        }}
      />

      {/* SCROLLABLE MODAL LAYER */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 99999,
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "3rem 1rem",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* MODAL CARD */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "52rem",
            backgroundColor: "#0f0f0f",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "1.5rem",
            overflow: "hidden",
            boxShadow: "0 30px 100px rgba(0, 0, 0, 0.9)",
            flexShrink: 0,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              zIndex: 10,
              width: "2.5rem",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              borderRadius: "50%",
              color: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
            }}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          {/* Thumbnail / Video */}
          {project.video ? (
            <VideoPlayer url={project.video} title={project.title} thumbnail={project.thumbnail} />
          ) : project.thumbnail ? (
            <div style={{ aspectRatio: "16/9", backgroundColor: "#080808", position: "relative", overflow: "hidden" }}>
              <img
                src={project.thumbnail}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                background: "linear-gradient(to top, #0f0f0f 0%, transparent 100%)",
              }} />
            </div>
          ) : (
            <div style={{
              aspectRatio: "16/9", backgroundColor: "#080808",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.08)", letterSpacing: "0.15em" }}>NO PREVIEW AVAILABLE</span>
            </div>
          )}

          {/* Body */}
          <div style={{ padding: "2.5rem" }}>
            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  padding: "0.3rem 0.85rem", fontSize: "10px", letterSpacing: "0.08em",
                  textTransform: "uppercase", border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.45)", borderRadius: "999px",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: "1.75rem", fontWeight: 700,
              color: "rgba(255, 255, 255, 0.93)", marginBottom: "1rem", lineHeight: 1.3,
            }}>
              {project.title}
            </h2>

            {/* Description */}
            <p style={{
              color: "rgba(255, 255, 255, 0.5)", lineHeight: "1.85",
              fontSize: "0.95rem", marginBottom: "2rem",
            }}>
              {project.description}
            </p>

            {/* Features */}
            {project.features.length > 0 && (
              <div style={{ marginBottom: "2.5rem" }}>
                <h3 style={{
                  fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.3)", marginBottom: "1.25rem",
                }}>
                  Highlights
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.07 }}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: "0.75rem",
                        fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.48)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <span style={{
                        width: 6, height: 6, borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.18)",
                        marginTop: "0.45rem", flexShrink: 0,
                      }} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Code Snippets */}
            {project.codeSnippets.length > 0 && (
              <div style={{ marginBottom: "2.5rem" }}>
                <h3 style={{
                  fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.3)", marginBottom: "1.25rem",
                }}>
                  Code Snippets
                </h3>
                {project.codeSnippets.map((snippet, i) => (
                  <CodeBlock key={i} code={snippet.code} language={snippet.language} title={snippet.title} />
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "0.75rem",
              paddingTop: "1.5rem", borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            }}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.75rem 1.5rem", fontSize: "13px", letterSpacing: "0.06em",
                    border: "1px solid rgba(255, 255, 255, 0.15)", color: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "0.75rem", backgroundColor: "rgba(255, 255, 255, 0.04)",
                    textDecoration: "none", transition: "all 0.3s ease", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.95)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  SOURCE CODE
                </a>
              )}
              {project.storeUrl && (
                <a href={project.storeUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.75rem 1.5rem", fontSize: "13px", letterSpacing: "0.06em",
                    border: "1px solid rgba(255, 255, 255, 0.1)", color: "rgba(255, 255, 255, 0.5)",
                    borderRadius: "0.75rem", backgroundColor: "transparent",
                    textDecoration: "none", transition: "all 0.3s ease", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                  }}
                >
                  VIEW ON STORE
                </a>
              )}
              {project.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.75rem 1.5rem", fontSize: "13px", letterSpacing: "0.06em",
                    border: "1px solid rgba(255, 255, 255, 0.1)", color: "rgba(255, 255, 255, 0.5)",
                    borderRadius: "0.75rem", backgroundColor: "transparent",
                    textDecoration: "none", transition: "all 0.3s ease", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                  }}
                >
                  {link.label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Use createPortal to render DIRECTLY in document.body
  // This escapes ALL parent stacking contexts
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {project && <ModalContent project={project} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}
