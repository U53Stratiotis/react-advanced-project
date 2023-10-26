import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useContextData } from "../context/AppContext";
import { EditEvent } from "../components/EditEvent";
import {
  Heading,
  Box,
  Image,
  Text,
  Flex,
  Center,
  Button,
  Modal,
} from "@chakra-ui/react";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);

  const eventsData = await events.json();
  const usersData = await users.json();
  const categoriesData = await categories.json();

  return {
    events: eventsData,
    users: usersData,
    categories: categoriesData,
  };
};

export const EventPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { events, users, categories } = useLoaderData();
  const { eventId } = useParams();
  const { filteredEvents, lastClickedEvent, setLastClickedEvent } =
    useContextData();

  const event = events.find((sEvent) => sEvent.id === parseInt(eventId));
  // We use the createBy(id) property of the event that matched with the eventId url parameter.
  const user = users.find((user) => user.id === event.createdBy);

  useEffect(() => {
    const eventIdInt = parseInt(eventId, 10);
    setLastClickedEvent(eventIdInt);
    console.log("New lastClicked: ", lastClickedEvent);
  }, [eventId, setLastClickedEvent]);

  const categoriesList = (categoryIds) => {
    return categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "";
    });
  };

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const deleteEvent = () => {};

  const boldTextStyle = { fontWeight: "bold" };

  return (
    <Box bg="blue.100">
      {isFormVisible && (
        <Modal
          isOpen={isFormVisible}
          onClose={closeForm}
          position="absolute"
          marginRight="20rem"
        >
          <EditEvent
            closeForm={closeForm}
            categories={categories}
            users={users}
            eventId={event.id}
          />
        </Modal>
      )}
      <Center>
        <Flex height="95vh">
          <Box
            width="100%"
            bg="white"
            borderRadius="lg"
            boxShadow="5px 5px 10px 5px rgba(0.4, 0.4, 0.4, 0.4)"
            overflow="hidden"
          >
            <Center>
              <Heading size="lg" mt="4" mb="2">
                {event.title}
              </Heading>
            </Center>
            <Image
              src={event.image}
              alt={event.title}
              mb="2"
              height="14rem"
              width="30rem"
              maxW="30rem"
            />
            <Center>
              <Box mt="4" textAlign="center">
                <Text style={boldTextStyle}>Description:</Text>
                <Text>{event.description}</Text>
                <Text style={boldTextStyle}>Start Time:</Text>
                <Text>{event.startTime.slice(0, 16)}</Text>
                <Text style={boldTextStyle}>End Time:</Text>
                <Text>{event.endTime.slice(0, 16)}</Text>
                <Text style={boldTextStyle}>Category:</Text>
                <Text>
                  {categoriesList(event.categoryIds).join(", ").toUpperCase()}
                </Text>
                <Text style={boldTextStyle}>Created by:</Text>
                <Text>{user.name}</Text>
                <Center>
                  <Button
                    position="fixed"
                    mt={680}
                    mr={80}
                    bg="black"
                    textColor="white"
                    _hover={{
                      textColor: "#007bff",
                      bg: "black",
                      transition: "color 1s, background-color 1s",
                    }}
                    onClick={openForm}
                  >
                    Edit event{" "}
                  </Button>
                  <Button
                    position="fixed"
                    mt={680}
                    ml={80}
                    bg="red"
                    textColor="white"
                    _hover={{
                      textColor: "#007bff",
                      bg: "black",
                      transition: "color 1s, background-color 1s",
                    }}
                    onClick={deleteEvent}
                  >
                    Delete event{" "}
                  </Button>
                </Center>
              </Box>
            </Center>
            <Center>
              <Image
                src={user.image}
                alt={user.name}
                height="20rem"
                mt="4"
                borderRadius={160}
              />
            </Center>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
};
