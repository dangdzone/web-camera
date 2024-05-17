'use client'
import { Stack, VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { Topbar } from "./Topbar";
import { NavLink } from "./NavLink";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <VStack
            h='100vh'
            spacing='0'
            sx={{
                "::-webkit-scrollbar": { w: { base: 'none', md: '2' } },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '5',
                    bg: 'blackAlpha.300'
                },
                "::-webkit-scrollbar-track": {
                    background: 'white'
                },
                "::-webkit-scrollbar-thumb:hover": {
                    bg: 'blackAlpha.400'
                }
            }}
            overflowY='auto'
            overflowX='hidden'
        >
            <VStack minH='60px' w='full' bg='blue.400' position='sticky' top='0px' zIndex='999'>
                <VStack w='full' maxW='6xl' px='4'>
                    <Topbar />
                </VStack>
            </VStack>
            <Stack
                minH='calc(100vh - 60px)'
                w='full'
                maxW='6xl'
                flexDirection='row'
                spacing='5'
                px='4'
            >
                {/* <NavLink /> */}
                {children}
            </Stack>
        </VStack>
    )
}