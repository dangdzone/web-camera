import { OrderStatusMap } from "@/text"
import { Order } from "@/type"
import { Box, HStack, Stack, Text } from "@chakra-ui/layout"
import { Button, Image, Tag } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import dayjs from "dayjs"

export type OrderItem = {
    order: SmartQueryItem<Order>
    onClick: () => void
}

export const OrderItem = ({ order, onClick }: OrderItem) => {

    const order_item = order?.order_items[0]
    const status_order = Object.entries(OrderStatusMap).filter(([status,]) => status == order.status).map(([status_id, { color, name }]) => [{ name, color }])[0]

    return (
        <Stack w='full' spacing='4' flexDir={{ base: 'column', md: 'row' }} p='4' border='1px' borderColor='blackAlpha.100' borderRadius='10px'>
            <Box minW='90px'>
                <Image maxH={{ base: '150px', md: '90px' }} src={order_item?.image} />
            </Box>
            <Stack w='full'>
                <Stack w='full' flexDir={{ base: 'column', md: 'row' }} justifyContent='space-between'>
                    <Text fontWeight='500'>{order_item?.name} - ({order?.amount})</Text>
                    <Text fontSize='13px'>{dayjs(order?.created_at).format('HH:mm - DD/MM/YYYY')}</Text>
                </Stack>
                <Stack flexDir={{ base: 'column', md: 'row' }}>
                    <HStack><Tag size='sm' colorScheme='orange'>{order?.code}</Tag></HStack>
                    <HStack><Tag size='sm' colorScheme={status_order?.map(a => a.color)[0]}>{status_order?.map(a => a.name)[0]}</Tag></HStack>
                    <HStack><Tag size='sm' variant='outline'>{order?.customer_info.email}</Tag></HStack>
                </Stack>
                <HStack w='full' justifyContent='space-between'>
                    <Text fontWeight='600' color='red.500'>{order?.pay.toLocaleString()}đ</Text>
                    <Button size='xs' variant='outline' colorScheme='red' onClick={onClick}>Xem chi tiết</Button>
                </HStack>
            </Stack>
        </Stack>
    )
}