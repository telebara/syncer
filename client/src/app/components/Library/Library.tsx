import React, { useState } from "react";
import { UserVideoDTO } from "../../../types/cards";
import { LibraryItem, MoviePopup } from "../../components";

interface LibraryProps {
  loggedIn: boolean;
  videos: UserVideoDTO[];
}

const Library = ({ loggedIn, videos }: LibraryProps) => {
  const [selected, setSelected] = useState<UserVideoDTO | null>(null);

  return (
    <section>
      <h2
        style={{ color: "#fff", fontSize: 24, fontWeight: 700, marginTop: 32 }}
      >
        Библиотека
      </h2>
      {loggedIn ? (
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
      ) : (
        <div style={{ color: "#aaa", margin: "32px 0", fontSize: 18 }}>
          Библиотека доступна только зарегистрированным пользователям
        </div>
      )}
      {selected && (
        <MoviePopup video={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};

export default Library;
