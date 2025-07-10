import React, { useState } from "react";
import { CardDTO } from "../../../types/cards";
import { LibraryItem, ViewCardPopup } from "../../components";

interface LibraryProps {
  videos: CardDTO[];
  onCardDeleted?: () => void;
}

const Library = ({ videos, onCardDeleted }: LibraryProps) => {
  const [selected, setSelected] = useState<CardDTO | null>(null);

  const handleCardDeleted = () => {
    onCardDeleted?.();
    setSelected(null);
  };

  return (
    <section>
      <h2
        style={{ color: "#fff", fontSize: 24, fontWeight: 700, marginTop: 32 }}
      >
        Библиотека
      </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            width: "100%",
            maxWidth: 1200,
            margin: "32px auto",
          }}
        >
          {videos.map((video) => (
            <LibraryItem
              key={video.id}
              video={video}
              onClick={() => setSelected(video)}
            />
        ))}
      </div>
      {selected && (
        <ViewCardPopup
          card={selected}
          onClose={() => setSelected(null)}
          onDelete={handleCardDeleted}
        />
      )}
    </section>
  );
};

export default Library;
