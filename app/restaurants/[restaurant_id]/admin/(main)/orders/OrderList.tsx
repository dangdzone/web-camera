
import { theme } from "@/theme"
import { HStack, SimpleGrid, Text, VStack, Wrap } from "@chakra-ui/layout"
import { Button, useColorMode } from "@chakra-ui/react"
import { OrderListItem } from "./OrderListItem"
import { OrderStatusMap } from "@/text"
import { useState } from "react"
import { OrderCreateModal } from "./create/OrderCreateModal"
import { OrderModal } from "./OrderModal"
import { useCollectionData } from "@livequery/react"
import { Order, Restaurant } from "@/types"
import { SmartQueryItem } from "@livequery/client"

export type OrderList = {
    restaurant: Restaurant
}

export const OrderList = ({ restaurant }: OrderList) => {

    const { colorMode } = useColorMode()
    const [active_order_create, set_active_order_create] = useState<undefined | null | SmartQueryItem<Restaurant>>(null)
    const [actice_order, set_active_order] = useState<undefined | null | SmartQueryItem<Order>>(null)

    const $orders = useCollectionData<Order>(`restaurants/${restaurant.id}/orders`)
    const orders = $orders.items

    return (
        <VStack w='full' spacing='5'>
            {
                active_order_create !== null && (
                    <OrderCreateModal
                        onClose={() => set_active_order_create(null)}
                        restaurant={active_order_create}
                    />
                )
            }
            {
                actice_order !== null && (
                    <OrderModal
                        onClose={() => set_active_order(null)}
                        order={actice_order}
                    />
                )
            }
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
                    <Text fontWeight='600'>Gọi món</Text>
                    <Button size='sm' onClick={() => set_active_order_create(undefined)}>Tạo đơn mới</Button>
                </HStack>
                <Wrap spacing={{ base: '2', md: '4' }} w='full' px='4'>
                    {
                        OrderStatusMap.map(({ color, name }, i) => (
                            <Button size={{ base: 'sm', md: 'md' }} key={i} colorScheme={color}>{name}</Button>
                        ))
                    }
                </Wrap>
                <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4' px='4'>
                    {
                        orders.map((order, i) => (
                            <OrderListItem
                                key={order.id}
                                order={order}
                                index={i + 1}
                                onClick={() => set_active_order(order)}
                            />
                        ))
                    }
                </SimpleGrid>
            </VStack>
        </VStack>
    )
}