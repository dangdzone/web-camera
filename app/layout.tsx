'use client'

import * as React from 'react'
import { PropsWithChildren } from "react";
import { LiveQueryContextProvider } from '@livequery/react'
import { ChakraProvider, Container } from "@chakra-ui/react";
import { LivequeryHttpTransporter } from '../config/livequery'
import { FirebaseUserContextProvider } from '../hooks/useFirebaseUser';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <FirebaseUserContextProvider>
            <Container maxW='8xl' minH='100vh' pl='0' pr='0'>
              <LiveQueryContextProvider transporter={LivequeryHttpTransporter}>
                {children}
              </LiveQueryContextProvider>
            </Container>
          </FirebaseUserContextProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}