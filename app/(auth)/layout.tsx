'use client'
import { Stack, VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { Topbar } from "../(main)/Topbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
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
            <Topbar />
            <Stack
                minH='calc(100vh - 60px)'
                w='full'
                maxW='6xl'
                flexDirection='row'
                spacing='5'
                px='4'
            >
                {children}
            </Stack>
        </VStack>
    )
}