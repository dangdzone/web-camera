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
                bg='#ffffff'
                centerContent
            >
                <Container
                    centerContent
                    maxW='8xl'
                    pr='0' pl='0'
                    minH='calc(100vh - 65px)'
                    bg='#ffffff'
                >
                    {children}
                </Container>
            </Container>
        </Box>
    );
}