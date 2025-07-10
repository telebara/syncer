import React, { useState, useMemo } from "react";
import { CardDTO } from "../../../types/cards";
import { LibraryItem, ViewCardPopup, AddTagsPopup } from "../../components";

interface LibraryProps {
  videos: CardDTO[];
  onCardDeleted?: () => void;
}

const Library = ({ videos, onCardDeleted }: LibraryProps) => {
  const [selected, setSelected] = useState<CardDTO | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [addTagsCard, setAddTagsCard] = useState<CardDTO | null>(null);

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;

    return videos.filter(video =>
      video.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [videos, searchQuery]);

  const handleCardDeleted = () => {
    onCardDeleted?.();
    setSelected(null);
  };

  const handleAddTags = (card: CardDTO) => {
    setAddTagsCard(card);
  };

  const handleAddTagsSuccess = () => {
    onCardDeleted?.();
  };

  return (
    <section>
      <h2
        style={{ color: "#fff", fontSize: 24, fontWeight: 700, marginTop: 32 }}
      >
        Библиотека
      </h2>

      <div style={{ marginBottom: 36, marginTop: 12 }}>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: 400,
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid #333",
            background: "#181818",
            color: "#fff",
            fontSize: 16,
            outline: "none",
          }}
        />
      </div>

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
        {filteredVideos.map((video) => (
          <LibraryItem
            key={video.id}
            video={video}
            onClick={() => setSelected(video)}
            onAddTags={handleAddTags}
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
      {addTagsCard && (
        <AddTagsPopup
          card={addTagsCard}
          onClose={() => setAddTagsCard(null)}
          onSuccess={handleAddTagsSuccess}
        />
      )}
    </section>
  );
};

export default Library;
