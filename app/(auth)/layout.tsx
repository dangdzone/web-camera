"use client"

import { Box, Button, HStack, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { FiChevronsLeft } from 'react-icons/fi';

export default function SimpleCard({ children }: React.PropsWithChildren) {
  const { colorMode } = useColorMode()
  return (
    <Box minH='100vh' minW='full' bg={colorMode == 'dark' ? '#18191A' : '#F0F1F1'} >
      <HStack w='full' maxW='820px' p='4'>
        <Link href='/'>
          <Button
            size='sm'
            colorScheme='teal'
            variant='ghost'
            aria-label='icon'
            borderBottomRadius='0'
            leftIcon={<FiChevronsLeft />}
            borderBottom='2px'
          >
            Trang chủ
          </Button>
        </Link>
      </HStack>
      {children}
    </Box>
  );
}