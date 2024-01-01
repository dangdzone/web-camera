
import { Order, OrderItem, Restaurant, RestaurantTable } from "@/types"
import { Badge, Center, Divider, HStack, Text, VStack } from "@chakra-ui/layout"
import { Button, Tag, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData, useDocumentData } from "@livequery/react"
import dayjs from "dayjs"
import { MdCheck, MdCheckCircle, MdFactCheck, MdOutlineClose, MdRadioButtonUnchecked } from "react-icons/md"

export type OrderListItem = {
    order?: SmartQueryItem<Order>
    onClick?: () => void
    index?: number
}

export const OrderListItem = ({ onClick, order, index }: OrderListItem) => {

    const { colorMode } = useColorMode()
    const $table = useDocumentData<RestaurantTable>(`restaurants/${order?.restaurant_id}/tables/${order?.table_id}`)
    const $order_items = useCollectionData<OrderItem>(`restaurants/${order?.restaurant_id}/orders/${order?.id}/order-items`)

    // Số món chưa lên bàn
    const status_requested = $order_items.items.filter(a => a.status == 'requested').length
    // Số món đã lê bàn
    const status_confirm = $order_items.items.filter(a => a.status == 'confirm').length

    return (
        <HStack
            w='full'
            borderRadius='10px'
            bg={colorMode == 'dark' ? 'whiteAlpha.50' : 'blackAlpha.50'}
            _hover={{
                bg: colorMode == 'dark' ? 'whiteAlpha.200' : 'blackAlpha.200'
            }}
            spacing='0'
            onClick={onClick}
        >
            <VStack
                px='4' h='100%'
                bg={colorMode == 'dark' ? 'whiteAlpha.50' : 'blackAlpha.50'}
                justifyContent='center'
                borderLeftRadius={'10px'}
            >
                <HStack color='red.500' divider={<Divider orientation='vertical' />}>
                    <Text fontWeight='600' fontSize='20px'>#{index}</Text>
                    <Text whiteSpace='nowrap'>{$table?.item?.name}</Text>
                </HStack>
                <Text fontWeight='600' opacity='0.8' fontSize='14px' whiteSpace='nowrap'>
                    {dayjs(order?.created_at).format('HH:mm - DD/MM/YYYY')}
                </Text>
            </VStack>
            <VStack w='full' align='flex-start' py='4' px='4'>
                <HStack w='full' justifyContent='space-between'>
                    <Text fontWeight='600' opacity='0.8'>
                        {order?.customer_name}
                    </Text>
                    <Badge fontSize='md' colorScheme='green' variant='outline'>{order?.total.toLocaleString()}đ</Badge>
                </HStack>
                <HStack w='full' justifyContent='space-between'>
                    <Tag variant='outline'>{$order_items.items.length || 'Chưa có'} món</Tag>
                    <HStack>
                        <Tag  colorScheme="blue"><MdCheckCircle />{status_confirm}</Tag>
                        <Tag colorScheme="red"><MdRadioButtonUnchecked />{status_requested}</Tag>
                    </HStack>
                </HStack>
            </VStack>
        </HStack>
    )
}