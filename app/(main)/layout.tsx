'use client'
import { Stack, VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { Topbar } from "./Topbar";
import { Category } from "./Category";


export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <VStack h='100vh'spacing='0'>
            <VStack minH='65px' w='full' bg='cyan.800' >
                <VStack w='full' maxW='7xl'>
                    <Topbar />
                </VStack>
            </VStack>
            <Stack minH='calc(100vh - 65px)' w='full' maxW='7xl' flexDirection='row' spacing='5'>
                <Category />
                {children}
            </Stack>
        </VStack>
    )
}