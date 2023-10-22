import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useContextData } from "../context/AppContext";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  const { filteredEvents, setSearchText } = useContextData();

  const handleSearchChange = (e) => {
    console.log(filteredEvents);
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  return (
    <nav className={styles.navContainer}>
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            onChange={handleSearchChange}
          />
          <button className={styles.searchButton}>
            <FaSearch />
          </button>
        </div>
        <li>
          <Link to="/event/1">Event</Link>
        </li>
      </ul>
    </nav>
  );
};
