'use client'

import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Topbar } from './Topbar';

export default function RestaurantLayout({ children }: { children: ReactNode }) {
    return (
        <Box
            minH="100vh"
            w='full'
            overflowY='auto'
            overflowX='hidden'
            h='calc(100vh - 65px)'
            sx={{
                "::-webkit-scrollbar": {
                    w: { base: 'none', md: '2' },
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '10',
                    bg: '#F0F1F1',
                },
            }}
        >
            <Topbar />
            <Container
                maxW='full'
                pl='0' pr='0'
                bg='#F0F1F1'
                centerContent
            >
                <Container
                    maxW='6xl'
                    pr='0' pl='0'
                    minH='calc(100vh - 65px)'
                >
                    <Box
                        w='full'
                        // bg={styles.bg}
                        minH='calc(100vh - 65px)'
                        p={{ base: '2', md: '4' }}
                        py={{ base: '6', md: '10' }}
                        display={{ base: 'block', md: 'flex' }}
                    >
                        {children}
                    </Box>
                </Container>
            </Container>
        </Box>
    );
}