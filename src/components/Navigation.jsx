import { Link } from "react-router-dom";
import { useContextData } from "../context/AppContext";

import styles from "./Navigation.module.css";

export const Navigation = () => {
  const { events, setFilteredEvents, lastClickedEvent } = useContextData();

  const handleSearchChange = (e) => {
    // Dont update seperate states to avoid asynchronous state bugs.
    setFilteredEvents(
      events.filter((event) =>
        event?.title?.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <nav className={styles.navContainer}>
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <div className={styles.searchContainer}>
          <input
            name="searchbar"
            type="text"
            className={styles.searchInput}
            placeholder="Search..."
            onChange={handleSearchChange}
          />
        </div>
        <li>
          <Link to={lastClickedEvent ? `/event/${lastClickedEvent}` : "/"}>
            Event
          </Link>
        </li>
      </ul>
    </nav>
  );
};
