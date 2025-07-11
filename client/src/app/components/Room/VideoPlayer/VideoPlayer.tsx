"use client"

import { useEffect, useRef, useState } from "react";
import { findStreamableFile, formatFileSize } from "@/utils/room";
import styles from "./VideoPlayer.module.css";

type VideoPlayerProps = {
  magnetUrl: string;
  cardName: string;
};

const VideoPlayer = ({ magnetUrl, cardName }: VideoPlayerProps) => {
  const [torrentName, setTorrentName] = useState("");
  const [torrentInfoHash, setTorrentInfoHash] = useState("");
  const [torrentProgress, setTorrentProgress] = useState("");
  const [downloadSpeed, setDownloadSpeed] = useState("-");
  const [isLoading, setIsLoading] = useState(true);
  const clientRef = useRef<any>(null);

  useEffect(() => {
    if (!magnetUrl || !window.WebTorrent) return;

    if (clientRef.current) {
      clientRef.current.destroy();
    }

    setIsLoading(true);
    const client = new window.WebTorrent();
    clientRef.current = client;

    client.on('error', (err: string | Error) => {
      console.log('Webtorrent error: ' + (err instanceof Error ? err.message : err));
      setIsLoading(false);
    });

    client.add(magnetUrl, (torrent: any) => {
      torrent.on('download', (bytes: number) => {
        const speedBytes = torrent.downloadSpeed;
        const downloadSpeedFormatted = formatFileSize(speedBytes) + "/s";

        setTorrentProgress((torrent.progress * 100).toFixed(1) + '%');
        setDownloadSpeed(downloadSpeedFormatted);
      });

      torrent.on('done', () => {
        console.log('DONE');
        setDownloadSpeed("-");
      });

      setTorrentInfoHash(torrent.infoHash);
      setTorrentName(torrent.name);
      setIsLoading(false);

      const file = findStreamableFile(torrent.files);

      if (file) {
        try {
          file.renderTo('video#player', { autoplay: true, controls: true }, (err: any, elem: any) => {
            if (err) console.log('Error: ', err);
          });
        } catch (err) {
          console.log(err);
        }
      }
    });

    return () => {
      if (clientRef.current) {
        clientRef.current.destroy();
        clientRef.current = null;
      }
    };
  }, [magnetUrl]);

  return (
    <div className={styles.container}>
      <div className={styles.playerContainer}>
        <div className={styles.videoContainer}>
          <video
            id="player"
            className={styles.video}
            style={{ width: '100%', height: '100%', background: '#000' }}
          />
        </div>

        {/* Мета-информация с загрузкой */}
        <div className={styles.metaInfoContainer}>
          <div className={styles.metaTitle}>
            <span className={styles.metaIcon}>🎬</span>
            Информация о торренте
          </div>

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Название:</div>
              <div className={styles.metaValue}>
                {isLoading ? (
                  <div className={styles.skeleton}></div>
                ) : (
                  cardName || torrentName || "Неизвестно"
                )}
              </div>
            </div>

            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Info Hash:</div>
              <div className={styles.metaValue}>
                {isLoading ? (
                  <div className={styles.skeleton}></div>
                ) : (
                  torrentInfoHash ? (
                    <span className={styles.hashValue}>{torrentInfoHash}</span>
                  ) : (
                    "Загрузка..."
                  )
                )}
              </div>
            </div>

            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Прогресс:</div>
              <div className={styles.metaValue}>
                {isLoading ? (
                  <div className={styles.skeleton}></div>
                ) : (
                  <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: torrentProgress || '0%' }}
                      ></div>
                    </div>
                    <span className={styles.progressText}>
                      {torrentProgress || "0%"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Скорость:</div>
              <div className={styles.metaValue}>
                {isLoading ? (
                  <div className={styles.skeleton}></div>
                ) : (
                  <span className={styles.speedValue}>
                    {downloadSpeed !== "-" ? `⬇️ ${downloadSpeed}` : "Завершено"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
