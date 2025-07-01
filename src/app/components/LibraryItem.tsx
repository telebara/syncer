import React from "react";

interface Video {
  id: number;
  title: string;
  thumb: string;
}

interface LibraryItemProps {
  video: Video;
}

const LibraryItem = ({ video }: LibraryItemProps) => {
  return (
    <div style={{ background: "#181818", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 2px 8px #0002" }}>
      <img src={video.thumb} alt={video.title} width={80} height={80} style={{ borderRadius: 8, marginBottom: 12 }} />
      <div style={{ color: "#fff", fontWeight: 500, fontSize: 16 }}>{video.title}</div>
    </div>
  );
};

export default LibraryItem;
