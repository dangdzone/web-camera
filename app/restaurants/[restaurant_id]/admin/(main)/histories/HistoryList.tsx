
import { OrderStatusMap } from "@/text"
import { theme } from "@/theme"
import { Button, HStack, SimpleGrid, Spinner, Text, VStack, Wrap, useColorMode } from "@chakra-ui/react"
import { useState } from "react"
import { OrderListItem } from "../orders/OrderListItem"
import { Order, Restaurant } from "@/types"
import { useCollectionData } from "@livequery/react"
import { SmartQueryItem } from "@livequery/client"
import { HistoryModal } from "./HistoryModal"

export type HistoryList = {
    restaurant: Restaurant
}

export const HistoryList = ({ restaurant }: HistoryList) => {

    const { colorMode } = useColorMode()
    const [date, setDate] = useState<Date>()
    const [actice_order, set_active_order] = useState<undefined | null | SmartQueryItem<Order>>(null)

    const $orders = useCollectionData<Order>(`restaurants/${restaurant.id}/orders`)
    const orders = $orders.items.filter(a => (a.status !== 'requested') && (a.status !== 'unpaid'))
    const { filters, filter } = $orders

    return (
        <VStack w='full' spacing='5'>
            {
                actice_order !== null && (
                    <HistoryModal
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
                    <Text fontWeight='600'>Lịch sử đơn hàng</Text>
                    {/* <DatePicker date={date} onChange={setDate} /> */}
                </HStack>
                <Wrap spacing={{ base: '2', md: '4' }} w='full' px='4'>
                    <Button
                        colorScheme='red'
                        onClick={() => filter({
                            ...filters,
                            status: undefined
                        })}
                        variant={!filters.status ? 'solid' : 'outline'}
                    >
                        Tất cả
                    </Button>

                    {
                        Object.entries(OrderStatusMap).filter(([name_id,]) => (name_id !== 'requested') && (name_id !== 'unpaid')).map(([name_id, { name, color }]) => (
                            <Button
                                key={name_id}
                                colorScheme={color}
                                onClick={() => filter({
                                    ...filters,
                                    status: name_id
                                })}
                                variant={name_id == filters.status ? 'solid' : 'outline'}
                            >
                                {name}
                            </Button>
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
                {
                    $orders.loading && <Spinner color="teal.500" size='lg' />
                }
                {
                    $orders.empty && <Text fontSize='18px' color="teal.500">Chưa có món...</Text>
                }
            </VStack>
        </VStack>
    )
}