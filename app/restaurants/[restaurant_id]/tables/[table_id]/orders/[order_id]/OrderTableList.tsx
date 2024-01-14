
import { theme } from "@/theme"
import { Button, Divider, HStack, SimpleGrid, Spinner, Text, VStack, useColorMode } from "@chakra-ui/react"
import { OrderTableItem } from "./OrderTableItem"
import { Order, OrderItem } from "@/types"
import { useCollectionData, useDocumentData } from "@livequery/react"
import { OrderStatusMap } from "@/text"
import dayjs from "dayjs"
import { useState } from "react"
import { CreateOrderModal } from "./CreateOrderModal"
import Link from "next/link"
import { TbLogout } from "react-icons/tb";

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

    const [active_create_order, set_active_create_order] = useState<boolean>(false)

    const order_total = order_items.length
    const order_confirm = order_items.filter(a => a.status == 'confirm').length
    const order_requested = order_items.filter(a => a.status == 'requested').length
    const order_cancel = order_items.filter(a => a.status == 'cancel').length

    const order_status = [
        { name: 'Tổng món', value: order_total, color: '#5C6BC0' },
        { name: 'Đã lên bàn', value: order_confirm, color: 'blue.500' },
        { name: 'Đợi lên bàn', value: order_requested, color: 'green.500' },
        { name: 'Món hủy', value: order_cancel, color: 'red.500' },
    ]

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
            {
                active_create_order !== false && (
                    <CreateOrderModal
                        onClose={() => set_active_create_order(false)}
                        restaurant_id={props.restaurant_id}
                        table_id={props.table_id}
                    />
                )
            }
            <HStack
                w='full'
                p='4'
                borderBottom='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                justifyContent='space-between'
            >
                <Text fontWeight='600'>Đơn hàng của bạn</Text>
                <HStack>
                    <Button size='sm' onClick={() => set_active_create_order(true)}>Tạo đơn mới</Button>
                    <Link href={`/restaurants/${props.restaurant_id}/tables/${props.table_id}`}>
                        <Button size='sm' leftIcon={<TbLogout />}>Thoát</Button>
                    </Link>
                </HStack>
            </HStack>
            <SimpleGrid w='full' spacing='5' columns={[1, 1, 2, 4]} px='4'>
                {
                    order_status.map((item, i) => (
                        <VStack w='full' bg={item.color} py='4' borderRadius='5px' spacing='0' color='white'>
                            <Text fontWeight='700' fontSize='20px'>{item.value}</Text>
                            <Text>{item.name}</Text>
                        </VStack>
                    ))
                }
            </SimpleGrid>
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
                    <Text as='b'>Thời gian tạo đơn:</Text>
                    <Text as='b' fontSize='20px'>{dayjs($order.item?.created_at).format('HH:mm - DD/MM/YYYY')}</Text>
                </HStack>
                <HStack w='full' justifyContent='space-between'>
                    <Text as='b'>Trạng thái đơn hàng</Text>
                    {
                        Object.entries(OrderStatusMap).filter(([name_id,]) => status == name_id).map(([name_id, { name, color }]) => (
                            <Button
                                size='sm'
                                key={name_id}
                                colorScheme={color}
                                variant={'outline'}
                            >
                                {name}
                            </Button>
                        ))
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