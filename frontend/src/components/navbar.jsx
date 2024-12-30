import React from 'react';
import { Box, Flex, Text, Button, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="white" boxShadow="sm" position="sticky" top={0} zIndex={1000}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" py={4}>
          <Link to="/">
            <Text fontSize="2xl" fontWeight="bold" color="teal.500">
              Luvfy
            </Text>
          </Link>
          <Flex gap={4}>
            <Link to="/login">
              <Button colorScheme="teal" variant="outline">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="teal">
                Sign Up
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;


