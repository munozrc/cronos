export type Music = {
  videoId: string;
  title: string;
  author: string;
  thumbnail: string;
  lengthSeconds: number;
  album: string;
};

export type DownloadedMusic = Music & {
  publishDate: string;
};
