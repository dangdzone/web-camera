'use client'

import { Order } from "@/type"
import { Divider, HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { useDocumentData } from "@livequery/react"
import { useParams } from "next/navigation"
import { OrderItem } from "./OrderItem"
import { Button, Select } from "@chakra-ui/react"
import { ReceiverInfo } from "./ReceiverInfo"

export default function OrderPage() {

    const params = useParams()
    const { item: $order } = useDocumentData<Order>(`orders/${params.order_id}`)
    const total_pay = $order?.pay + $order?.shipping_fee
    const statistical = [
        { name: 'Số lượng sản phẩm', value: $order?.amount, unit: '' },
        { name: 'Tiền hàng (tạm tính)', value: $order?.pay, unit: 'đ' },
        { name: 'Phí vận chuyển', value: $order?.shipping_fee, unit: 'đ' },
    ]

    return (
        <VStack w='full' spacing='5'>
            <VStack w='full'>
                {
                    $order?.order_items.map((order, i) => (
                        <OrderItem key={i} order={order} />
                    ))
                }
            </VStack>
            <Stack w='full'>
                <Text fontWeight='600'>Thống kê</Text>
                <VStack w='full' border='1px' borderColor='blackAlpha.200' borderRadius='10px' p='4' spacing='4'>
                    {
                        statistical.map((item, i) => (
                            <HStack w='full' key={i} justifyContent='space-between'>
                                <Text opacity='0.8'>{item.name}</Text>
                                <Text fontWeight='600'>{item.value?.toLocaleString()}{item.unit}</Text>
                            </HStack>
                        ))
                    }
                    <Divider />
                    <HStack w='full' justifyContent='space-between'>
                        <Text opacity='0.8'>Tổng tiền thanh toán</Text>
                        <Text fontWeight='700' color='red.500'>{total_pay.toLocaleString()}đ</Text>
                    </HStack>
                </VStack>
            </Stack>
            <Stack w='full'>
                <Text fontWeight='600'>Chọn phương thức thanh toán</Text>
                <VStack w='full' border='1px' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
                    <Select variant='filled'>
                        <option value='option1'>Ví momo</option>
                        <option value='option2'>Zalo pay</option>
                        <option value='option3'>Chuyển khoản ngân hàng</option>
                        <option value='option3'>VNPAY</option>
                    </Select>
                </VStack>
            </Stack>
            <Stack w='full'>
                <Text fontWeight='600'>Thông tin nhận hàng</Text>
                <ReceiverInfo receiver={$order?.receiver_info} />
            </Stack>
            <VStack
                p='4' w='full'
                spacing='5'
                boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                borderRadius='10px'
                pos='sticky'
                bottom='0'
                zIndex='999'
                bg='#FFFFFF'
                border='1px'
                borderColor='blackAlpha.200'
            >
                <Button w='full' borderRadius='10px' colorScheme='red'>Thanh toán</Button>
            </VStack>
        </VStack>
    )
}