
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Order } from "@/type"
import { HStack, Stack, VStack, Wrap } from "@chakra-ui/layout"
import { useCollectionData, useDocumentData } from "@livequery/react"
import { OrderItem } from "./OrderItem"
import { ListRender } from "@/components/common/ListRender"
import { EmptyBox } from "@/components/empty/EmptyBox"
import { Button } from "@chakra-ui/react"
import { OrderStatusMap } from "@/text"
import { SearchBox } from "@/components/common/SearchBox"
import { useState } from "react"
import { OrderItemModal } from "./OrderItemModal"
import { SmartQueryItem } from "@livequery/client"

export const OrderPage = () => {

    const { fuser } = useFirebaseUserContext()
    const $orders = useCollectionData<Order>(fuser && 'orders')
    const [active_order, set_active_modal] = useState<SmartQueryItem<Order> | null>(null)
    
    return (
        <VStack w='full' spacing='5'>
            {
                active_order !== null && (
                    <OrderItemModal onClose={() => set_active_modal(null)} order={active_order} />
                )
            }
            <HStack w='40%'>
                <SearchBox
                    placeholder={'Tìm kiếm đơn hàng...'}
                    onSearch={value => $orders.filter({
                        ...$orders.filters,
                        "_id:like": value,
                        "status:like": value,
                        "customer_id:like": value,
                        "code:like": value,
                    })}
                />
            </HStack>
            <Wrap spacing={{ base: '2', md: '4' }} w='full' >
                <Button
                    colorScheme={!$orders.filters.status ? 'red' : 'gray'}
                    onClick={() => $orders.filter({
                        ...$orders.filters,
                        status: undefined
                    })}
                    variant={!$orders.filters.status ? 'solid' : 'outline'}
                    borderRadius='10px'
                >
                    Tất cả
                </Button>
                {
                    Object.entries(OrderStatusMap).map(([status, { color, name }]) => (
                        <Button
                            key={status}
                            colorScheme={status == $orders.filters.status ? 'red' : 'gray'}
                            onClick={() => $orders.filter({
                                ...$orders.filters,
                                status: status
                            })}
                            variant={status == $orders.filters.status ? 'solid' : 'outline'}
                            borderRadius='10px'
                        >
                            {name}
                        </Button>
                    ))
                }
            </Wrap>
            <Stack w='full'>
                {
                    fuser && (
                        <ListRender
                            collection={$orders}
                            render={order => (
                                <OrderItem key={order.id} order={order} onClick={() => set_active_modal(order)} />
                            )}
                            day_group
                            empty_alert={<EmptyBox boxSize="50px" />}
                            spacing='4'
                            loading_date
                        />
                    )
                }
            </Stack>
        </VStack>
    )
}