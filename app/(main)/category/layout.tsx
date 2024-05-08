'use client'
import { VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";

export default function CamaraTrongNha({ children }: { children: ReactNode }) {

    return (
        <VStack w='full'>
            {children}
        </VStack>
    )
}