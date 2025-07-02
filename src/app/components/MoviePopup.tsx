import { generateRoomCode, UserVideoDTO } from "../../utils";

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
        minWidth: 340,
        maxWidth: 700,
        width: "95vw",
        color: "#fff",
        position: "relative",
        boxShadow: "0 8px 32px #000a",
        display: "flex",
        flexDirection: "column",
        gap: 24,
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

      <div style={{ display: "flex", flexDirection: "row", gap: 32 }}>
        {/* Левая часть: картинка, название, рейтинг */}
        <div
          style={{
            minWidth: 180,
            maxWidth: 240,
            flex: "0 0 220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={video.thumb}
            alt={video.title}
            style={{
              width: "100%",
              maxWidth: 220,
              height: "auto",
              maxHeight: 320,
              borderRadius: 12,
              marginBottom: 18,
              objectFit: "cover",
              background: "#181818",
            }}
          />
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            {video.title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                background: "#222",
                color: "#ffd700",
                borderRadius: 8,
                padding: "2px 8px",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              ★ {video.rating}
            </span>
            <span style={{ color: "#888", fontSize: 14 }}>
              ({video.ratingCount} оценок)
            </span>
          </div>
        </div>

        {/* Правая часть: кнопка */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <a
            style={{
              padding: "16px 36px",
              borderRadius: 16,
              background: "linear-gradient(90deg, #a78bfa 60%, #6366f1 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              textAlign: "center",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px #0002",
              transition: "background 0.2s, color 0.2s",
              minWidth: 220,
            }}
            href={`/room/${generateRoomCode()}`}
          >
            Создать комнату
          </a>
        </div>
      </div>

      {/* <div
        style={{
          color: "#bbb",
          fontSize: 16,
          margin: "0 0 8px 0",
          textAlign: "left",
        }}
      >
        {video.description}
      </div> */}
    </div>
  </div>
);

export default MoviePopup;
