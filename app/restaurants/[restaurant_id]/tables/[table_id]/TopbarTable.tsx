'use client'

import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Restaurant, RestaurantTable } from "@/types"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Button, IconButton, Tag, useColorMode } from "@chakra-ui/react"
import Link from "next/link"
import { BsSun } from "react-icons/bs"
import { MdOutlineModeNight } from "react-icons/md"

export type TopbarTable = {
    restaurant?: Restaurant
    table?: RestaurantTable
}

export const TopbarTable = ({ restaurant, table }: TopbarTable) => {

    const { colorMode, toggleColorMode } = useColorMode()
    const firebase_ctx = useFirebaseUserContext()

    return (
        <HStack
            w='full'
            h='65px'
            px={{ base: '2', md: '4' }}
            py='3'
            bg={colorMode == 'dark' ? '#03346a' : '#0665D0'}
            justifyContent='space-between'
            color='white'
            zIndex='999'
        >
            <VStack align='flex-start' spacing='0'>
                <Text fontWeight='600' textTransform='uppercase'>{restaurant?.name}</Text>
                <Text opacity='0.8' fontSize='13px'>{restaurant?.address}</Text>
            </VStack>
            <HStack>
                <HStack>
                    <Link href={`/restaurants/${restaurant?.id}/tables/${table?.id}`}>
                        <Button variant='outline' size='sm' color='whiteAlpha.900' _hover={{bg: 'gray.500'}}>Tạo đơn mới</Button>
                    </Link>
                    <Tag size='lg'>{table?.name}</Tag>
                </HStack>
                <IconButton
                    fontSize='lg'
                    // color={colorMode == 'dark' ? 'gray.400' : 'gray.300'}
                    // variant="ghost"
                    borderRadius='full'
                    aria-label='dark'
                    icon={colorMode == 'dark' ? <BsSun /> : <MdOutlineModeNight />}
                    onClick={toggleColorMode}
                />
            </HStack>
        </HStack >
    )
}

