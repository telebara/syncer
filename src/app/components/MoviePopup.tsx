import { UserVideoDTO } from "../../utils";

const MoviePopup = ({
  video,
  onClose,
}: {
  video: UserVideoDTO;
  onClose: () => void;
}) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.65)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        background: "#222",
        borderRadius: 18,
        padding: 32,
        minWidth: 320,
        maxWidth: 420,
        width: "90vw",
        color: "#fff",
        position: "relative",
        boxShadow: "0 8px 32px #000a",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: 28,
          cursor: "pointer",
        }}
        aria-label="Закрыть"
      >
        ×
      </button>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
        {video.title}
      </h2>
      <img
        src={video.thumb}
        alt={video.title}
        style={{ width: "100%", borderRadius: 12, marginBottom: 16 }}
      />
      <div style={{ color: "#bbb", fontSize: 15, marginBottom: 16 }}>
        {video.description}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            background: "#222",
            color: "#ffd700",
            borderRadius: 8,
            padding: "2px 8px",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          ★ {video.rating}
        </span>
        <span style={{ color: "#888", fontSize: 13 }}>
          ({video.ratingCount} оценок)
        </span>
      </div>
      <button
        style={{
          marginTop: 12,
          padding: "12px 0",
          borderRadius: 16,
          background: "linear-gradient(90deg, #a78bfa 60%, #6366f1 100%)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          textAlign: "center",
          border: "none",
          cursor: "pointer",
          width: "100%",
          boxShadow: "0 2px 8px #0002",
          transition: "background 0.2s, color 0.2s",
        }}
      >
        Создать комнату
      </button>
    </div>
  </div>
);

export default MoviePopup;
