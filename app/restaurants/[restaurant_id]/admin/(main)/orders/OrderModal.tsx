
import { Order, OrderItem, RestaurantTable } from "@/types"
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Stack, Tag, Text, VStack, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData, useDocumentData } from "@livequery/react"
import { OrderItemDetail } from "./OrderItemDetail"

export type OrderModal = {
    order?: SmartQueryItem<Order>
    onClose: () => void
}

export const OrderModal = (props: OrderModal) => {

    const { colorMode } = useColorMode()
    const $table = useDocumentData<RestaurantTable>(`restaurants/${props.order?.restaurant_id}/tables/${props.order?.table_id}`)
    const $order_items = useCollectionData<OrderItem>(`restaurants/${props.order?.restaurant_id}/orders/${props.order?.id}/order-items`)

    const order_items = $order_items.items

    return (
        <Drawer onClose={props.onClose} isOpen={true} placement='left' size='lg'>
            <DrawerOverlay />
            <DrawerContent bg={colorMode == "dark" ? "#242526" : "white"} maxW='4xl'>
                <DrawerHeader borderBottomWidth='1px'>Đơn hàng</DrawerHeader>
                <DrawerCloseButton mt='1.5' />
                <DrawerBody py='4' px={{ base: '0', md: '4' }}>
                    <VStack w='full' spacing='5'>
                        <HStack
                            w='full'
                            p='4'
                            borderBottom='1px'
                            borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                            justifyContent='space-between'
                        >
                            <Text fontWeight='600'>{props.order?.customer_name}</Text>
                            <Tag colorScheme='red'>{$table.item?.name}</Tag>
                        </HStack>
                        <Stack w='full' divider={<Divider />} p='4'>
                            {
                                order_items.map(order_item => (
                                    <OrderItemDetail key={order_item.id} order_item={order_item} />
                                ))
                            }
                        </Stack>
                        <VStack w='full' p='4' borderTop='1px' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'} spacing='5'>
                            <HStack w='full' justifyContent='space-between' pt='3'>
                                <Text as='b'>Tổng tiền:</Text>
                                <Text as='b' fontSize='20px'>1.002.000 đ</Text>
                            </HStack>
                            <Button colorScheme='teal' w='full'>Xác nhận</Button>
                        </VStack>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}