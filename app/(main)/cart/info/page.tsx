'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { PaymentInfoLink } from "@/components/common/PaymentInfoLink"
import { Cart, District, Order, Product, Province, Ward } from "@/type"
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

export default function InfoPage() {

    const PaymentInfoLinkMap = [
        { name: '1. Thông tin', href: '/cart/info', active: true },
        { name: '2. Thanh toán', href: '', active: false },
    ]

    const { fuser } = useFirebaseUserContext()
    const { items: $carts } = useCollectionData<Cart>('carts')
    const { items: $products } = useCollectionData<Product>('products')
    // sản phẩm được chọn
    const cart_select = $carts.filter(cart => cart.select == true)
    // SL sản phẩm được chọn trong giỏ hàng
    const cart_amount = cart_select.reduce((total, item) => total + item.amount, 0)
    // Tổng tiền phải thanh toán (tạm tính)
    const totalPaid = cart_select.reduce((total, item) => {
        const product = $products.find(p => p.id === item.product_id);
        if (product) {
            return total + (product.price * item.amount);
        }
        return total
    }, 0)

    // Tổng tiền
    const total = cart_select.reduce((total, item) => {
        const product = $products.find(p => p.id === item.product_id);
        if (product) {
            return total + (product.advertising_price * item.amount);
        }
        return total
    }, 0)

    // Ảnh đại diện đơn hàng
    const img = $products.filter(a => a.id == cart_select[0]?.product_id).map(b => b.image)

    const { transporter } = useLiveQueryContext()
    const $order = useForm<Order>()
    const $cart = useForm<Cart>()

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const selectedProvince = $order.watch("receiver_info.province");
    const selectedDistrict = $order.watch("receiver_info.district");
    useEffect(() => {
        const getProvinces = async () => {
            try {
                const data = await fetchProvinces();
                setProvinces(data);
                if (data.length > 0) {
                    $order.setValue("receiver_info.province", data[0].province_id.toString());
                }
            } catch (error) {
                console.error('Lỗi khi tìm tỉnh:', error);
            }
        };

        getProvinces();
    }, [$order.setValue]);

    useEffect(() => {
        if (selectedProvince) {
            const getDistricts = async () => {
                try {
                    const data = await fetchDistricts(Number(selectedProvince));
                    setDistricts(data);
                    if (data.length > 0) {
                        $order.setValue("receiver_info.district", data[0].district_id.toString());
                    }
                } catch (error) {
                    console.error('Lỗi khi tìm huyện:', error);
                }
            };

            getDistricts();
            $order.resetField("receiver_info.district");
            $order.resetField("receiver_info.ward");
            setWards([]);
        } else {
            setDistricts([]);
            setWards([]);
            $order.resetField("receiver_info.district");
            $order.resetField("receiver_info.ward");
        }
    }, [selectedProvince, $order.setValue, $order.resetField]);

    useEffect(() => {
        if (selectedDistrict) {
            const getWards = async () => {
                try {
                    const data = await fetchWards(Number(selectedDistrict));
                    setWards(data);
                    if (data.length > 0) {
                        $order.setValue("receiver_info.ward", data[0].ward_id.toString());
                    }
                } catch (error) {
                    console.error('Lỗi khi tìm xã:', error);
                }
            };

            getWards();
            $order.resetField("receiver_info.ward");
        } else {
            setWards([]);
            $order.resetField("receiver_info.ward");
        }
    }, [selectedDistrict, $order.setValue, $order.resetField]);

    const toast = useToast()
    const router = useRouter()
    const onSubmit: SubmitHandler<Partial<Order>> = async data => {
        await transporter.add<Order, { data: { item: Order } }>('orders', {
            status: 'created', // Đã tạo
            image: img[0], // Ảnh đại diện
            orrder_item: cart_select, // 
            amount: cart_amount, // Số lượng sản phẩm
            total: total, // Tổng tiền
            discount: total - totalPaid, // Giảm giá
            pay: totalPaid, // Tiền thanh toán
            customer_id: fuser?.uid, // ID khách hàng
            receiver_info: {
                receiver_name: data.receiver_info?.receiver_name || '', // Tên người nhận
                receiver_phone: data.receiver_info?.receiver_phone || 0, // sdt người nhận
                province: data.receiver_info?.province || '', // Tỉnh
                district: data.receiver_info?.district || '', // huyện
                ward: data.receiver_info?.ward || '', // Phường, xã
                street: data.receiver_info?.street || '', // Số nhà, tên đường
                note: data.receiver_info?.note || '', // ghi chú
            }
        }) && toast({
            title: 'Đặt hàng thành công !',
            description: "Vui lòng thanh toán để nhận được hàng.",
            status: 'success',
            duration: 2000,
            variant: 'subtle',
            position: 'top-right'
        })
        // await transporter.remove('carts', )
        router.push('/cart/payment')
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
                        cart_select.map(cart => (
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
                            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
                            <HStack w='full' spacing='4'>
                                <Stack w='full' spacing='0'>
                                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>TÊN NGƯỜI NHẬN</Text>
                                    <Input variant='flushed' {...$order.register('receiver_info.receiver_name', { required: true })} onFocus={e => e.target.select()} />
                                </Stack>
                                <Stack w='full' spacing='0'>
                                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>SĐT NGƯỜI NHẬN</Text>
                                    <Input variant='flushed' {...$order.register('receiver_info.receiver_phone', { required: true })} onFocus={e => e.target.select()} />
                                </Stack>
                            </HStack>
                            <HStack w='full' spacing='4'>
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
                                            <Select variant='flushed' {...field} isDisabled={!selectedProvince}>
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
                                            <Select variant='flushed' {...field} isDisabled={!selectedDistrict}>
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
                                    <Input variant='flushed' {...$order.register('receiver_info.street', { required: true })} onFocus={e => e.target.select()} />
                                </Stack>
                            </HStack>
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
                            cart_amount > 0 && (
                                <Button w='full' borderRadius='10px' colorScheme="red" type="submit">Đặt hàng và thanh toán</Button>
                            )
                        }
                    </VStack>
                </VStack>
            </VStack>
        </form>
    )
}