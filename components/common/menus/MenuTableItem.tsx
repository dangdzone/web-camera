

import { Food } from "@/types"
import { Box, HStack, Text, VStack } from "@chakra-ui/layout"
import { IconButton, Image, Tag, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { BiCartAdd } from "react-icons/bi"
import { FiPlus } from "react-icons/fi"

export type MenuTableItem = {
    food?: SmartQueryItem<Food>
    onClick?: () => void
}

export const MenuTableItem = ({ onClick, food }: MenuTableItem) => {

    const { colorMode } = useColorMode()

    return (
        <VStack
            w='full'
            pb='4'
            borderRadius='10px'
            _hover={{
                bg: colorMode == 'dark' ? '#2F3031' : '#f0f1f1'
            }}
            cursor='pointer'
            onClick={onClick}
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
            boxShadow='sm'
        >
            <Image
                borderTopRadius='10px'
                src={food?.images}
                maxH='200px'
                w='full'
            />
            <VStack w='full' align='flex-start' px='2' spacing='0'>
                <Text textTransform='uppercase' noOfLines={2}>{food?.name}</Text>
                <Text fontSize='14px' opacity='0.7' noOfLines={1}>{food?.description}</Text>
            </VStack>
            <HStack w='full' px='2' justifyContent='space-between'>
                <Tag colorScheme='red'>{food?.price.toLocaleString()} đ</Tag>
                <IconButton
                    isRound={true}
                    icon={<BiCartAdd />}
                    aria-label={"plus"}
                    colorScheme='teal'
                    size='sm'
                />
            </HStack>
        </VStack>
    )
}