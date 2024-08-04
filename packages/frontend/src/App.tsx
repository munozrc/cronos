import { type FC } from "react";
import "./styles/global.css";
import { MainContainer } from "./layouts";

export const App: FC = () => {
  return (
    <MainContainer>
      <div>
        <header>
          <h2>Music Downloader</h2>
          <p>Descarga música de forma gratuita en formato MP3</p>
        </header>
        <div>
          <input placeholder="https://www.youtube.com/watch?v=T0T9GyM28tg" />
        </div>
      </div>
    </MainContainer>
  );
};
