
import { RestaurantTable } from "@/types"
import { HStack, Text } from "@chakra-ui/layout"
import { Tag, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"

export type TableItem = {
    table: SmartQueryItem<RestaurantTable>,
    onClick?: () => void
    index: number
}

export const TableItem = ({ onClick, table, index } : TableItem) => {

    const { colorMode } = useColorMode()

    return (
        <HStack
            w='full'
            p='4'
            borderRadius='10px'
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
            _hover={{
                bg: colorMode == 'dark' ? '#2F3031' : '#f0f1f1'
            }}
            spacing='4'
            onClick={onClick}
        >
            <Tag variant='outline' borderRadius='full'>{index}</Tag>
            <HStack w='full' justifyContent='space-between'>
                <Text fontWeight='600'>{table.name}</Text>
                <Text>ID: {table.id}</Text>
            </HStack>
        </HStack>
    )
}