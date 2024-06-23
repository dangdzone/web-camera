'use client'

import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { OrderStatusMap } from "@/text"
import { Order } from "@/type"
import { Divider, HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { Button, Select } from "@chakra-ui/react"
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
import { SmartQueryItem } from "@livequery/client"
import { VietQRModal } from "@/app/(main)/cart/payment/[order_id]/VietQRModal"

export default function OrderIdPage(props: {
    params: {
        order_id: string
    }
}) {
    const { fuser } = useFirebaseUserContext()
    const { item: order } = useDocumentData<Order>(fuser && `customers/${fuser.uid}/orders/${props.params.order_id}`)
    const status_order = Object.entries(OrderStatusMap).filter(([status,]) => status == order?.status).map(([status_id, { color, name }]) => [{ name, color }])[0]

    const [type, set_type] = useState<string>('momo')
    const [active_vietqr, set_active_vietqr] = useState<boolean | SmartQueryItem<Order>>(false)
    const pay = async () => {
        try {
            if (type == 'vietqr') {
                set_active_vietqr(true)
            } else {
                const result = await order.__trigger('pay', { type }) as {
                    data: {
                        item: {
                            url: string
                        }
                    }
                }
                if (result?.data.item.url) {
                    window.location.href = result?.data.item.url
                }
            }
        } catch (e) {
            throw new Error('Đã xảy ra lỗi, vui lòng thử lại !')
        }
    }

    const total_pay = order?.pay + order?.shipping_fee
    const statistical = [
        { name: 'Số lượng sản phẩm', value: order?.amount, unit: '' },
        { name: 'Tiền hàng (tạm tính)', value: order?.pay, unit: 'đ' },
        { name: 'Phí vận chuyển', value: order?.shipping_fee, unit: 'đ' },
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
            pdf.save(`donhang_${order.code}.pdf`);
        }
    };


    return fuser && (
        <Stack w='full' spacing='5'>
            {
                active_vietqr && order.status == 'created' && <VietQRModal onClose={() => set_active_vietqr(false)} order={order} />
            }
            <HStack w='full' justifyContent='space-between'>
                <HStack spacing='5'>
                    <Link href={'/member/histories'}>
                        <FiArrowLeft size='20px' />
                    </Link>
                    <Text fontWeight='600' fontSize='18px'>Chi tiết đơn hàng</Text>
                </HStack>
                {
                    order?.status == 'paid' && (
                        <Button size='sm' borderRadius='10px' variant='outline' leftIcon={<FaRegFilePdf />} onClick={handleDownloadPdf}>Xuất pdf</Button>
                    )
                }
            </HStack>
            <Stack w='full' spacing='7' p='2' ref={printRef}>
                <Stack w='full'>
                    <HStack w='full' justifyContent='space-between'>
                        <HStack>
                            <Text fontSize='15px'>Mã đơn hàng:</Text>
                            <Text fontWeight='600'>{order?.code}</Text>
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
                        order?.order_items.map((order_item, i) => (
                            <OrderIdItem key={i} order_item={order_item} />
                        ))
                    }
                </Stack>
                <Stack w='full'>
                    <Text fontWeight='500'>Thông tin nhận hàng</Text>
                    <ReceiverInfo address_id={order?.address_id} />
                </Stack>
                <Stack w='full'>
                    <Text fontWeight='500'>Ghi chú</Text>
                    <Stack w='full' border='1px' spacing='4' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
                        <Text>{order?.note ? order?.note : 'Không có'}</Text>
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
                order?.status == 'created' && (
                    <VStack
                        p='4' w='full'
                        spacing='4'
                        boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                        borderRadius='10px'
                        pos='sticky'
                        bottom='0'
                        zIndex='999'
                        bg='#FFFFFF'
                        border='1px'
                        borderColor='blackAlpha.200'
                    >
                        {
                            order.status == 'created' && (
                                <HStack w='full' flexDir={{base: 'column', md: 'row'}} spacing='4' justifyContent='space-between'>
                                    <Text fontWeight='500' whiteSpace='nowrap'>Chọn phương thức thanh toán</Text>
                                        <Select borderRadius='10px' w={{base: '100%', md: '60%'}} onChange={(e) => set_type(e.target.value)}>
                                            <option value='momo'>Ví momo</option>
                                            <option value='zalo'>Zalo pay</option>
                                            <option value='ninepay'>9pay</option>
                                            <option value='vietqr'>Chuyển khoản ngân hàng</option>
                                        </Select>
                                </HStack>
                            )
                        }
                        <Button w='full' borderRadius='10px' colorScheme='red' onClick={pay}>Thanh toán</Button>
                    </VStack>
                )
            }
        </Stack>
    )
}