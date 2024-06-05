'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { PaymentInfoLink } from "@/components/common/PaymentInfoLink"
import { Cart, DVHCData, District, Level1, Level2, Level3, Order, Product, Province, Ward } from "@/type"
import { HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { useCollectionData, useLiveQueryContext } from "@livequery/react"
import { RiHome2Line } from "react-icons/ri"
import { CartItemInfo } from "./CartItemInfo"
import { UserInfo } from "./UserInfo"
import { Button, Input, Select, useToast } from "@chakra-ui/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { useEffect, useState } from "react"
import { fetchDistricts, fetchProvinces, fetchWards } from "@/api"
import { useRouter } from "next/navigation"
import dvhcvn from '../../../../dvhcvn.json';

export default function InfoPage() {

    const PaymentInfoLinkMap = [
        { name: '1. Thông tin', href: '/cart/info', active: true },
        { name: '2. Thanh toán', href: '', active: false },
    ]

    const { fuser } = useFirebaseUserContext()
    const { items: $carts } = useCollectionData<Cart>(fuser && `customers/${fuser.uid}/carts`)
    const { items: $products } = useCollectionData<Product>('products')
    // sản phẩm được chọn
    const cart_Select = $carts.filter(cart => cart.select == true)
    // SL sản phẩm được chọn trong giỏ hàng
    const cart_amount = cart_Select.reduce((total, item) => total + item.amount, 0)
    // Tổng tiền phải thanh toán (tạm tính)
    const totalPaid = cart_Select.reduce((total, item) => {
        const product = $products.find(p => p.id === item.product_id);
        if (product) {
            return total + (product.price * item.amount);
        }
        return total
    }, 0)

    // Tổng tiền
    const total = cart_Select.reduce((total, item) => {
        const product = $products.find(p => p.id === item.product_id);
        if (product) {
            return total + (product.advertising_price * item.amount);
        }
        return total
    }, 0)

    const { transporter } = useLiveQueryContext()
    const $order = useForm<Order>()

    const [provinces, setProvinces] = useState<Level1[]>([])
    const [districts, setDistricts] = useState<Level2[]>([]);
    const [wards, setWards] = useState<Level3[]>([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>('01');
    const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>('001');

    useEffect(() => {
        setProvinces(dvhcvn.data);
    }, []);

    useEffect(() => {
        if (selectedProvinceId !== null) {
            const selectedProvince = provinces.find(province => province.level1_id === selectedProvinceId);
            setDistricts(selectedProvince?.level2s || []);
            setSelectedDistrictId(null);
            setWards([]); // Reset danh sách xã khi chọn tỉnh mới
        }
    }, [selectedProvinceId, provinces]);

    useEffect(() => {
        if (selectedDistrictId !== null) {
            const selectedDistrict = districts.find(district => district.level2_id === selectedDistrictId);
            setWards(selectedDistrict?.level3s || []);
        }
    }, [selectedDistrictId, districts]);

    // useEffect(() => {
    //     if (provinces.length > 0) {
    //         setSelectedProvinceId(provinces[0].level1_id);
    //     }
    // }, [provinces]);

    // useEffect(() => {
    //     if (selectedProvinceId !== null) {
    //         const selectedProvince = provinces.find(province => province.level1_id === selectedProvinceId);
    //         setDistricts(selectedProvince?.level2s || []);
    //         setSelectedDistrictId(null);
    //         setWards([]);
    //     }
    // }, [selectedProvinceId, provinces]);

    // useEffect(() => {
    //     if (districts.length > 0) {
    //         setSelectedDistrictId(districts[0].level2_id);
    //     }
    // }, [districts]);

    // useEffect(() => {
    //     if (selectedDistrictId !== null) {
    //         const selectedDistrict = districts.find(district => district.level2_id === selectedDistrictId);
    //         setWards(selectedDistrict?.level3s || []);
    //     }
    // }, [selectedDistrictId, districts])


    const toast = useToast()
    const router = useRouter()
    const onSubmit: SubmitHandler<Partial<Order>> = async data => {
        const date = Date.now()
        const data_item = {
            code: `FG${date}`, // Mã đơn hàng
            status: 'created', // Đã tạo
            order_items: cart_Select, // 
            amount: cart_amount, // Số lượng sản phẩm
            total: total, // Tổng tiền
            discount: total - totalPaid, // Giảm giá
            pay: totalPaid, // Tiền thanh toán
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
                province: data.receiver_info?.province || 1, // Tỉnh
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
        <form onSubmit={$order.handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <VStack w='full' spacing='5' py='5'>
                <DirectionalLink directional={[
                    { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                    { name: 'Giỏ hàng', href: '/cart' },
                    { name: 'Thông tin' },
                ]} />
                <VStack w='full' maxW='2xl' spacing='5'>
                    <PaymentInfoLink list={PaymentInfoLinkMap} />
                    {
                        cart_Select.map(cart => (
                            <CartItemInfo key={cart.id} cart={cart} />
                        ))
                    }
                    <Stack w='full' spacing='3'>
                        <Text>Thông tin khách khàng</Text>
                        <UserInfo />
                    </Stack>
                    <Stack w='full' spacing='3'>
                        <Text>Thông tin nhận hàng</Text>
                        <Stack w='full' px='4' py='7' borderRadius='10px' spacing='7' border='1px' borderColor='blackAlpha.200'>
                            <pre>{JSON.stringify($order.watch(), null, 2)}</pre>
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
                            {/* <HStack w='full' spacing='4'>
                                <Stack w='full' spacing='0'>
                                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>TỈNH / THÀNH PHỐ</Text>
                                    <Controller
                                        name="receiver_info.province"
                                        control={$order.control}
                                        render={({ field }) => (
                                            <Select variant='flushed' {...field}>
                                                {provinces.map((province) => (
                                                    <option key={province.province_id} value={province.province_id}>
                                                        {province.province_name}
                                                    </option>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </Stack>
                                <Stack w='full' spacing='0'>
                                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>QUẬN / HUYỆN</Text>
                                    <Controller
                                        name="receiver_info.district"
                                        control={$order.control}
                                        render={({ field }) => (
                                            <Select variant='flushed' {...field} isDisabled={!SelectedProvince}>
                                                {districts.map((district) => (
                                                    <option key={district.district_id} value={district.district_id}>
                                                        {district.district_name}
                                                    </option>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </Stack>
                            </HStack>
                            <HStack w='full' spacing='4'>
                                <Stack w='full' spacing='0'>
                                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>PHƯỜNG / XÃ</Text>
                                    <Controller
                                        name="receiver_info.ward"
                                        control={$order.control}
                                        render={({ field }) => (
                                            <Select variant='flushed' {...field} isDisabled={!SelectedDistrict}>
                                                {wards.map((ward) => (
                                                    <option key={ward.ward_id} value={ward.ward_id}>
                                                        {ward.ward_name}
                                                    </option>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </Stack>
                                <Stack w='full' spacing='0'>
                                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>SỐ NHÀ / TÊN ĐƯỜNG</Text>
                                    <Input variant='flushed' {...$order.register('receiver_info.street', { required: true })} onFocus={e => e.target.Select()} />
                                </Stack>
                            </HStack> */}
                            <Controller
                                name="receiver_info.province"
                                control={$order.control}
                                rules={{ required: true }}
                                // defaultValue={selectedProvinceId}
                                render={({ field }) => (
                                    <Select variant='flushed' {...field} onChange={(e) => {
                                        field.onChange(e);
                                        setSelectedProvinceId(e.target.value);
                                    }}>
                                        {provinces.map((province) => (
                                            <option key={province.level1_id} value={province.level1_id}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                            />

                            <Controller
                                name="receiver_info.district"
                                control={$order.control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select variant='flushed' {...field} onChange={(e) => {
                                        field.onChange(e);
                                        setSelectedDistrictId(e.target.value);
                                    }}>
                                        {districts.map((district) => (
                                            <option key={district.level2_id} value={district.level2_id}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                            />

                            <Controller
                                name="receiver_info.ward"
                                control={$order.control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select variant='flushed' {...field}>
                                        {wards.map((ward) => (
                                            <option key={ward.level3_id} value={ward.level3_id}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                            />

                            <Stack w='full' spacing='0'>
                                <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'> GHI CHÚ KHÁC (NẾU CÓ)</Text>
                                <Input variant='flushed' {...$order.register('receiver_info.note')} onFocus={e => e.target.select()} />
                            </Stack>
                        </Stack>
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
                        <HStack w='full' justifyContent='space-between'>
                            <Text fontWeight='600' color='blackAlpha.800'>Tổng tiền tạm tính</Text>
                            <Text fontWeight='800' color='red.500' fontSize='18px'>{totalPaid.toLocaleString()}đ</Text>
                        </HStack>
                        {
                            cart_amount > 0 && fuser && (
                                <Button w='full' borderRadius='10px' colorScheme="red" type="submit">Đặt hàng và thanh toán</Button>
                            )
                        }
                    </VStack>
                </VStack>
            </VStack>
        </form>
    )
}