export const formatRoomCode = (code: string) => {
  if (!code) return "";
  const up = code.replace(/[^A-Z0-9]/gi, "").toUpperCase();
  return up.length > 4 ? `${up.slice(0, 4)}-${up.slice(4, 8)}` : up;
};

export const generateRoomCode = (): string => {
  const part = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${part()}-${part()}`;
};

export const STREAMING_EXTENSIONS = [
  '.mp4',
  '.webm',
  '.mkv',
  '.avi',
  '.mov'
];

export const findStreamableFile = (files: any[]) => {
  return files.find(file =>
    STREAMING_EXTENSIONS.some(ext =>
      file.name.toLowerCase().endsWith(ext)
    )
  );
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};
