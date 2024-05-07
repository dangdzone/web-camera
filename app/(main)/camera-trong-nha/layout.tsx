'use client'
import { SearchBox } from "@/components/common/SearchBox";
import { HStack, SimpleGrid, Text, VStack, Wrap, WrapItem } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";


export default function CamaraTrongNha({ children }: { children: ReactNode }) {

    return (
        <VStack w='full'>
            {children}
        </VStack>
    )
}