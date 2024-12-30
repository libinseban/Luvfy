import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <ChakraProvider>  
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1">
          <main>
            <Outlet />
          </main>
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default App;
