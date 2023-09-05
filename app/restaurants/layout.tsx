'use client'

import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export default function RestaurantLayout({ children }: { children: ReactNode }) {
    return (
        <Box minH="100vh">
            <Box>
                {children}
            </Box>
        </Box>
    );
}