import React, { useState } from "react";
import { AddEvent } from "../components/AddEvent";
import {
  Center,
  Box,
  Image,
  Grid,
  GridItem,
  Button,
  Modal,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContextData } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./EventsPage.module.css";

export const EventsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const {
    filteredEvents,
    users,
    categories,
    filteredCategoryIds,
    setFilteredCategoryIds,
  } = useContextData();

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  // Function to handle category selection (you can implement this part)
  const handleFilteredCategoryChange = (e) => {
    const selectedCategoryIds = Array.from(e.target.selectedOptions, (option) =>
      // change category from string to interger
      parseInt(option.value)
    );
    setFilteredCategoryIds(selectedCategoryIds);
  };

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const categoriesList = (categoryIds) => {
    return categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "";
    });
  };

  // Add the following details when displaying an event: title, description, image, startTime & endTime, categories
  const eventGrid = filteredEvents
    .filter((event) => {
      // Filter events only if there are selected category options
      return (
        filteredCategoryIds.length === 0 || // Show all events if no options selected
        filteredCategoryIds.some((categoryId) =>
          event.categoryIds.includes(categoryId)
        )
      );
    })
    .map((event) => (
      <Center key={event.id}>
        <div className={styles.cards}>
          <GridItem key={event.id} className="event" colSpan={1} rowSpan={1}>
            <Link to={`/event/${event.id}`}>
              <h1 className={styles.title}>{event.title}</h1>
              <p className={styles.description}>{event.description}</p>
              <Image
                src={event.image}
                className="event-image"
                width="100%"
                height="20rem"
              />
              <p className={styles.time}>
                {event.startTime.slice(0, 16)} {">"}{" "}
                {event.endTime.slice(0, 16)}
              </p>
              <p className={styles.categories}>
                {categoriesList(event.categoryIds).join(", ").toUpperCase()}
              </p>
            </Link>
          </GridItem>
        </div>
      </Center>
    ));

  const noMatchesMessage = (
    <Center>
      <Text mt={500} fontSize="xl" fontWeight="bold" textDecoration="underline">
        No matches found
      </Text>
    </Center>
  );

  return (
    <>
      <Box bg="blue.100" height="auto" minHeight="95vh" padding={8}>
        <Center>
          <Button
            position="fixed"
            mt={20}
            mr={40}
            bg="white"
            textColor="black"
            _hover={{
              textColor: "blue.100",
              bg: "black",
              transition: "color 1s, background-color 1s",
            }}
            onClick={openForm}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />
            Add event{" "}
          </Button>
          <Button
            position="fixed"
            mt={20}
            ml={40}
            bg="white"
            textColor="black"
            _hover={{
              textColor: "blue.100",
              bg: "black",
              transition: "color 1s, background-color 1s",
            }}
            onClick={toggleCategories}
          >
            <FontAwesomeIcon icon={faFilter} style={{ marginRight: "8px" }} />
            Categories
          </Button>
          <Box mt={300} position="fixed" width={200}>
            {showCategories && (
              <>
                <span>
                  <p style={{ marginTop: "2rem" }}>CTRL + click</p>
                  <p>to select multiple/unselect</p>
                  <select
                    name="categoriesId"
                    multiple
                    onChange={handleFilteredCategoryChange}
                    style={{
                      borderWidth: "0.0rem",
                      height: "8.5rem",
                      fontSize: "2rem",
                      overflow: "hidden", // Hide the scrollbar by clipping content
                      scrollbarWidth: "none", // For Firefox & Chrome
                      WebkitScrollbarWidth: "none",
                      background: "transparent",
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </span>
              </>
            )}
          </Box>
        </Center>
        <Box>
          {/* Conditionally render the message or eventGrid */}
          {eventGrid.length === 0 ? (
            noMatchesMessage
          ) : (
            <Grid
              className={styles.gridContainer}
              templateColumns="repeat(2, 1fr)"
              gap={4}
            >
              {eventGrid}
            </Grid>
          )}
        </Box>
      </Box>
      {isFormVisible && (
        <Modal isOpen={isFormVisible} onClose={closeForm}>
          <AddEvent
            closeForm={closeForm}
            categories={categories}
            users={users}
          />
        </Modal>
      )}
    </>
  );
};
