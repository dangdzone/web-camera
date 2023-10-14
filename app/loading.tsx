'use client'

import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";


export default function Loading() {
    return (
        <Center h='100vh' w='full'>
            <Spinner color="teal.500" size='lg' />
        </Center>
    )
}