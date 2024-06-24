'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { PaymentInfoLink } from "@/components/common/PaymentInfoLink"
import { Address, Cart, Order, Product } from "@/type"
import { HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { useCollectionData, useDocumentData, useLiveQueryContext } from "@livequery/react"
import { RiHome2Line } from "react-icons/ri"
import { CartItemInfo } from "./CartItemInfo"
import { UserInfo } from "./UserInfo"
import { Button, Input, useDisclosure, useToast } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { useRouter } from "next/navigation"
import { FindLocationNames } from "@/components/common/FindLocationNames"
import { useEffect, useState } from "react"
import { AddressInfoModal } from "./AddressInfoModal"
import { AddressModal } from "../../member/addresses/AddressModal"
import { FiChevronRight, FiPlus } from "react-icons/fi"

export default function InfoPage() {

    const PaymentInfoLinkMap = [
        { name: '1. Thông tin', href: '/cart/info', active: true },
        { name: '2. Thanh toán', href: '', active: false },
    ]

    const { fuser } = useFirebaseUserContext()
    const { items: $carts } = useCollectionData<Cart>(fuser && `customers/${fuser.uid}/carts`)
    const { items: $products } = useCollectionData<Product>('products')

    const { items: $addresses } = useCollectionData<Address>(`customers/${fuser?.uid}/addresses`)
    const address_id_default = $addresses.find(a => a.default == true)?.id
    const [address_id, set_address_id] = useState<string>('')

    useEffect(() => {
        if (address_id_default) {
            set_address_id(address_id_default)
        }
    }, [address_id_default])

    const { item: $$address } = useDocumentData<Address>(address_id && `customers/${fuser?.uid}/addresses/${address_id}`)
    const provinceId = `${$$address?.province}`
    const districtId = `${$$address?.district}`
    const wardId = `${$$address?.ward}`
    const locationNames = FindLocationNames(provinceId, districtId, wardId)

    const AddressList = [
        { name: 'Họ và tên', value: $$address?.name },
        { name: 'Số điện thoại', value: $$address?.phone },
        { name: 'Địa chỉ', value: `${$$address?.street}, ${locationNames.wardName}, ${locationNames.districtName}, ${locationNames.provinceName}` }
    ]

    // Modal chọn address_id
    const $address_modal = useDisclosure()
    const [active_address_modal, set_active_address_modal] = useState<boolean>(false)
    const handleSetAddressId = (id: string) => {
        set_address_id(id);
    };

    // sản phẩm được chọn
    const cart_Select = $carts.filter(cart => cart.select == true)
    // const product_id_list = cart_Select.map(a => a.product_id)

    const order_item_list = cart_Select.map(cart => {
        const product_item = $products.filter(product => product.id == cart.product_id).map(item => {
            return {
                product_id: item.id,
                image: item.image,
                name: item.name,
                code: item.code,
                price: item.price,
                advertising_price: item.advertising_price, // Giá quảng cáo
                amount: cart.amount,
                select: true,
                total_price: cart.amount * item.price
            }
        })
        return product_item[0]
    })

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
    const note = $order.watch("note")

    const toast = useToast()
    const router = useRouter()
    const onSubmit: SubmitHandler<Partial<Order>> = async () => {
        const date = Date.now()
        const data_item = {
            code: `FG${date}`, // Mã đơn hàng
            status: 'created', // Đã tạo
            order_items: order_item_list, // 
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
            address_id: address_id,
            note
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

    return <>
        <AddressModal {...$address_modal} />
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
                    {
                        active_address_modal && (
                            <AddressInfoModal
                                onClose={() => set_active_address_modal(false)}
                                address={$addresses}
                                onSetAddressId={handleSetAddressId}
                                address_id_active={address_id}
                            />
                        )
                    }

                    <Stack w='full' spacing='3'>
                        <Text>Thông tin khách khàng</Text>
                        <UserInfo />
                    </Stack>
                    <Stack w='full' spacing='3'>
                        <Text>Thông tin nhận hàng</Text>
                        <Stack w='full' px='4' py='7' borderRadius='10px' spacing='7' border='1px' borderColor='blackAlpha.200'>
                            {/* <pre>{JSON.stringify($order.watch(), null, 2)}</pre> */}
                            <Stack w='full' spacing='4'>
                                <Text fontSize='12px' fontWeight='600' color='blackAlpha.600'>THÔNG TIN GIAO HÀNG</Text>
                                <Stack bg='blackAlpha.50' p='2' borderRadius='10px' spacing='1'>
                                    {
                                        $addresses.length > 0 && AddressList.map((item, i) => (
                                            <Stack fontSize='14px' key={i} flexDir='row'>
                                                <Text whiteSpace='nowrap'>{item.name} :</Text>
                                                <Text fontWeight='500' color='red.500'>{item.value}</Text>
                                            </Stack>
                                        ))
                                    }
                                    {
                                        $addresses.length == 0 && (
                                            <Text py='5' fontSize='14px' textAlign='center'>Chưa có địa chỉ</Text>
                                        )
                                    }
                                </Stack>
                                {
                                    $addresses.length > 1 && (
                                        <Button size='sm' colorScheme='red' rightIcon={<FiChevronRight />} variant='outline' borderRadius='10px' onClick={() => set_active_address_modal(true)}>
                                            Chọn địa chỉ khác ({$addresses.length})
                                        </Button>
                                    )
                                }
                                <Button size='sm' variant='outline' leftIcon={<FiPlus />} borderRadius='10px' onClick={$address_modal.onOpen}>
                                    Thêm địa chỉ mới
                                </Button>
                            </Stack>
                            <Stack w='full' spacing='0'>
                                <Text fontSize='12px' fontWeight='600' color='blackAlpha.600'> GHI CHÚ KHÁC (NẾU CÓ)</Text>
                                <Input variant='flushed' {...$order.register('note')} onFocus={e => e.target.select()} />
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
                            <Text fontWeight='500' color='blackAlpha.800'>Tổng tiền tạm tính</Text>
                            <Text fontWeight='600' color='red.500' fontSize='18px'>{totalPaid.toLocaleString()}đ</Text>
                        </HStack>
                        {
                            cart_amount > 0 && fuser && $addresses.length > 0 && (
                                <Button w='full' borderRadius='10px' colorScheme="red" type="submit">Đặt hàng và thanh toán</Button>
                            )
                        }
                        {
                            $addresses.length <= 0 && cart_amount > 0 && fuser && (
                                <Button w='full' borderRadius='10px' colorScheme="red">Điền thông tin giao hàng</Button>
                            )
                        }
                    </VStack>
                </VStack>
            </VStack>
        </form >
    </>
}