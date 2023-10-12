
import { theme } from "@/theme"
import { Button, Divider, HStack, Spinner, Text, VStack, useColorMode } from "@chakra-ui/react"
import { OrderTableItem } from "./OrderTableItem"
import { Order, OrderItem } from "@/types"
import { useCollectionData, useDocumentData } from "@livequery/react"

export type OrderTableList = {
    restaurant_id: string,
    order_id: string
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
            <VStack w='full' p='4' borderTop='1px' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'} spacing='5'>
                <HStack w='full' justifyContent='space-between' pt='3'>
                    <Text as='b'>Tổng tiền:</Text>
                    <Text as='b' fontSize='20px'>{$order.item?.total.toLocaleString()} đ</Text>
                </HStack>
                <Button
                    colorScheme='teal'
                    w='full'
                    isDisabled={status == 'paid' || $order_items.empty}
                    onClick={() => alert('Bạn vui lòng ra =thanh toán tại quầy thu ngân !')}
                >
                    {status == 'unpaid' ? 'Thanh toán' : 'Đã thanh toán'}
                </Button>
            </VStack>
        </VStack>
    )
}