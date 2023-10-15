'use client'

import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Restaurant, RestaurantTable } from "@/types"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Button, IconButton, Tag, useColorMode } from "@chakra-ui/react"
import Link from "next/link"
import { BsSun } from "react-icons/bs"
import { FiPlus } from "react-icons/fi"
import { MdOutlineModeNight } from "react-icons/md"

export type TopbarTable = {
    restaurant: Restaurant
    table: RestaurantTable
    order_id?: string
}

export const TopbarTable = ({ restaurant, table, order_id }: TopbarTable) => {

    const { colorMode, toggleColorMode } = useColorMode()
    const firebase_ctx = useFirebaseUserContext()

    return (
        <HStack
            w='full'
            h='65px'
            px={{ base: '2', md: '4' }}
            py='3'
            bg={colorMode == 'dark' ? '#C46819' : '#F5821F'}
            justifyContent='space-between'
            color='white'
            zIndex='999'
        >
            <VStack align='flex-start' spacing='0'>
                <Text fontWeight='600' textTransform='uppercase' noOfLines={1}>{restaurant?.name}</Text>
                <Text opacity='0.8' fontSize='13px' lineHeight='1.1'>{restaurant?.address}</Text>
            </VStack>
            <HStack>
                <HStack>
                    {
                        table?.name && <Tag size='lg' whiteSpace='nowrap'>{table?.name}</Tag>
                    }
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

