
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Order } from "@/type"
import { HStack, Stack, VStack, Wrap } from "@chakra-ui/layout"
import { useCollectionData } from "@livequery/react"
import { OrderItem } from "./OrderItem"
import { ListRender } from "@/components/common/ListRender"
import { EmptyBox } from "@/components/empty/EmptyBox"
import { Button, Select } from "@chakra-ui/react"
import { OrderStatusMap } from "@/text"
import { SearchBox } from "@/components/common/SearchBox"
import { useState } from "react"
import { OrderItemModal } from "./OrderItemModal"
import { SmartQueryItem } from "@livequery/client"
import {
    startOfWeek,
    endOfWeek,
    subDays,
    startOfDay,
    endOfDay,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    subWeeks,
    subMonths,
    subYears
} from 'date-fns';

export const OrderPage = () => {

    const { fuser } = useFirebaseUserContext()
    const $orders = useCollectionData<Order>(fuser && 'orders')
    const [active_order, set_active_modal] = useState<SmartQueryItem<Order> | null>(null)

    const filter = (group_by: 'all' | 'yesterday' | 'today' | 'this_week' | 'this_month' | 'this_year' | 'last_week' | 'last_month' | 'last_year') => {

        const today = new Date()
        if (group_by == 'today') { // Hôm nay
            $orders.filter({
                "created_at:gte": startOfDay(today).getTime(),
                "created_at:lt": endOfDay(today).getTime()
            })
        }
        if (group_by == 'yesterday') { // Hôm qua
            $orders.filter({
                "created_at:gte": startOfDay(subDays(today, 1)).getTime(),
                "created_at:lt": endOfDay(subDays(today, 1)).getTime()
            })
        }
        if (group_by == 'this_week') { // Tuần này
            $orders.filter({
                "created_at:gte": startOfWeek(today, { weekStartsOn: 1 }).getTime(),
                "created_at:lt": endOfWeek(today, { weekStartsOn: 1 }).getTime(),
            })
        }
        if (group_by == 'last_week') { // Tuần trước
            $orders.filter({
                "created_at:gte": startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }).getTime(),
                "created_at:lt": endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }).getTime(),
            })
        }
        if (group_by == 'this_month') { // Tháng này
            $orders.filter({
                "created_at:gte": startOfMonth(today).getTime(),
                "created_at:lt": endOfMonth(today).getTime(),
            })
        }
        if (group_by == 'last_month') { // Tháng trước
            $orders.filter({
                "created_at:gte": startOfMonth(subMonths(today, 1)).getTime(),
                "created_at:lt": endOfMonth(subMonths(today, 1)).getTime(),
            })
        }
        if (group_by == 'this_year') { // Năm nay
            $orders.filter({
                "created_at:gte": startOfYear(today).getTime(),
                "created_at:lt": endOfYear(today).getTime(),
            })
        }
        if (group_by == 'last_year') { // Năm trước
            $orders.filter({
                "created_at:gte": startOfYear(subYears(today, 1)).getTime(),
                "created_at:lt": endOfYear(subYears(today, 1)).getTime(),
            })
        }
        if (group_by == 'all') { // Tất cả
            $orders.filter({})
        }
    }

    return (
        <VStack w='full' spacing='5'>
            {
                active_order !== null && (
                    <OrderItemModal onClose={() => set_active_modal(null)} order={active_order} />
                )
            }
            <HStack w='full' justifyContent='space-between'>
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
                <Select borderRadius='10px' w={{ base: '50%', md: '30%' }} onChange={(e) => { filter(e.target.value as any) }}>
                    <option value='all' >Tất cả các ngày</option>
                    <option value='today'>Hôm nay</option>
                    <option value='yesterday'>Hôm qua</option>
                    <option value='this_week' >Tuần này</option>
                    <option value='last_week'>Tuần trước</option>
                    <option value='this_month'>Tháng này</option>
                    <option value='last_month'>Tháng trước</option>
                    <option value='this_year'>Năm nay</option>
                    <option value='last_year'>Năm ngoái</option>
                </Select>
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