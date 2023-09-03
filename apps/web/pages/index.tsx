
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

import Landing from './landing';
import Navbar from './layout/navbar';

const Index = () => {
  return (
    <ChakraProvider>
      <Landing />
    </ChakraProvider>
  );
};

export default Index;
