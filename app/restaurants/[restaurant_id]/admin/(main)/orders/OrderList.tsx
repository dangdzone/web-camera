
import { theme } from "@/theme"
import { HStack, SimpleGrid, Stack, Text, VStack, Wrap } from "@chakra-ui/layout"
import { Button, Spinner, useColorMode } from "@chakra-ui/react"
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

    const $orders = useCollectionData<Order>(`restaurants/${r.id}/orders`)
    const { filters, filter, items: orders } = $orders
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
                    <Text fontWeight='600' textTransform='uppercase'>Thống kê</Text>
                    <SimpleGrid w='full' columns={[1, 1, 2, 3, 4]} spacing={'4'} >
                        {
                            order_status.map((item, i) => (
                                <VStack w='full' bg={item.color} py='4' borderRadius='5px' spacing='0' color='white'>
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
                            placeholder='Tìm kiếm món...'
                            onSearch={value => $orders.filter({
                                ...$orders.filters,
                                // "search:like": value,
                                // "note:like": value,
                                // "from:like": value
                            })}
                        />
                    </HStack>
                    <Wrap spacing={{ base: '2', md: '4' }} w='full'>
                        <Button
                            colorScheme='red'
                            leftIcon={<IoFileTrayFull />}
                            onClick={() => filter({
                                ...filters,
                                status: undefined
                            })}
                            variant={!filters.status ? 'solid' : 'outline'}
                        >
                            Tất cả
                        </Button>

                        {
                            Object.entries(OrderStatusMap).filter(([name_id,]) => (name_id !== 'pay') && (name_id !== 'cancel')).map(([name_id, { name, color, icon }]) => (
                                <Button
                                    key={name_id}
                                    colorScheme={color}
                                    leftIcon={icon}
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