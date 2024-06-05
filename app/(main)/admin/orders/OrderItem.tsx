import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { OrderStatusMap } from "@/text"
import { Order, Product } from "@/type"
import { Box, HStack, Stack, Text } from "@chakra-ui/layout"
import { Button, Image, Tag } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useDocumentData } from "@livequery/react"
import dayjs from "dayjs"

export type OrderItem = {
    order: SmartQueryItem<Order>
    onClick: () => void
}

export const OrderItem = ({ order, onClick }: OrderItem) => {

    const { fuser } = useFirebaseUserContext()
    const product_id = order.order_items?.[0].product_id
    const { item: $product } = useDocumentData<Product>(fuser && `products/${product_id}`)
    const status_order = Object.entries(OrderStatusMap).filter(([status,]) => status == order.status).map(([status_id, { color, name }]) => [{ name, color }])[0]

    return (
        <Stack w='full' spacing='4' flexDirection='row' p='4' border='1px' borderColor='blackAlpha.100' borderRadius='10px'>
            <Box minW='90px'>
                <Image maxH='90px' src={$product?.image} />
            </Box>
            <Stack w='full'>
                <Stack w='full' flexDir='row' justifyContent='space-between'>
                    <Text fontWeight='600'>{$product?.name} - ({order?.amount})</Text>
                    <Text fontSize='13px'>{dayjs(order?.created_at).format('HH:mm - DD/MM/YYYY')}</Text>
                </Stack>
                <HStack>
                    <Tag size='sm' colorScheme='orange'>{order?.code}</Tag>
                    <Tag size='sm' colorScheme={status_order?.map(a => a.color)[0]}>{status_order?.map(a => a.name)[0]}</Tag>
                    <Tag size='sm' variant='outline'>{order?.customer_info.email}</Tag>
                </HStack>
                <HStack w='full' justifyContent='space-between'>
                    <Text fontWeight='700' color='red.500'>{order?.pay.toLocaleString()}đ</Text>
                    <Button size='xs' variant='outline' colorScheme='red' onClick={onClick}>Xem chi tiết</Button>
                </HStack>
            </Stack>
        </Stack>
    )
}