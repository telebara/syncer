import { generateRoomCode, UserVideoDTO } from "../../../utils";
import { useRouter } from "next/navigation";
import styles from "./MoviePopup.module.css";

const MoviePopup = ({
  video,
  onClose,
}: {
  video: UserVideoDTO;
  onClose: () => void;
}) => {
  const router = useRouter();

  const handleCreateRoom = () => {
    router.push(`/room/${generateRoomCode()}`);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Закрыть"
        >
          ×
        </button>
        <div className={styles.contentRow}>
          {/* Левая часть: картинка, название, рейтинг */}
          <div className={styles.left}>
            <img
              src={video.thumb}
              alt={video.title}
              className={styles.thumb}
            />
            <div className={styles.title}>{video.title}</div>
            <div className={styles.ratingRow}>
              <span className={styles.rating}>★ {video.rating}</span>
              <span className={styles.ratingCount}>
                ({video.ratingCount} оценок)
              </span>
            </div>
          </div>
          {/* Правая часть: кнопка */}
          <div className={styles.right}>
            <button
              className={styles.createRoomBtn}
              onClick={handleCreateRoom}
            >
              Создать комнату
            </button>
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
};

export default MoviePopup;
