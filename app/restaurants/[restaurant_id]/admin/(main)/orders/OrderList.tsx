
import { theme } from "@/theme"
import { HStack, SimpleGrid, Stack, Text, VStack, Wrap } from "@chakra-ui/layout"
import { Button, Select, Spinner, useColorMode } from "@chakra-ui/react"
import { OrderListItem } from "./OrderListItem"
import { OrderStatusMap } from "@/text"
import { useState } from "react"
import { OrderModal } from "./OrderModal"
import { useCollectionData } from "@livequery/react"
import { Order } from "@/types"
import { SmartQueryItem } from "@livequery/client"
import { getRestaurantContext } from "@/hooks/useRestaurant"
import { IoFileTrayFull } from "react-icons/io5";
import { SearchBox } from "@/components/common/SearchBox"

export const OrderList = () => {

    const r = getRestaurantContext()
    const { colorMode } = useColorMode()
    // const [active_order_create, set_active_order_create] = useState<undefined | null | SmartQueryItem<Restaurant>>(null)
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

    const { items: orders } = $orders
    const order_list = orders.filter(a => (a.status !== 'pay') && (a.status !== 'cancel'))

    // Tổng đơn
    const order_total = orders.length
    // Đã yêu cầu
    const order_requested = orders.filter(order => order.status == 'requested').length
    // Chờ thanh toán
    const order_unpaid = orders.filter(order => order.status == 'unpaid').length
    // Đã thanh toán 
    const order_pay = orders.filter(order => order.status == 'pay').length
    // Hủy
    const order_cancel = orders.filter(order => order.status == 'cancel').length

    const order_status = [
        { name: 'Tổng đơn', value: order_total, color: '#5C6BC0' },
        { name: 'Đã yêu cầu', value: order_requested, color: 'green.500' },
        { name: 'Chờ thanh toán', value: order_unpaid, color: 'orange.500' },
        { name: 'Đã thanh toán', value: order_pay, color: 'blue.500' },
        { name: 'Hủy đơn', value: order_cancel, color: 'red.500' },
    ]

    return (
        <VStack w='full' spacing='5'>
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
                    {/* <Button size='sm' onClick={() => set_active_order_create(undefined)}>Tạo đơn mới</Button> */}
                </HStack>

                <Stack w='full' py='5' p='4' spacing='5'>
                    <HStack w='full'>
                        <Text w='full' fontWeight='600' textTransform='uppercase'>Thống kê</Text>
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
                    <SimpleGrid w='full' columns={[1, 1, 2, 4]} spacing={'4'} >
                        {
                            order_status.map((item, i) => (
                                <VStack key={i} w='full' bg={item.color} py='4' borderRadius='5px' spacing='0' color='white'>
                                    <Text fontWeight='700' fontSize='20px'>{item.value}</Text>
                                    <Text>{item.name}</Text>
                                </VStack>
                            ))
                        }
                    </SimpleGrid>
                </Stack>
                <VStack w='full' py='5' p='4' spacing='7'>
                    <Text w='full' fontWeight='600' textTransform='uppercase'>Đơn hàng</Text>
                    <HStack w={{ base: '100%', md: '70%' }}>
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
                    <Wrap spacing={{ base: '2', md: '4' }} w='full'>
                        <Button
                            colorScheme='red'
                            leftIcon={<IoFileTrayFull />}
                            onClick={() => $orders.filter({
                                ...$orders.filters,
                                status: undefined
                            })}
                            variant={!$orders.filters.status ? 'solid' : 'outline'}
                        >
                            Tất cả
                        </Button>

                        {
                            Object.entries(OrderStatusMap).filter(([name_id,]) => (name_id !== 'pay') && (name_id !== 'cancel')).map(([name_id, { name, color, icon }]) => (
                                <Button
                                    key={name_id}
                                    colorScheme={color}
                                    leftIcon={icon}
                                    onClick={() => $orders.filter({
                                        ...$orders.filters,
                                        status: name_id
                                    })}
                                    variant={name_id == $orders.filters.status ? 'solid' : 'outline'}
                                >
                                    {name}
                                </Button>
                            ))
                        }
                    </Wrap>
                    <SimpleGrid w='full' columns={[1, 1, 1, 2]} spacing='4'>
                        {
                            order_list.map((order, i) => (
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
                {
                    $orders.loading && <Spinner color="teal.500" size='lg' />
                }
                {
                    order_list.length == 0 && <Text fontSize='18px' color="teal.500">Chưa có...</Text>
                }

            </VStack>
        </VStack>
    )
}