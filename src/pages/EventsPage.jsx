import React, { useState, useEffect } from "react";
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
import { useLoaderData, Link } from "react-router-dom";
import { useContextData } from "../context/AppContext";
import styles from "./EventsPage.module.css";

export const fetchData = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch("http://localhost:3000/users");

  const eventsData = await events.json();
  const categoriesData = await categories.json();
  const usersData = await users.json();
  return {
    events: eventsData,
    categories: categoriesData,
    users: usersData,
  };
};

export const EventsPage = () => {
  const { events, categories, users } = useLoaderData();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { filteredEvents } = useContextData();

  const openForm = () => {
    setIsFormVisible(true);
    console.log("Form vissible");
  };

  const closeForm = () => {
    setIsFormVisible(false);
    console.log("Form closed");
  };

  const categoriesList = (categoryIds) => {
    return categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "";
    });
  };

  // Add the following details when displaying an event: title, description, image, startTime & endTime, categories
  const eventGrid = filteredEvents.map((event) => (
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
              {event.startTime.slice(0, 16)} --- {event.endTime.slice(0, 16)}
            </p>
            <p className={styles.categories}>
              {categoriesList(event.categoryIds).join(", ").toUpperCase()}
            </p>
          </Link>
        </GridItem>
      </div>
    </Center>
  ));

  return (
    <>
      <Box bg="lightgray">
        <Center>
          <Button
            position="fixed"
            mt={20}
            bg="black"
            textColor="white"
            _hover={{
              textColor: "black",
              bg: "white",
              transition: "color 1s, background-color 1s",
            }}
            onClick={openForm}
          >
            Add event{" "}
          </Button>
        </Center>
        <Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={20}>
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
