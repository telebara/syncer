import React from "react";
import { TAGS, truncateLongString } from "../../../utils/common";
import { CardDTO } from "../../../types/cards";
import { TagType } from "../../../types/tags";

interface LibraryItemProps {
  video: CardDTO;
  onClick?: () => void;
}

const LibraryItem = ({ video, onClick }: LibraryItemProps) => {
  const maxTitle = 22;
  const maxDesc = 60;
  const showTitleTooltip = video.name.length > maxTitle;
  const showDescTooltip = (video.description || '').length > maxDesc;

  const [hover, setHover] = React.useState(false);

  const renderTags = () => {
    if (video.tags.length === 0) return null;

    const tagsToShow = video.tags.slice(0, 2);
    const hasMoreTags = video.tags.length > 2;

    return (
      <div style={{ display: "flex", gap: 4, marginBottom: 4, flexWrap: "wrap" }}>
        {tagsToShow.map((tag) => (
          <span
            key={tag.id}
            style={{
              background: TAGS[tag.name as TagType]?.bg || '#1e293b',
              color: TAGS[tag.name as TagType]?.color || '#3b82f6',
              borderRadius: 6,
              padding: "2px 8px",
              fontSize: 12,
              fontWeight: 500,
              border: `1px solid ${TAGS[tag.name as TagType]?.color || '#3b82f6'}`,
              letterSpacing: 0.2,
              minWidth: 0,
            }}
          >
            {tag.name}
          </span>
        ))}
        {hasMoreTags && (
          <span
            style={{
              background: "#333",
              color: "#888",
              borderRadius: 6,
              padding: "2px 6px",
              fontSize: 12,
              fontWeight: 500,
              border: "1px solid #555",
              letterSpacing: 0.2,
            }}
          >
            ...
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        background: "#181818",
        borderRadius: 16,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        boxShadow: "0 2px 16px #0003",
        minWidth: 0,
        maxWidth: 280,
        width: "100%",
        gap: 10,
        position: "relative",
        border: hover ? "2px solid #a78bfa" : "2px solid transparent",
        cursor: "pointer",
        transition: "border 0.18s",
      }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={video.image_url || '/file.svg'}
        alt={video.name}
        style={{
          width: "100%",
          height: 280,
          objectFit: "cover",
          borderRadius: 12,
          marginBottom: 8,
          background: "#222",
        }}
      />
      <div
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          marginBottom: 4,
          textShadow: "0 1px 4px #0006",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={showTitleTooltip ? video.name : undefined}
      >
        {truncateLongString(video.name, maxTitle)}
      </div>
      {renderTags()}
      <div
        style={{
          color: "#bbb",
          fontSize: 13,
          marginBottom: 6,
          minHeight: 32,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "pre-line",
        }}
        title={showDescTooltip ? video.description : undefined}
      >
        {truncateLongString(video.description || 'Описание отсутствует', maxDesc)}
      </div>
    </div>
  );
};

export default LibraryItem;
