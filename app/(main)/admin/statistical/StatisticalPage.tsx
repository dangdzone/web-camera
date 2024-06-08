
import { Order } from "@/type"
import { Center, Divider, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/layout"
import { Select } from "@chakra-ui/react"
import { useCollectionData } from "@livequery/react"
import { FaCheck } from "react-icons/fa6"
import { FiPlus } from "react-icons/fi"
import { IoMdClose } from "react-icons/io"
import { RiShoppingBagLine } from "react-icons/ri"
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

export const StatisticalPage = () => {

    const $orders = useCollectionData<Order>('orders')
    const order_created = $orders.items.filter(a => a.status == 'created')
    const order_paid = $orders.items.filter(a => a.status == 'paid')
    const order_cancel = $orders.items.filter(a => a.status == 'cancel')

    const OrderList = [
        { name: 'Tổng đơn hàng', value: $orders.items.length, icon: <RiShoppingBagLine size='25px' />, color: 'gray' },
        { name: 'Đơn đã tạo', value: order_created.length, icon: <FiPlus size='25px' />, color: 'green' },
        { name: 'Đơn đã thanh toán', value: order_paid.length, icon: <FaCheck size='25px' />, color: 'blue' },
        { name: 'Đơn đã hủy', value: order_cancel.length, icon: <IoMdClose size='25px' />, color: 'red' },
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

    return (
        <Stack w='full' spacing='7'>
            <HStack w='full' justifyContent='space-between' spacing='5'>
                <Text fontWeight='700' fontSize='18px' whiteSpace='nowrap'>Thống kê</Text>
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
            </HStack>
            <SimpleGrid w='full' spacing='4' columns={[1, 2, 3, 4]}>
                {
                    OrderList.map((item, i) => (
                        <HStack w='full' _hover={{ bg: `${item.color}.50` }} key={i} px='2' py='4' border='1px' borderRadius='10px' borderColor='blackAlpha.200'>
                            <Center boxSize='10' color={`${item.color}.500`}>{item.icon}</Center>
                            <Divider h='20px' orientation='vertical' />
                            <Stack spacing='0' px='2'>
                                <Text color={`${item.color}.500`}>{item.name}</Text>
                                <Text fontWeight='700' fontSize='18px'>{item.value}</Text>
                            </Stack>
                        </HStack>
                    ))
                }
            </SimpleGrid>
        </Stack>
    )
}