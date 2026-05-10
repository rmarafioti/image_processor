import { useState, useRef, useEffect } from "react";

import styles from "../styling/show_search.module.css";

export default function ShowSearch({ value, onChange, options = [] }) {
  const selectedShow = options.find((s) => s.id === Number(value));
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(handler);
  }, [query]);

  // Sync display name when value changes externally
  useEffect(() => {
    setQuery(selectedShow ? selectedShow.show_name : "");
  }, [value]);

  const filteredOptions =
    debouncedQuery.trim() === ""
      ? options
      : options.filter((show) =>
          show.show_name
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase().trim()),
        );

  const handleFocus = () => {
    if (selectedShow) {
      setQuery("");
      setDebouncedQuery("");
    }
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (show) => {
    onChange(show);
    setQuery(show.show_name);
    setDebouncedQuery(show.show_name);
    setIsOpen(false);
  };

  const clearSelection = () => {
    onChange({ id: "" });
    setQuery("");
    setDebouncedQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div>
      <input type="hidden" name="show_name" value={value || ""} />
      <input
        ref={inputRef}
        value={query}
        placeholder="Search or select a show from the list"
        onChange={handleInputChange}
        onFocus={handleFocus}
        className={styles.input_form}
      />

      {isOpen && (
        <ul className={styles.show_list}>
          {filteredOptions.length > 0 ? (
            [...filteredOptions]
              .sort((a, b) => a.show_name.localeCompare(b.show_name))
              .map((show) => (
                <li
                  className={styles.show_names}
                  key={show.id}
                  onClick={() => handleSelect(show)}
                >
                  {show.show_name}
                  {show.host_name ? ` / ${show.host_name}` : ""}
                </li>
              ))
          ) : (
            <li className={styles.no_matches}>No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
}
