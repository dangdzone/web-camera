'use client'

import { OrderStatusMap } from "@/text";
import { Order } from "@/type";
import { HStack, Stack, Text, VStack, Wrap } from "@chakra-ui/layout";
import { Button, Select } from "@chakra-ui/react";
import { useCollectionData } from "@livequery/react";
import { HistoryItem } from "./HistoryItem";
import { ListRender } from "@/components/common/ListRender";
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser";
import { EmptyBox } from "@/components/empty/EmptyBox";
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
import { SearchBox } from "@/components/common/SearchBox";

export default function HistoryPage() {

    const { fuser } = useFirebaseUserContext()
    const $orders = useCollectionData<Order>(fuser && `customers/${fuser.uid}/orders`)

    const accumulateMoney = $orders.items.filter(a => a.status == 'paid').reduce((total, item) => total + item.pay, 0)
    const statisticalOrder = [
        { name: 'Tổng đơn hàng', value: $orders.items.length, unit: '' },
        { name: 'Tổng tiền đã thanh toán', value: accumulateMoney, unit: 'đ' },
    ]

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

    return fuser && (
        <VStack w='full' spacing='5'>
            <Stack w='full' spacing='4' flexDir={{base: 'column', md: 'row'}}>
                {
                    statisticalOrder.map((item, i) => (
                        <VStack w='full' key={i} p={{ base: '3', md: '5' }} spacing='0' borderRadius='10px' border='1px' borderColor='blackAlpha.200'>
                            <Text fontSize='25px' fontWeight='800'>{item.value?.toLocaleString()}{item.unit}</Text>
                            <Text textAlign='center'>{item.name}</Text>
                        </VStack>
                    ))
                }
            </Stack>
            <Stack w='full' justifyContent={{ base: 'center', md: 'flex-end' }} flexDir={{ base: 'column', md: 'row' }}>
                <HStack w={{ base: '100%', md: '40%' }}>
                    <SearchBox
                        placeholder={'Tìm kiếm đơn hàng...'}
                        onSearch={value => $orders.filter({
                            ...$orders.filters,
                            "_id:like": value,
                            "code:like": value,
                            "status:like": value
                        })}
                    />
                </HStack>
                <Select borderRadius='10px' w={{ base: '100%', md: '30%' }} onChange={(e) => { filter(e.target.value as any) }}>
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
            </Stack>
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