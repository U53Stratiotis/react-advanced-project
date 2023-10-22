import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styles from "./Navigation.module.css";

export const Navigation = () => {
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
