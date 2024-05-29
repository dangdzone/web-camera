'use client'

import { OrderStatusMap } from "@/text";
import { Order } from "@/type";
import { Divider, HStack, Stack, Text, VStack, Wrap } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useCollectionData } from "@livequery/react";
import { HistoryItem } from "./HistoryItem";
import { ListRender } from "@/components/common/ListRender";
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser";
import { EmptyBox } from "@/components/empty/EmptyBox";

export default function HistoryPage() {

    const { fuser } = useFirebaseUserContext()
    const $orders = useCollectionData<Order>(fuser && `customers/${fuser.uid}/orders`)

    const accumulateMoney = $orders.items.filter(a => a.status == 'pay').reduce((total, item) => total + item.pay, 0)
    const statisticalOrder = [
        { name: 'Tổng đơn hàng', value: $orders.items.length, unit: '' },
        { name: 'Tổng tiền', value: accumulateMoney, unit: 'đ' },
    ]

    return (
        <VStack w='full' spacing='5'>
            <HStack w='full' p='5' borderRadius='10px' border='1px' borderColor='blackAlpha.100' divider={<Divider height={'50px'} orientation='vertical' />}>
                {
                    statisticalOrder.map((item, i) => (
                        <VStack w='full' key={i}>
                            <Text fontSize='25px' fontWeight='800'>{item.value?.toLocaleString()}{item.unit}</Text>
                            <Text>{item.name}</Text>
                        </VStack>
                    ))
                }
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
                                <HistoryItem key={order.id} order={order} />
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