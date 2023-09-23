"use client"

import { Box, useColorMode } from '@chakra-ui/react';

export default function SimpleCard({ children }: React.PropsWithChildren) {
  const { colorMode } = useColorMode()
  return (
    <Box minH='100vh' minW='full' bg={colorMode == 'dark' ? '#18191A' : '#F0F1F1'} >
      {children}
    </Box>
  );
}