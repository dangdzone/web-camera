
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Order } from "@/type"
import { Stack, Text, Wrap } from "@chakra-ui/layout"
import { useCollectionData } from "@livequery/react"
import { OrderItem } from "./OrderItem"
import { ListRender } from "@/components/common/ListRender"
import { EmptyBox } from "@/components/empty/EmptyBox"
import { Button } from "@chakra-ui/react"
import { OrderStatusMap } from "@/text"

export const OrderPage = () => {

    const { fuser } = useFirebaseUserContext()
    const $orders = useCollectionData<Order>(fuser && 'orders')

    return (
        <Stack w='full' spacing='5'>
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
                                <OrderItem key={order.id} order={order} />
                            )}
                            day_group
                            empty_alert={<EmptyBox boxSize="50px" />}
                            spacing='4'
                            loading_date
                        />
                    )
                }
            </Stack>
        </Stack>
    )
}