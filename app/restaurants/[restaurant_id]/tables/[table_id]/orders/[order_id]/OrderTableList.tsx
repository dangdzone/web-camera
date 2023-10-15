
import { theme } from "@/theme"
import { Button, Divider, HStack, Spinner, Text, VStack, useColorMode } from "@chakra-ui/react"
import { OrderTableItem } from "./OrderTableItem"
import { Order, OrderItem } from "@/types"
import { useCollectionData, useDocumentData } from "@livequery/react"
import { OrderStatusMap } from "@/text"
import Link from "next/link"

export type OrderTableList = {
    restaurant_id: string,
    order_id: string
    table_id: string
}

export const OrderTableList = (props: OrderTableList) => {

    const { colorMode } = useColorMode()
    const ref = `restaurants/${props.restaurant_id}/orders/${props.order_id}/order-items`
    const $order_items = useCollectionData<OrderItem>(ref)
    const order_items = $order_items.items

    const $order = useDocumentData<Order>(`restaurants/${props.restaurant_id}/orders/${props.order_id}`)
    const status = $order.item?.status

    return (
        <VStack
            w='full'
            bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
            borderRadius='5px'
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
            spacing='5'
            pb='5'
        >
            <HStack
                w='full'
                p='4'
                borderBottom='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                justifyContent='space-between'
            >
                <Text fontWeight='600'>Đơn hàng của bạn</Text>
                {
                    order_items.length !== 0 && (
                        <Link href={`/restaurants/${props?.restaurant_id}/tables/${props.table_id}`}>
                            <Button size='sm'>Tạo đơn mới</Button>
                        </Link>
                    )
                }
            </HStack>
            <VStack w='full' divider={<Divider />} p='4'>
                {
                    order_items.map((order_item, i) => (
                        <OrderTableItem key={i} order_item={order_item} />
                    ))
                }
                {
                    $order_items.empty && <Text>Chưa có món nào...</Text>
                }
                {
                    $order_items.loading && <Spinner color="teal.500" size='lg' />
                }
            </VStack>
            <VStack w='full' p='4' borderTop='1px' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'} spacing='7'>
                <HStack w='full' justifyContent='space-between'>
                    <Text as='b'>Tổng tiền:</Text>
                    <Text as='b' fontSize='20px'>{$order.item?.total.toLocaleString()} đ</Text>
                </HStack>
                <HStack w='full' justifyContent='space-between'>
                    <Text as='b'>Trạng thái đơn hàng</Text>
                    {
                        order_items.length !== 0 ? Object.entries(OrderStatusMap).filter(([name_id,]) => status == name_id).map(([name_id, { name, color }]) => (
                            <Button
                                size='sm'
                                key={name_id}
                                colorScheme={color}
                                variant={'outline'}
                            >
                                {name}
                            </Button>
                        )) : <Button variant='outline' size='sm'>Đã tạo đơn</Button>
                    }
                </HStack>
                {
                    status == 'unpaid' && (
                        <Text
                            p='4'
                            bg={colorMode == 'dark' ? 'blue.800' : 'blue.100'}
                            borderRadius='10px'
                        >
                            Quý khách thanh toán tại quầy lễ tân !
                        </Text>
                    )
                }
            </VStack>
        </VStack>
    )
}