import type { WebTorrent } from 'webtorrent';

declare global {
  interface Window {
    WebTorrent?: WebTorrent;
  }
}

// Расширяем типы для поддержки streamTo и loadWorker
declare module 'webtorrent' {
  interface Instance {
    loadWorker?: () => Promise<void>;
  }

  interface TorrentFile {
    streamTo?: (elem: HTMLVideoElement | HTMLAudioElement, callback?: (err?: Error) => void) => void;
  }
}

export {};
