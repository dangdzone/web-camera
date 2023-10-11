
import { Order, Restaurant, RestaurantTable } from "@/types"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Tag, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useDocumentData } from "@livequery/react"

export type OrderItem = {
    order?: SmartQueryItem<Order>
    onClick?: () => void
    index?: number
}

export const OrderItem = ({ onClick, order, index }: OrderItem) => {

    const { colorMode } = useColorMode()
    const $table = useDocumentData<RestaurantTable>(`restaurants/${order?.restaurant_id}/tables/${order?.table_id}`)

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
            <VStack w='full' align='flex-start'>
                <HStack w='full' justifyContent='space-between'>
                    <Text fontWeight='600' opacity='0.8'>{order?.customer_name}</Text>
                    <Tag colorScheme='teal'>{order?.total}đ</Tag>
                </HStack>
                <HStack w='full' justifyContent='space-between'>
                    <Text color='red.500'>{$table?.item?.name}</Text>
                    <Tag variant='outline'>{order?.food_amount} món</Tag>
                </HStack>
            </VStack>
        </HStack>
    )
}