'use client'

import { ReactNode } from 'react';
import { Box, Container, useColorMode } from '@chakra-ui/react';
import { LoginModal } from './LoginModal';
import { useFirebaseUserContext } from '@/hooks/useFirebaseUser';

export default function RestaurantLayout({ children }: { children: ReactNode }) {

    const { colorMode } = useColorMode()
    const { login_modal_visible, close_login_modal } = useFirebaseUserContext()
    const styles = {
        bg: colorMode == 'dark' ? '#18191A' : '#F0F1F1',
        bg_sx: colorMode == 'dark' ? '#2F3031' : '#c0c1c1'
    }

    return (
        <Box
            minH="100vh"
            w='full'
            overflowY='auto'
            overflowX='hidden'
            // h='calc(100vh - 65px)'
            h='100vh'
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
            {
                login_modal_visible && (
                    <LoginModal onClose={close_login_modal} />
                )
            }
            <Container
                maxW='full'
                pl='0' pr='0'
                bg={styles.bg}
                // h='100vh'
                centerContent
            >
                {children}
            </Container>
        </Box>
    );
}