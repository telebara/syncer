"use client";

import { useEffect, useState, ReactNode } from "react";
import Script from "next/script";

type WebTorrentLoaderProps = {
  children: ReactNode;
};

const WebTorrentLoader = ({ children }: WebTorrentLoaderProps) => {
  const [isWebTorrentReady, setIsWebTorrentReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.WebTorrent) {
      setIsWebTorrentReady(true);
    }
  }, []);

  const handleWebTorrentLoad = () => {
    setIsWebTorrentReady(true);
  };

  const handleWebTorrentError = () => {
    console.error('Failed to load WebTorrent');
  };

  if (!isWebTorrentReady) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <Script
          src="https://cdn.jsdelivr.net/npm/webtorrent@1.8.0/webtorrent.min.js"
          strategy="lazyOnload"
          onLoad={handleWebTorrentLoad}
          onError={handleWebTorrentError}
        />
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid #333',
          borderTop: '3px solid #666',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <div style={{ color: '#666' }}>Загрузка WebTorrent...</div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
};

export default WebTorrentLoader;
