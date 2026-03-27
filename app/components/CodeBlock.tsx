import { useMemo } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  title: string;
}

// Simple C++ syntax highlighter - no external dependencies
function highlightCpp(code: string): string {
  let result = code;

  // Escape HTML first
  result = result
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Order matters: comments first, then strings, then keywords etc.

  // Single-line comments
  result = result.replace(
    /(\/\/[^\n]*)/g,
    '<span style="color: #6a9955;">$1</span>'
  );

  // Multi-line comments
  result = result.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    '<span style="color: #6a9955;">$1</span>'
  );

  // Strings
  result = result.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span style="color: #ce9178;">$1</span>'
  );

  // Preprocessor directives
  result = result.replace(
    /(#\w+)/g,
    '<span style="color: #c586c0;">$1</span>'
  );

  // Numbers
  result = result.replace(
    /\b(\d+\.?\d*f?)\b/g,
    '<span style="color: #b5cea8;">$1</span>'
  );

  // C++ keywords
  const keywords = [
    "void", "int", "float", "double", "bool", "char", "auto", "const",
    "static", "virtual", "override", "class", "struct", "enum", "namespace",
    "public", "private", "protected", "return", "if", "else", "for", "while",
    "do", "switch", "case", "break", "continue", "new", "delete", "nullptr",
    "true", "false", "this", "template", "typename", "typedef", "using",
    "inline", "explicit", "operator", "sizeof", "default", "volatile",
    "mutable", "constexpr", "noexcept", "final", "abstract",
  ];

  const keywordPattern = new RegExp(
    `\\b(${keywords.join("|")})\\b`,
    "g"
  );
  result = result.replace(
    keywordPattern,
    '<span style="color: #569cd6;">$1</span>'
  );

  // UE5 types (T*, U*, A*, F*, E* prefixed)
  result = result.replace(
    /\b([TUAFE][A-Z][a-zA-Z0-9_]*)\b/g,
    '<span style="color: #4ec9b0;">$1</span>'
  );

  // Common UE macros
  const ueMacros = [
    "UPROPERTY", "UFUNCTION", "UCLASS", "USTRUCT", "UENUM",
    "GENERATED_BODY", "INDEX_NONE", "Super",
  ];
  const macroPattern = new RegExp(`\\b(${ueMacros.join("|")})\\b`, "g");
  result = result.replace(
    macroPattern,
    '<span style="color: #dcdcaa;">$1</span>'
  );

  // Function calls: word followed by (
  result = result.replace(
    /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    '<span style="color: #dcdcaa;">$1</span>'
  );

  // Arrow operator and scope resolution
  result = result.replace(
    /(-&gt;|::)/g,
    '<span style="color: #d4d4d4;">$1</span>'
  );

  return result;
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const highlighted = useMemo(() => {
    if (language === "cpp" || language === "c++" || language === "h") {
      return highlightCpp(code);
    }
    // Fallback: just escape HTML
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }, [code, language]);

  return (
    <div
      style={{
        borderRadius: "0.75rem",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        marginBottom: "1rem",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.25rem",
          backgroundColor: "#0d0d0d",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Fake traffic lights */}
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)" }} />
          </div>
          <span
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "0.03em",
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            }}
          >
            {title}
          </span>
        </div>
        <span
          style={{
            fontSize: "10px",
            color: "rgba(255, 255, 255, 0.2)",
            textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.1em",
          }}
        >
          {language}
        </span>
      </div>

      {/* Code area */}
      <div
        style={{
          backgroundColor: "#0a0a0a",
          padding: "1.25rem",
          overflowX: "auto",
        }}
      >
        <pre style={{ margin: 0 }}>
          <code
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
              fontSize: "13px",
              lineHeight: "1.7",
              whiteSpace: "pre",
              color: "rgba(255, 255, 255, 0.65)",
            }}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    </div>
  );
}
