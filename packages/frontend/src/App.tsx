import { type FC } from "react";

import { QueryProvider } from "./services/providers";
import { MainContainer } from "./layouts";
import { HomePage } from "./pages";

import "./styles/global.css";

export const App: FC = () => {
  return (
    <QueryProvider>
      <MainContainer>
        <HomePage />
      </MainContainer>
    </QueryProvider>
  );
};
