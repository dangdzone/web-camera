'use client'
import { Stack, VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { Topbar } from "./Topbar";
import { ScrollToTop } from "@/components/common/ScrollToTop";

export default function MainLayout({ children }: { children: ReactNode }) {

    return (
        <VStack
            h='100vh'
            spacing='0'
        // sx={{
        //     "::-webkit-scrollbar": { w: { base: 'none', md: '2' } },
        //     '&::-webkit-scrollbar-thumb': {
        //         borderRadius: '5',
        //         bg: 'blackAlpha.300'
        //     },
        //     "::-webkit-scrollbar-track": {
        //         background: 'white'
        //     },
        //     "::-webkit-scrollbar-thumb:hover": {
        //         bg: 'blackAlpha.400'
        //     }
        // }}
        // overflowY='auto'
        // overflowX='hidden'
        >
            <VStack minH='60px' w='full' bg='linear-gradient(to right, #7f00ff, #e100ff)' boxShadow='sm' position='sticky' top='0px' zIndex='999'>
                <VStack w='full' maxW='6xl' px='4'>
                    <Topbar />
                </VStack>
            </VStack>
            <Stack
                // minH='calc(100vh - 60px)'
                w='full'
                maxW='6xl'
                flexDirection='row'
                spacing='5'
                px={{ base: '2', md: '4' }}
            >
                {children}
            </Stack>
            <ScrollToTop />
        </VStack>
    )
}