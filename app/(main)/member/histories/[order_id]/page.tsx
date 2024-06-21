'use client'

import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { OrderStatusMap } from "@/text"
import { Order } from "@/type"
import { Divider, HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { useDocumentData } from "@livequery/react"
import dayjs from "dayjs"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { OrderIdItem } from "./OrderIdItem"
import { ReceiverInfo } from "@/app/(main)/cart/payment/[order_id]/ReceiverInfo"
import { useEffect, useRef, useState } from "react"
import { FaRegFilePdf } from "react-icons/fa6"
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function OrderIdPage(props: {
    params: {
        order_id: string
    }
}) {
    const { fuser } = useFirebaseUserContext()
    const { item: $order_item } = useDocumentData<Order>(fuser && `customers/${fuser.uid}/orders/${props.params.order_id}`)
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

    const printRef = useRef<HTMLDivElement>(null);

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (element) {
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`donhang_${$order_item.code}.pdf`);
        }
    };

    return (
        <Stack w='full' spacing='5'>
            <HStack w='full' justifyContent='space-between'>
                <HStack spacing='5'>
                    <Link href={'/member/histories'}>
                        <FiArrowLeft size='20px' />
                    </Link>
                    <Text fontWeight='600' fontSize='18px'>Chi tiết đơn hàng</Text>
                </HStack>
                {
                    $order_item?.status == 'paid' && (
                        <Button size='sm' borderRadius='10px' variant='outline' leftIcon={<FaRegFilePdf />} onClick={handleDownloadPdf}>Xuất pdf</Button>
                    )
                }
            </HStack>
            <Stack w='full' spacing='7' p='2' ref={printRef}>
                <Stack w='full'>
                    <HStack w='full' justifyContent='space-between'>
                        <HStack>
                            <Text fontSize='15px'>Mã đơn hàng:</Text>
                            <Text fontWeight='600'>{$order_item?.code}</Text>
                        </HStack>
                        <Text fontWeight='500' color={status_order?.map(a => a.color)[0]}>{status_order?.map(a => a.name)[0]}</Text>
                    </HStack>
                    <HStack>
                        <Text fontSize='15px'>Tạo lúc:</Text>
                        <Text fontWeight='500'>{time}</Text>
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
                    <Text fontWeight='500'>Thông tin nhận hàng</Text>
                    <ReceiverInfo address_id={$order_item?.address_id} />
                </Stack>
                <Stack w='full'>
                    <Text fontWeight='500'>Ghi chú</Text>
                    <Stack w='full' border='1px' spacing='4' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
                        <Text>{$order_item?.note ? $order_item?.note : 'Không có'}</Text>
                    </Stack>
                </Stack>
                <VStack w='full' border='1px' borderColor='blackAlpha.200' borderRadius='10px' p='4' spacing='4'>
                    {
                        statistical.map((item, i) => (
                            <HStack w='full' key={i} justifyContent='space-between'>
                                <Text opacity='0.8'>{item.name}</Text>
                                <Text fontWeight='500'>{item.value?.toLocaleString()}{item.unit}</Text>
                            </HStack>
                        ))
                    }
                    <Divider />
                    <HStack w='full' justifyContent='space-between'>
                        <Text opacity='0.8'>Tổng tiền thanh toán</Text>
                        <Text fontWeight='600' color='red.500'>{total_pay.toLocaleString()}đ</Text>
                    </HStack>
                </VStack>
            </Stack>
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