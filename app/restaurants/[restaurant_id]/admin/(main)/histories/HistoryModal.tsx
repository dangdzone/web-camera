
import { Order, OrderItem, RestaurantTable } from "@/types"
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Spinner, Tag, Text, VStack, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData, useDocumentData } from "@livequery/react"
import { useState } from "react"
import { OrderInfoModal } from "../orders/OrderInfoModal"
import { OrderItemDetail } from "../orders/OrderItemDetail"
import { OrderStatusMap } from "@/text"
import dayjs from "dayjs"

export type HistoryModal = {
    order?: SmartQueryItem<Order>
    onClose: () => void
}

export const HistoryModal = (props: HistoryModal) => {

    const { colorMode } = useColorMode()
    const [order_update, set_order_update] = useState<null | undefined | SmartQueryItem<OrderItem>>(null)
    const $table = useDocumentData<RestaurantTable>(`restaurants/${props.order?.restaurant_id}/tables/${props.order?.table_id}`)
    const $order_items = useCollectionData<OrderItem>(`restaurants/${props.order?.restaurant_id}/orders/${props.order?.id}/order-items`)

    const order_items = $order_items.items

    return (
        <Drawer onClose={props.onClose} isOpen={true} placement='left' size='lg'>
            {
                order_update !== null && (
                    <OrderInfoModal
                        onClose={() => set_order_update(null)}
                        order_item={order_update}
                        restaurant_id={props.order?.restaurant_id}
                    />
                )
            }
            <DrawerOverlay />
            <DrawerContent bg={colorMode == "dark" ? "#242526" : "white"} maxW='4xl'>
                <DrawerHeader borderBottomWidth='1px'>Đơn hàng</DrawerHeader>
                <DrawerCloseButton mt='1.5' />
                <DrawerBody
                    py='4' px={{ base: '0', md: '4' }}
                    sx={{
                        "::-webkit-scrollbar": {
                            w: { base: 'none', md: '2' },
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '10',
                            bg: '#c0c1c1',
                        },
                    }}
                >
                    <VStack w='full' spacing='5'>
                        <HStack
                            w='full'
                            p='4'
                            borderBottom='1px'
                            borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                            justifyContent='space-between'
                        >
                            <Text fontWeight='600'>{props.order?.customer_name}</Text>
                            {
                                $table.item && (
                                    <Tag colorScheme='red'>{$table.item?.name}</Tag>
                                )
                            }
                        </HStack>
                        <VStack w='full' divider={<Divider />} py='4'>
                            {
                                order_items.map(order_item => (
                                    <OrderItemDetail
                                        key={order_item.id}
                                        order_item={order_item}
                                        onClick={() => set_order_update(order_item)}
                                    />
                                ))
                            }
                            {
                                $order_items.loading && <Spinner color="teal.500" size='lg' />
                            }
                            {
                                $order_items.empty && <Text fontSize='18px' color="teal.500">Chưa có món...</Text>
                            }
                        </VStack>
                        <VStack w='full' p='4' borderTop='1px' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'} spacing='7'>
                            <HStack w='full' justifyContent='space-between' >
                                <Text as='b'>Tổng tiền:</Text>
                                <Text as='b' fontSize='20px'>{props.order?.total.toLocaleString()} đ</Text>
                            </HStack>
                            <HStack w='full' justifyContent='space-between'>
                                    <Text as='b'>Thời gian tạo đơn:</Text>
                                    <Text as='b' fontSize='20px'>{dayjs(props.order?.created_at).format('HH:mm - DD/MM/YYYY')}</Text>
                                </HStack>
                            <HStack w='full' justifyContent='space-between'>
                                <Text as='b'>Trạng thái đơn hàng</Text>
                                {
                                    Object.entries(OrderStatusMap).filter(([name_id, ]) => props.order?.status == name_id).map(([name_id, { name, color }]) => (
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
                        </VStack>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}