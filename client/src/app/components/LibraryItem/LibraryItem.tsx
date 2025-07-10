import React from "react";
import { TAGS, truncateLongString } from "../../../utils/common";
import { CardDTO } from "../../../types/cards";
import { TagType } from "../../../types/tags";

interface LibraryItemProps {
  video: CardDTO;
  onClick?: () => void;
  onAddTags?: (card: CardDTO) => void;
}

const LibraryItem = ({ video, onClick, onAddTags }: LibraryItemProps) => {
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
              background: tag.color + '22',
              color: tag.color,
              borderRadius: 6,
              padding: "2px 8px",
              fontSize: 12,
              fontWeight: 500,
              border: `1px solid ${tag.color}`,
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <div
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            textShadow: "0 1px 4px #0006",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flex: 1,
          }}
          title={showTitleTooltip ? video.name : undefined}
        >
          {truncateLongString(video.name, maxTitle)}
        </div>
        {hover && onAddTags && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddTags(video);
            }}
            style={{
              background: "#a78bfa",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 8,
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#8b5cf6"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#a78bfa"}
          >
            +
          </button>
        )}
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
