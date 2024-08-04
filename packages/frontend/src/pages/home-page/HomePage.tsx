import { FormEvent } from "react";
import { SearchInput } from "../../components";
import { useSearchSong } from "../../hooks/queries";

export function HomePage() {
  const { results, handleSearchSong } = useSearchSong();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = Object.fromEntries(formData).query as string;
    query && handleSearchSong(query);
  };

  const handleDownload = (videoId: string) => () => {
    console.log(videoId);
  };

  return (
    <div>
      <header>
        <h2>Music Downloader</h2>
        <p>Descarga música de forma gratuita en formato MP3</p>
      </header>
      <form onSubmit={handleSubmit}>
        <SearchInput name="query" placeholder="https://www.youtube.com/watch?v=T0T9GyM28tg" />
      </form>
      <ul>
        {results.map((song) => (
          <li key={song.videoId}>
            <strong>{song.title}</strong>
            <button type="button" onClick={handleDownload(song.videoId)}>
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
