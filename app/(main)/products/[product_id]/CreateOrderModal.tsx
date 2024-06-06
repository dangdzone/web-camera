import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Order, Product } from "@/type"
import { Button, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, VStack, useToast } from "@chakra-ui/react"
import { useDocumentData, useLiveQueryContext } from "@livequery/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { UserInfo } from "../../cart/info/UserInfo"
import dvhcvn from '../../../../dvhcvn.json';


export type CreateOrderModal = {
    product_id: string
    onClose: () => void
}

export const CreateOrderModal = ({ onClose, product_id }: CreateOrderModal) => {

    const toast = useToast()
    const router = useRouter()
    const { fuser } = useFirebaseUserContext()
    const { transporter } = useLiveQueryContext()
    const $product = useDocumentData<Product>(product_id && `products/${product_id}`)

    const { watch, control } = useForm<Order>({
        defaultValues: {
            amount: 1
        }
    })

    const amount = watch("amount")
    const $order = useForm<Order>()

    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);
    const provinces = dvhcvn.data;
    const selectedProvince = $order.watch("receiver_info.province");
    const selectedDistrict = $order.watch("receiver_info.district");

    useEffect(() => {
        if (selectedProvince) {
            const province = provinces.find(p => p.level1_id === selectedProvince);
            setDistricts(province?.level2s || []);
            setWards([]);
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            const district = districts.find(d => d.level2_id === selectedDistrict);
            setWards(district?.level3s || []);
        } else {
            setWards([]);
        }
    }, [selectedDistrict, districts]);
    
    // Tổng tiền
    const total = amount * $product.item?.advertising_price
    // Tổng tiền phải thanh toán (tạm tính)
    const totalPaid = amount * $product.item?.price

    const onSubmit: SubmitHandler<Partial<Order>> = async data => {
        const date = Date.now()
        const data_item = {
            code: `FG${date}`, // Mã đơn hàng
            status: 'created', // Đã tạo
            order_items: [{
                product_id,
                amount,
                select: true
            }],
            amount,
            total,
            discount: total - totalPaid,
            pay: totalPaid,
            shipping_fee: 0,
            customer_id: fuser?.uid, // ID khách hàng
            customer_info: { // Thông tin khách hàng tạo
                name: fuser?.displayName || '',
                email: fuser?.email || '',
                img: fuser?.photoURL || ''
            },
            receiver_info: {
                receiver_name: data.receiver_info?.receiver_name || '', // Tên người nhận
                receiver_phone: data.receiver_info?.receiver_phone || 0, // sdt người nhận
                province: data.receiver_info?.province || 0, // Tỉnh
                district: data.receiver_info?.district || 0, // huyện
                ward: data.receiver_info?.ward || 0, // Phường, xã
                street: data.receiver_info?.street || 0, // Số nhà, tên đường
                note: data.receiver_info?.note || '', // ghi chú
            }
        }
        const new_order = await transporter.add<Order, { data: { item: Order } }>(`orders`, data_item)
        const order_id = new_order.data.item.id
        const ref = `/cart/payment/${order_id}`
        router.push(ref)
        toast({
            title: 'Đặt hàng thành công !',
            description: "Vui lòng thanh toán để nhận được hàng.",
            status: 'success',
            duration: 2000,
            variant: 'subtle',
            position: 'top-right'
        })
    }

    return (
        <Modal isOpen={true} onClose={onClose} size='3xl'>
            <ModalOverlay />
            <form onSubmit={$order.handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <ModalContent mx='2' borderRadius='15px'>
                    <ModalHeader p='3'>Mua ngay</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody px={{ base: '2', md: '4' }} py='6'>
                        {/* <pre>{JSON.stringify($order.watch(), null, 2)}</pre> */}
                        <Stack w='full' spacing='7'>
                            <Stack w='full' flexDir='row' spacing='4' border='1px' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
                                <Image boxSize="90px" src={$product.item?.image} />
                                <Stack w='full' spacing='0'>
                                    <Text fontWeight='700' fontSize='18px'>{$product.item?.name}</Text>
                                    <HStack fontSize='14px'>
                                        <Text>Mã sản phẩm :</Text>
                                        <Text>{$product.item?.code}</Text>
                                    </HStack>
                                    <Stack w='full' flexDirection='row' justifyContent='space-between'>
                                        <HStack>
                                            <Text fontWeight='700' color='red.500'>{$product.item?.price.toLocaleString()}đ</Text>
                                            <Text textDecoration='line-through' color='blackAlpha.700' fontSize='14px'>{$product.item?.advertising_price.toLocaleString()}đ</Text>
                                        </HStack>
                                        <Controller
                                            name="amount"
                                            control={control}
                                            render={({ field }) => (
                                                <HStack>
                                                    <Button size='sm' borderRadius='10px' isDisabled={field.value <= 1} onClick={() => field.onChange(field.value - 1)} >-</Button>
                                                    <Button variant='unstyled' size='sm' borderRadius='full'>{field.value}</Button>
                                                    <Button size='sm' borderRadius='10px' isDisabled={field.value >= $product.item?.amount} onClick={() => field.onChange(field.value + 1)}>+</Button>
                                                </HStack>
                                            )}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                            <VStack
                                p='4' w='full'
                                spacing='5'
                                boxShadow='sm' // rgba(99, 99, 99, 0.2) 0px 2px 8px 0px
                                borderRadius='10px'
                                border='1px'
                                borderColor='blackAlpha.200'
                            >
                                <HStack w='full' justifyContent='space-between'>
                                    <Text fontWeight='700' color='blackAlpha.800'>Tổng tiền tạm tính</Text>
                                    <Text fontWeight='800' color='red.500' fontSize='18px'>{totalPaid.toLocaleString()}đ</Text>
                                </HStack>
                            </VStack>
                            <VStack w='full' spacing='5'>
                                <Stack w='full' spacing='3'>
                                    <Text>Thông tin khách khàng</Text>
                                    <UserInfo />
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Thông tin nhận hàng</Text>
                                    <Stack w='full' px='4' py='7' borderRadius='10px' spacing='7' border='1px' borderColor='blackAlpha.200'>
                                        <HStack w='full' spacing='4'>
                                            <Stack w='full' spacing='0'>
                                                <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>TÊN NGƯỜI NHẬN</Text>
                                                <Input variant='flushed' {...$order.register('receiver_info.receiver_name', { required: true })} onFocus={e => e.target.select()} />
                                            </Stack>
                                            <Stack w='full' spacing='0'>
                                                <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>SĐT NGƯỜI NHẬN</Text>
                                                <Input variant='flushed' {...$order.register('receiver_info.receiver_phone', { required: true, valueAsNumber: true })} onFocus={e => e.target.select()} />
                                            </Stack>
                                        </HStack>
                                        <HStack w='full' spacing='4'>
                                <Stack w='full'>
                                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>TỈNH / THÀNH PHỐ</Text>
                                    <Select variant='flushed' placeholder="Chọn Tỉnh/Thành phố" {...$order.register('receiver_info.province', { required: true })}>
                                        {provinces.map((province) => (
                                            <option key={province.level1_id} value={province.level1_id}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Stack>
                                <Stack w='full'>
                                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>QUẬN / HUYỆN</Text>
                                    <Select variant='flushed' placeholder="Chọn Quận/Huyện" {...$order.register('receiver_info.district', { required: true })} disabled={!districts.length}>
                                        {districts.map((district) => (
                                            <option key={district.level2_id} value={district.level2_id}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Stack>
                            </HStack>

                            <HStack w='full' spacing='4'>
                                <Stack w='full'>
                                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>PHƯỜNG / XÃ</Text>
                                    <Select variant='flushed' placeholder="Chọn Phường/Xã" {...$order.register('receiver_info.ward', { required: true })} disabled={!wards.length}>
                                        {wards.map((ward) => (
                                            <option key={ward.level3_id} value={ward.level3_id}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Stack>
                                <Stack w='full' spacing='0'>
                                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>SỐ NHÀ / TÊN ĐƯỜNG</Text>
                                    <Input variant='flushed' {...$order.register('receiver_info.street', { required: true })} onFocus={e => e.target.select()} />
                                </Stack>
                            </HStack>
                                        <Stack w='full' spacing='0'>
                                            <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'> GHI CHÚ KHÁC (NẾU CÓ)</Text>
                                            <Input variant='flushed' {...$order.register('receiver_info.note')} onFocus={e => e.target.select()} />
                                        </Stack>
                                    </Stack>
                                </Stack>

                            </VStack>
                        </Stack>
                    </ModalBody>

                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack>
                            <Button colorScheme='red' borderRadius='10px' variant='ghost' onClick={onClose}>
                                Đóng
                            </Button>
                            {
                                fuser && (
                                    <Button colorScheme='messenger' borderRadius='10px' type="submit">Đặt hàng và thanh toán</Button>
                                )
                            }
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}