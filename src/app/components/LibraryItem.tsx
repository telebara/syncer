import React from "react";
import { TAGS, truncateLongString, UserVideoDTO } from "../../utils";

interface LibraryItemProps {
  video: UserVideoDTO;
}

const LibraryItem = ({ video }: LibraryItemProps) => {
  const maxTitle = 22;
  const maxDesc = 60;
  const showTitleTooltip = video.title.length > maxTitle;
  const showDescTooltip = video.description.length > maxDesc;

  return (
    <div
      style={{
        background: "#181818",
        borderRadius: 20,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        boxShadow: "0 2px 16px #0003",
        minWidth: 0,
        maxWidth: 320,
        width: "100%",
        gap: 12,
        position: "relative",
      }}
    >
      <img
        src={video.thumb}
        alt={video.title}
        style={{
          width: "100%",
          height: 160,
          objectFit: "cover",
          borderRadius: 14,
          marginBottom: 10,
          background: "#222",
        }}
      />
      <div
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 4,
          textShadow: "0 1px 4px #0006",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={showTitleTooltip ? video.title : undefined}
      >
        {truncateLongString(video.title, maxTitle)}
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
        {video.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: TAGS[tag].bg,
              color: TAGS[tag].color,
              borderRadius: 8,
              padding: "2px 10px",
              fontSize: 13,
              fontWeight: 500,
              border: `1px solid ${TAGS[tag].color}`,
              letterSpacing: 0.2,
              minWidth: 0,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div
        style={{
          color: "#bbb",
          fontSize: 14,
          marginBottom: 8,
          minHeight: 36,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "pre-line",
        }}
        title={showDescTooltip ? video.description : undefined}
      >
        {truncateLongString(video.description, maxDesc)}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
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
    </div>
  );
};

export default LibraryItem;
