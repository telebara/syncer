import React from "react";
import LibraryItem from "./LibraryItem";

interface Video {
  id: number;
  title: string;
  thumb: string;
}

interface LibraryProps {
  loggedIn: boolean;
  videos: Video[];
}

const Library = ({ loggedIn, videos }: LibraryProps) => {
  return (
    <section>
      <h2 style={{ color: "#fff", marginTop: 32, fontSize: 24, fontWeight: 700 }}>Библиотека</h2>
      {loggedIn ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24, width: "100%", maxWidth: 600, margin: "32px auto" }}>
          {videos.map((video) => (
            <LibraryItem key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div style={{ color: "#aaa", margin: "32px 0", fontSize: 18 }}>
          Библиотека доступна только зарегистрированным пользователям
        </div>
      )}
    </section>
  );
};

export default Library;
