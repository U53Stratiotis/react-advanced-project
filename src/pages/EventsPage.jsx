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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContextData } from "../context/AppContext";
import styles from "./EventsPage.module.css";

export const EventsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { events, filteredEvents, users, categories, searchText } =
    useContextData();

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
  const eventGrid = events.map((event) => (
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
              {event.startTime.slice(0, 16)} {">"} {event.endTime.slice(0, 16)}
            </p>
            <p className={styles.categories}>
              {categoriesList(event.categoryIds).join(", ").toUpperCase()}
            </p>
          </Link>
        </GridItem>
      </div>
    </Center>
  ));

  const noMatchesMessage =
    searchText && eventGrid.length === 0 ? (
      <p className={styles.noMatchesMessage}>No matches found.</p>
    ) : null;

  return (
    <>
      <Box bg="blue.100">
        <Center>
          <Button
            position="fixed"
            mt={20}
            bg="white"
            textColor="black"
            _hover={{
              textColor: "blue.100",
              bg: "black",
              transition: "color 1s, background-color 1s",
            }}
            onClick={openForm}
          >
            Add event{" "}
          </Button>
        </Center>
        <Box height="100vh">
          <Grid
            className={styles.gridContainer}
            templateColumns="repeat(2, 1fr)"
            gap={4}
            mt={20}
          >
            {noMatchesMessage}
            {eventGrid}
          </Grid>
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
