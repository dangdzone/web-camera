"use client"

import { LivequeryHttpTransporter } from "@/config/livequery";
import { FirebaseUserContextProvider } from "@/hooks/useFirebaseUser";
import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { LiveQueryContextProvider } from "@livequery/react";
import { PropsWithChildren } from "react";

const theme = extendTheme({
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
  });

  
export const ClientProviderList = (props: PropsWithChildren) => {
    return (
        <>
            <ChakraProvider theme={theme}>
                <FirebaseUserContextProvider>
                    <Container
                        maxW='full'
                        minH='100vh'
                        pl='0' pr='0'
                    >
                        <LiveQueryContextProvider transporter={LivequeryHttpTransporter}>
                            {props.children}
                        </LiveQueryContextProvider>
                    </Container>
                </FirebaseUserContextProvider>
            </ChakraProvider>
        </>
    )
}