
import { OrderStatusMap } from "@/text"
import { theme } from "@/theme"
import { Button, HStack, Select, SimpleGrid, Spinner, Text, VStack, Wrap, useColorMode } from "@chakra-ui/react"
import { useState } from "react"
import { OrderListItem } from "../orders/OrderListItem"
import { Order } from "@/types"
import { useCollectionData } from "@livequery/react"
import { SmartQueryItem } from "@livequery/client"
import { HistoryModal } from "./HistoryModal"
import { getRestaurantContext } from "@/hooks/useRestaurant"
import { IoFileTrayFull } from "react-icons/io5";
import { SearchBox } from "@/components/common/SearchBox"

export const HistoryList = () => {

    const r = getRestaurantContext()
    const { colorMode } = useColorMode()
    const [date, setDate] = useState<Date>()
    const [actice_order, set_active_order] = useState<undefined | null | SmartQueryItem<Order>>(null)


    const today = new Date()
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getTime()

    const $orders = useCollectionData<Order>(`restaurants/${r.id}/orders`, {
        filters: {
            "created_at:gte": startOfDay,
            "created_at:lt": endOfDay,
        }
    })

    const filter = (group_by: 'by_yesterday' | 'by_day' | 'by_week' | 'by_month' | 'by_year') => {

        const today = new Date();

        if (group_by == 'by_yesterday') {

            $orders.filter({
                "created_at:gte": startOfDay - 24 * 60 * 60 * 1000,
                "created_at:lt": startOfDay,
            })
        }

        if (group_by == 'by_day') {

            $orders.filter({
                "created_at:gte": startOfDay,
                "created_at:lt": endOfDay,
            })
        }

        if (group_by == 'by_week') {

            // Tính toán thời gian bắt đầu của tuần
            const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
            // Tính toán thời gian kết thúc của tuần
            const endOfWeek = new Date(today.getFullYear(), today.getMonth(), startOfWeek.getDate() + 6);
            $orders.filter({
                "created_at:gte": startOfWeek.getTime(),
                "created_at:lt": endOfWeek.getTime(),
            })
        }

        if (group_by == 'by_month') {

            // Lấy ngày đầu tiên của tháng
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            // Lấy ngày cuối cùng của tháng
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            $orders.filter({
                "created_at:gte": firstDayOfMonth.getTime(),
                "created_at:lt": lastDayOfMonth.getTime(),
            })
        }

        if (group_by == 'by_year') {

            // Lấy thời gian đầu năm
            const startOfYear = new Date(today.getFullYear(), 0, 1);
            // Lấy thời gian cuối năm
            const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

            $orders.filter({
                "created_at:gte": startOfYear.getTime(),
                "created_at:lt": endOfYear.getTime(),
            })
        }

    }

    const orders = $orders.items.filter(a => (a.status !== 'requested') && (a.status !== 'unpaid'))
    const { filters } = $orders

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
                spacing='7'
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
                <HStack w='full' justifyContent='flex-end' px='4'>
                    <Select
                        w={{ base: '60%', md: '30%' }}
                        onChange={(e) => {
                            filter(e.target.value as any)
                        }}
                    >
                        <option value='by_day' >Hôm nay</option>
                        <option value='by_yesterday'>Hôm qua</option>
                        <option value='by_week' >Tuần này</option>
                        <option value='by_month'>Tháng này</option>
                        <option value='by_year'>Năm này</option>
                    </Select>
                </HStack>
                <HStack w={{ base: '100%', md: '70%' }} px='4'>
                    <SearchBox
                        placeholder='Tìm kiếm đơn hàng...'
                        onSearch={value => $orders.filter({
                            ...$orders.filters,
                            "status:like": value,
                            "customer_name:like": value,
                            "table_id:like": value
                        })}
                    />
                </HStack>
                <Wrap spacing={{ base: '2', md: '4' }} w='full' px='4'>
                    <Button
                        colorScheme='red'
                        leftIcon={<IoFileTrayFull />}
                        onClick={() => $orders.filter({
                            ...$orders.filters,
                            status: undefined
                        })}
                        variant={!filters.status ? 'solid' : 'outline'}
                    >
                        Tất cả
                    </Button>

                    {
                        Object.entries(OrderStatusMap).filter(([name_id,]) => (name_id !== 'requested') && (name_id !== 'unpaid')).map(([name_id, { name, color, icon }]) => (
                            <Button
                                key={name_id}
                                colorScheme={color}
                                leftIcon={icon}
                                onClick={() => $orders.filter({
                                    ...$orders.filters,
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
                    orders.length == 0 && <Text fontSize='18px' color="teal.500">Chưa có món...</Text>
                }
            </VStack>
        </VStack>
    )
}