import React from 'react';
import { Box, Container, Heading, Text, Button, Stack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Stack spacing={8} direction={{ base: 'column', md: 'row' }} align="center">
        <Box flex={1}>
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to Luvfy
          </Heading>
          <Text fontSize="xl" mb={6}>
            Connect, Share, and Find Your Perfect Match
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <Link to="/signup">
              <Button colorScheme="teal" size="lg">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="teal" variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </Stack>
        </Box>
        <Box flex={1}>
          <Image 
            src="https://via.placeholder.com/500x300"
            alt="Dating illustration"
            borderRadius="lg"
            fallbackSrc="https://via.placeholder.com/500x300"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default Landing;
