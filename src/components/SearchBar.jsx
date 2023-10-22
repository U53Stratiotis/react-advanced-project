import react from "react";
import { styles } from "./SearchBar.module.css";

const SearchBar = (title) => {
  return (
    <div class="searchContainer">
      <input type="text" class="searchInput" placeholder="Search..." />
      <button class="searchButton">Search</button>
    </div>
  );
};

// Filter events based on the search term
// const filteredEvents = events.filter((event) =>
//   event.title.toLowerCase().includes(searchTerm.toLowerCase())
// );

// const eventGrid = filteredEvents.map((event)

//   <input
//   type="text"
//   className={styles.searchInput}
//   placeholder="Search events by title..."
//   value={searchTerm}
//   onChange={(e) => setSearchTerm(e.target.value)}
//  />
