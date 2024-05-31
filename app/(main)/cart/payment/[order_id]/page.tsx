'use client'

import { Order } from "@/type"
import { Divider, HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { useDocumentData } from "@livequery/react"
import { useParams } from "next/navigation"
import { OrderItem } from "./OrderItem"
import { Button, Select, Spinner } from "@chakra-ui/react"
import { ReceiverInfo } from "./ReceiverInfo"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { useState } from "react"

export default function OrderPage() {

    const params = useParams()
    const { fuser } = useFirebaseUserContext()
    const { item: order, loading } = useDocumentData<Order>(fuser && `customers/${fuser.uid}/orders/${params.order_id}`)
    const [type, set_type] = useState<string>('momo')

    if (loading || !order) return <Spinner />

    const total_pay = order.pay + order.shipping_fee
    const statistical = [
        { name: 'Mã đơn hàng', value: order.code, unit: '' },
        { name: 'Số lượng sản phẩm', value: order.amount, unit: '' },
        { name: 'Tiền hàng (tạm tính)', value: order.pay, unit: 'đ' },
        { name: 'Phí vận chuyển', value: order.shipping_fee, unit: 'đ' },
    ]

    const pay = async () => {
        try {
            const result = await order.__trigger('pay', { type }) as {
                data: {
                    item: {
                        url: string
                    }
                }
            }
            if (result?.data.item.url) {
                window.location.href= result?.data.item.url
            }
        } catch (error) {

        }
    }


    return (

        <VStack w='full' spacing='5'>
            <VStack w='full'>
                {
                    order.order_items.map((order, i) => (
                        <OrderItem key={i} order={order} />
                    ))
                }
            </VStack>
            <Stack w='full'>
                <Text fontWeight='600'>Thống kê đơn hàng</Text>
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
            {
                order.status == 'created' && (
                    <Stack w='full'>
                        <Text fontWeight='600'>Chọn phương thức thanh toán</Text>
                        <VStack w='full' border='1px' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
                            <Select variant='filled' onChange={(e) => set_type(e.target.value)}>
                                <option value='momo'>Ví momo</option>
                                <option value='zalopay'>Zalo pay</option>
                                <option value='option3'>VNPAY</option>
                                <option value='option3'>Chuyển khoản ngân hàng</option>
                            </Select>
                        </VStack>
                    </Stack>
                )
            }
            <Stack w='full'>
                <Text fontWeight='600'>Thông tin nhận hàng</Text>
                <ReceiverInfo receiver={order.receiver_info} />
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
                {order.status == 'created' && <Button w='full' borderRadius='10px' colorScheme='red' onClick={pay}>Thanh toán</Button>}
                {order.status == 'paid' && <Button w='full' borderRadius='10px' colorScheme='green'>Đã thanh toán</Button>}
            </VStack>
        </VStack>
    )
}