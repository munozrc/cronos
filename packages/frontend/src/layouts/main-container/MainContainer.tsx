import { type FC, type PropsWithChildren } from "react";
import styles from "./MainContainer.module.css";

export const MainContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Cronos</h1>
        <nav></nav>
      </header>
      <main>{children}</main>
    </div>
  );
};
