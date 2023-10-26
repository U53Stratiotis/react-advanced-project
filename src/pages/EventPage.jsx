import React, { useState, useEffect } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { useContextData } from "../context/AppContext";
import { EditEvent } from "../components/EditEvent";
import { useToast } from "@chakra-ui/react";
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

  // useLoaderData so the page can be refreshed.
  const { events, users, categories } = useLoaderData();
  // EventId gained from the router in main.jsx.
  const { eventId } = useParams();
  // Enables the event in navigation to route back to event.
  const { lastClickedEvent, setLastClickedEvent } = useContextData();

  const toast = useToast();
  // Route user back to EventsPage upon deleting current event.
  const navigate = useNavigate();
  // TextStyle Form.
  const boldTextStyle = { fontWeight: "bold" };

  // We use the createBy(id) property of the event that matched with the eventId url parameter.
  const event = events.find((sEvent) => sEvent.id === parseInt(eventId));
  const user = users.find((user) => user.id === event.createdBy);

  // set current event in lastClickedEvent state as an integer.
  useEffect(() => {
    const eventIdInt = parseInt(eventId, 10);
    setLastClickedEvent(eventIdInt);
  }, [eventId, setLastClickedEvent]);

  // Returns categories that match the ID. CategoryIds is obtained trough event object line 50.
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

  // <<< Delete event button clicked >>>
  const handleDelete = () => {
    // Toasts
    const warningMessage = () => {
      toast({
        title: "Warning",
        description: "Are you sure you want to delete the event?",
        status: "success",
      });
    };

    const deleteSuccesMessage = () => {
      toast({
        title: "Succes",
        description: "The event has been deleted.",
        status: "success",
      });
    };

    const deleteErrorMessage = () => {
      toast({
        title: "Error",
        description: "Unable to delete event.",
        status: "error",
      });
    };

    // Deletehandler
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    })
      .then(() => {
        deleteSuccesMessage();
        navigate("/");
      })
      .catch(() => {
        deleteErrorMessage();
      });
  };

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
                    bg="black"
                    textColor="white"
                    _hover={{
                      textColor: "red",
                    }}
                    onClick={handleDelete}
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
