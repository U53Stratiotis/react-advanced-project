import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useContextData } from "../context/AppContext";
import { Heading, Box, Image, Text, Flex, Center } from "@chakra-ui/react";
// details on the screen: title, description, image, startTime & endTime, categories and by who it’s created (name, image)

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

const boldTextStyle = { fontWeight: "bold" };

export const EventPage = () => {
  const { events, users, categories } = useLoaderData();
  const { eventId } = useParams();

  const event = events.find((sEvent) => sEvent.id === parseInt(eventId));
  const user = users.find((user) => user.id === event.createdBy);

  const categoriesList = (categoryIds) => {
    return categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "";
    });
  };

  return (
    <Box bg="blue.100">
      <Center>
        <Flex height="95vh">
          <Box
            width="100%"
            bg="white"
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
            borderTopRadius={160}
            mt="2"
          >
            <Center>
              <Heading size="lg" mt="8" mb="2">
                {event.title}
              </Heading>
            </Center>
            <Image
              src={event.image}
              alt={event.title}
              mb="2"
              height="14rem"
              width="30rem"
              borderTopRadius={40}
            />
            <Center>
              <Box mt="4">
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
