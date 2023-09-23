'use client'

import { ReactNode } from 'react';
import { Box, Container, useColorMode } from '@chakra-ui/react';
import { Topbar } from './Topbar';
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
            {
                login_modal_visible && (
                    <LoginModal onClose={close_login_modal} />
                )
            }
            <Container
                maxW='full'
                pl='0' pr='0'
                bg={styles.bg}
                centerContent
            >
                <Container
                    maxW='6xl'
                    pr='0' pl='0'
                    minH='calc(100vh - 65px)'
                >
                    <Box
                        w='full'
                        bg={styles.bg}
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