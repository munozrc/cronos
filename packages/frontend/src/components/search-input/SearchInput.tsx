import { InputHTMLAttributes } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./SearchInput.module.css";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({ ...restOfProps }: SearchInputProps) {
  return (
    <div className={styles.container}>
      <figure role="presentation">
        <FiSearch className={styles.icon} />
      </figure>
      <input {...restOfProps} className={styles.searchInput} type="text" />
    </div>
  );
}
