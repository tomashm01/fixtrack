import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import React from 'react';
import Index from '.';

// Aquí puedes también importar un tema personalizado si tienes uno
// import theme from '../path/to/theme';

function MyApp({ Component, pageProps } :AppProps) {
  return (
    <ChakraProvider>
      <main className="app">
        <Component {...pageProps}/>
      </main>
    </ChakraProvider>
  );
}

export default MyApp;
