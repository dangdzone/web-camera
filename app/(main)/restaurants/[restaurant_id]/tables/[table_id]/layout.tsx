'use client'

import { VStack } from "@chakra-ui/layout";
import { PropsWithChildren } from "react";
import { TopbarTable } from "./TopbarTable";


export default function LayoutTable(props: PropsWithChildren) {
    return (
        <VStack w='full' minH='100vh' spacing='0'>
            
            {props.children}
        </VStack>
    )
}