'use client'

import { ListRender } from "@/components/common/ListRender"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { OrderStatusMap } from "@/text"
import { Order } from "@/type"
import { Box, Divider, HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { Button, Tag } from "@chakra-ui/react"
import { useDocumentData } from "@livequery/react"
import dayjs from "dayjs"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { OrderIdItem } from "./OrderIdItem"
import { ReceiverInfo } from "@/app/(main)/cart/payment/[order_id]/ReceiverInfo"
import { useEffect, useState } from "react"

export default function OrderIdPage(props: {
    params: {
        order_id: string
    }
}) {
    const { fuser } = useFirebaseUserContext()
    const { item: $order_item } = useDocumentData<Order>(`orders/${props.params.order_id}`)
    const status_order = Object.entries(OrderStatusMap).filter(([status,]) => status == $order_item?.status).map(([status_id, { color, name }]) => [{ name, color }])[0]

    const total_pay = $order_item?.pay + $order_item?.shipping_fee
    const statistical = [
        { name: 'Số lượng sản phẩm', value: $order_item?.amount, unit: '' },
        { name: 'Tiền hàng (tạm tính)', value: $order_item?.pay, unit: 'đ' },
        { name: 'Phí vận chuyển', value: $order_item?.shipping_fee, unit: 'đ' },
    ]

    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const currentTime = dayjs().format('DD/MM/YYYY - HH:mm');
        setTime(currentTime);
    }, []);

    return (
        <Stack w='full' spacing='7'>
            <HStack spacing='5'>
                <Link href={'/member/histories'}>
                    <FiArrowLeft size='20px' />
                </Link>
                <Text fontWeight='700' fontSize='18px'>Chi tiết đơn hàng</Text>
            </HStack>
            <Stack w='full'>
                <HStack w='full' justifyContent='space-between'>
                    <HStack>
                        <Text fontSize='15px'>Mã đơn hàng:</Text>
                        <Text fontWeight='700'>{$order_item?.id}</Text>
                    </HStack>
                    <Tag colorScheme={status_order?.map(a => a.color)[0]}>{status_order?.map(a => a.name)[0]}</Tag>
                </HStack>
                <HStack>
                    <Text fontSize='15px'>Tạo lúc:</Text>
                    <Text fontWeight='600'>{time}</Text>
                </HStack>
            </Stack>
            <Stack w='full'>
                {
                    $order_item?.order_items.map((order_item, i) => (
                        <OrderIdItem key={i} order_item={order_item} />
                    ))
                }
            </Stack>
            <Stack w='full'>
                <Text fontWeight='600'>Thông tin nhận hàng</Text>
                <ReceiverInfo receiver={$order_item?.receiver_info} />
            </Stack>
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
            {
                $order_item?.status == 'created' && (
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
                )
            }
        </Stack>
    )
}