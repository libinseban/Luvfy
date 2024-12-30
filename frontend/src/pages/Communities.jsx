import React, { useState, useEffect } from "react";
import { Box, Container, Heading, Text, Button, Stack } from "@chakra-ui/react";
import { communityService } from "../services/communityService";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const data = await communityService.getAllCommunities();
        setCommunities(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">Error: {error}</Text>;

  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={6}>Communities</Heading>
      <Stack spacing={4}>
        {communities.map((community) => (
          <Box key={community._id} p={4} borderWidth={1} borderRadius="lg">
            <Heading size="md">{community.name}</Heading>
            <Text mt={2}>{community.description}</Text>
            <Button mt={2} colorScheme="teal">
              Join Community
            </Button>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default Communities;
