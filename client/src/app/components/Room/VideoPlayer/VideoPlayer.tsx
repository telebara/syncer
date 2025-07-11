"use client"

import { useEffect, useRef, useState } from "react";
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
  const clientRef = useRef<any>(null);

  useEffect(() => {
    if (!magnetUrl || !window.WebTorrent) return;

    if (clientRef.current) {
      clientRef.current.destroy();
    }

    const client = new window.WebTorrent();
    clientRef.current = client;

    client.on('error', (err: string | Error) => {
      console.log('Webtorrent error: ' + (err instanceof Error ? err.message : err));
    });

    client.add(magnetUrl, (torrent: any) => {
      torrent.on('download', (bytes: number) => {
        const speedBytes = torrent.downloadSpeed;
        const downloadSpeedFormatted = (speedBytes > (1024 * 1024))
          ? (speedBytes / (1024 * 1024)).toFixed(1) + " MB/s"
          : (speedBytes / 1024).toFixed(1) + " KB/s";

        setTorrentProgress((torrent.progress * 100).toFixed(1) + '%');
        setDownloadSpeed(downloadSpeedFormatted);
      });

      torrent.on('done', () => {
        console.log('DONE');
        setDownloadSpeed("-");
      });

      setTorrentInfoHash(torrent.infoHash);
      setTorrentName(torrent.name);

      const file = torrent.files.find((file: any) => {
        return file.name.endsWith('.mp4');
      });

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
        <div className={styles.torrentInfo}>
          <div>🎬 {cardName || torrentName}</div>
          {torrentInfoHash && <div><b>Info Hash:</b> {torrentInfoHash}</div>}
          {torrentProgress && <div><b>Progress:</b> {torrentProgress}</div>}
          {downloadSpeed && <div><b>Speed:</b> {downloadSpeed}</div>}
        </div>

        <div className={styles.videoContainer}>
          <video
            id="player"
            className={styles.video}
            style={{ width: '100%', height: '100%', background: '#000' }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
