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
            minH="100vh"
            p='0'
        >
            <Topbar />
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