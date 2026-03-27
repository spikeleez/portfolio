import { useState } from "react";

interface VideoPlayerProps {
  url: string;
  title: string;
  thumbnail?: string;
}

/**
 * Extracts a YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 */
function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.+&v=)([^&]+)/,
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
    /youtube\.com\/v\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Checks if URL is a direct video file (.mp4, .webm, .ogg)
 */
function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

/**
 * Extracts Vimeo video ID
 */
function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export default function VideoPlayer({ url, title, thumbnail }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const youtubeId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);
  const isDirect = isDirectVideo(url);

  // If we have a thumbnail but haven't clicked play yet, show thumbnail with play button
  const showThumbnail = thumbnail && !isPlaying && !hasError;

  // Generate YouTube thumbnail if none provided
  const displayThumb = thumbnail || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : "");

  if (hasError) {
    return (
      <div
        style={{
          aspectRatio: "16/9",
          backgroundColor: "#080808",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.4)",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "0.5rem",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)";
          }}
        >
          Assistir no site original
        </a>
      </div>
    );
  }

  // YouTube embed
  if (youtubeId) {
    if (showThumbnail || (!isPlaying && displayThumb)) {
      return (
        <div
          style={{
            aspectRatio: "16/9",
            backgroundColor: "#080808",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={displayThumb}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
            onError={(e) => {
              // Fallback to hqdefault if maxresdefault fails
              const img = e.target as HTMLImageElement;
              if (img.src.includes("maxresdefault")) {
                img.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
              }
            }}
          />
          {/* Dark overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            transition: "background-color 0.3s ease",
          }} />
          {/* Play button */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: "72px", height: "72px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s ease",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          {/* YouTube badge */}
          <div style={{
            position: "absolute", bottom: "1rem", right: "1rem",
            display: "flex", alignItems: "center", gap: "0.4rem",
            padding: "0.3rem 0.6rem",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: "0.4rem",
            backdropFilter: "blur(4px)",
          }}>
            <svg width="16" height="12" viewBox="0 0 24 18" fill="#ff0000">
              <path d="M23.5 3.5a3 3 0 00-2.1-2.1C19.5.9 12 .9 12 .9s-7.5 0-9.4.5A3 3 0 00.5 3.5 31.4 31.4 0 000 9a31.4 31.4 0 00.5 5.5 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31.4 31.4 0 0024 9a31.4 31.4 0 00-.5-5.5z"/>
              <path d="M9.6 12.5V5.5l6.3 3.5-6.3 3.5z" fill="#fff"/>
            </svg>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>YouTube</span>
          </div>
        </div>
      );
    }

    return (
      <div style={{ aspectRatio: "16/9", backgroundColor: "#080808" }}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          style={{ width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Vimeo embed
  if (vimeoId) {
    return (
      <div style={{ aspectRatio: "16/9", backgroundColor: "#080808" }}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=0&title=0&byline=0&portrait=0`}
          style={{ width: "100%", height: "100%", border: "none" }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  // Direct video file (.mp4, .webm, etc.)
  if (isDirect) {
    return (
      <div style={{ aspectRatio: "16/9", backgroundColor: "#080808" }}>
        <video
          src={url}
          controls
          playsInline
          preload="metadata"
          poster={thumbnail || undefined}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={() => setHasError(true)}
        >
          Seu navegador não suporta vídeo HTML5.
        </video>
      </div>
    );
  }

  // Unknown source - try iframe as last resort, with fallback link
  return (
    <div style={{ aspectRatio: "16/9", backgroundColor: "#080808", position: "relative" }}>
      <iframe
        src={url}
        style={{ width: "100%", height: "100%", border: "none" }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
