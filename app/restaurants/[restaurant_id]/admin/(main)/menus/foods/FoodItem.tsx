import { Food } from "@/types"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Image, Tag, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"


export type FoodItem = {
    food?: SmartQueryItem<Food>
    onClick?: () => void
}

export const FoodItem = ({ onClick, food }: FoodItem) => {

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
            opacity={food?.status == 'active' ? '1' : '0.6'}
        >
            <Image
                borderTopRadius='10px'
                src={food?.images}
                h='170px'
                w='full'
            />
            <VStack w='full' align='flex-start' px='2' spacing='0'>
                <Text textTransform='uppercase' noOfLines={2}>{food?.name}</Text>
                <Text fontSize='14px' opacity='0.7' noOfLines={1}>{food?.description}</Text>
            </VStack>
            <HStack w='full' px='2' justifyContent='space-between'>
                <Tag colorScheme='red'>{food?.price.toLocaleString()}đ</Tag>
            </HStack>
        </VStack>
    )
}