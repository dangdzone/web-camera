import { Order } from "@/type"
import { Button, Divider, FormControl, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Tag, Text, VStack, useToast } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import { OrderIdItem } from "../../member/histories/[order_id]/OrderIdItem"
import { ReceiverInfo } from "../../cart/payment/[order_id]/ReceiverInfo"
import { OrderStatusMap } from "@/text"
import { MdClose } from "react-icons/md"
import { usePermissionsContext } from "@/hooks/usePermissions"
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from "react"
import { FaRegFilePdf } from "react-icons/fa6"

export type OrderItemModal = {
    onClose: () => void
    order: SmartQueryItem<Order>
}

export const OrderItemModal = ({ onClose, order }: OrderItemModal) => {

    const toast = useToast()
    const { is_owner } = usePermissionsContext()
    const total_pay = order?.pay + order?.shipping_fee
    const statistical = [
        { name: 'Số lượng sản phẩm', value: order?.amount, unit: '' },
        { name: 'Tiền hàng (tạm tính)', value: order?.pay, unit: 'đ' },
        { name: 'Phí vận chuyển', value: order?.shipping_fee, unit: 'đ' },
    ]
    const status_order = Object.entries(OrderStatusMap).filter(([status,]) => status == order?.status).map(([status_id, { color, name }]) => [{ name, color }])[0]
    const { transporter } = useLiveQueryContext()
    const { register, handleSubmit, control, formState: { errors, isSubmitting, isDirty }, reset } = useForm<Order>({
        defaultValues: {
            status: order?.status
        }
    })

    async function onSubmit(data: Order) {
        await transporter.update(`orders/${order.id}`, data)
        reset(data)
        toast({
            title: 'Cập nhật thành công !',
            description: "Bạn đã cập nhật trạng thái của đơn hàng.",
            status: 'success',
            duration: 1000,
            variant: 'subtle',
            position: 'top-right'
        })
    }

    function remove() {
        transporter.remove(`orders/${order.id}`)
        onClose()
    }

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

    return (
        <Modal isOpen={true} onClose={onClose} size='4xl'>
            <ModalOverlay />
            <ModalContent mx='2' borderRadius='15px'>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <ModalHeader p='3'>
                        <HStack w='full' justifyContent='space-between'>
                            <Text noOfLines={1}>Chi tiết đơn hàng</Text>
                            <HStack>
                                {isDirty && <Button size='sm' borderRadius='10px' colorScheme='red' variant='outline' onClick={() => reset()}>Hủy</Button>}
                                {isDirty && <Button size='sm' borderRadius='10px' colorScheme='messenger' type="submit" isLoading={isSubmitting}>Lưu</Button>}
                                <IconButton size='sm' ml='2' onClick={onClose} borderRadius='10px' variant='ghost' aria-label="close" icon={<MdClose size='20px' />} />
                            </HStack>
                        </HStack>
                    </ModalHeader>
                    <ModalBody p='0'>
                        <Stack w='full' spacing='7' py='6' px={{ base: '2', md: '4' }} ref={printRef}>
                            <Stack w='full' spacing='4'>
                                <Stack w='full' spacing='4' justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }}>
                                    <HStack>
                                        <Text fontSize='15px'>Mã đơn hàng:</Text>
                                        <Text fontWeight='600'>{order?.code}</Text>
                                    </HStack>
                                    {
                                        order?.status !== 'created' && (
                                            <Tag colorScheme={status_order?.map(a => a.color)[0]}>{status_order?.map(a => a.name)[0]}</Tag>
                                        )
                                    }
                                    {
                                        order?.status == 'created' && (
                                            <FormControl isRequired w={{ base: '100%', md: '40%' }}>
                                                <Select
                                                    alignSelf='center'
                                                    borderRadius='10px'
                                                    variant='outline'
                                                    {...register("status", { required: true })}
                                                >
                                                    {
                                                        Object.entries(OrderStatusMap).map(([status_id, { color, name }]) => (
                                                            <option
                                                                value={status_id}
                                                                key={status_id}
                                                            >
                                                                {name}
                                                            </option>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        )
                                    }
                                </Stack>
                                <HStack>
                                    <Text fontSize='15px'>Tạo lúc:</Text>
                                    <Text fontWeight='500'>{dayjs(order?.created_at).format('DD/MM/YYYY - HH:mm')}</Text>
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
                    </ModalBody>

                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack w='full' justifyContent='space-between'>
                            <Button borderRadius='10px' variant='outline' leftIcon={<FaRegFilePdf />} onClick={handleDownloadPdf}>Xuất pdf</Button>
                            <HStack>
                                <Button colorScheme='red' variant='ghost' borderRadius='10px' onClick={onClose}>
                                    Đóng
                                </Button>
                                {
                                    is_owner && (
                                        <Button onClick={remove} borderRadius='10px' colorScheme='red'>Xóa</Button>
                                    )
                                }
                                {/* <Button colorScheme='messenger' borderRadius='10px' type="submit">Cập nhật</Button> */}
                            </HStack>
                        </HStack>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal >
    )
}