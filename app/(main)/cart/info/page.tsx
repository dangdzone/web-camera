'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { PaymentInfoLink } from "@/components/common/PaymentInfoLink"
import { Cart, Product } from "@/type"
import { HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { useCollectionData } from "@livequery/react"
import { RiHome2Line } from "react-icons/ri"
import { CartItemInfo } from "./CartItemInfo"
import { UserInfo } from "./UserInfo"
import { ReceiveInfo } from "./ReceiveInfo"
import { Button } from "@chakra-ui/react"

export default function InfoPage() {

    const PaymentInfoLinkMap = [
        { name: '1. Thông tin', href: '/cart/info', active: true },
        { name: '2. Thanh toán', href: '/cart/payment', active: false },
    ]

    const { items: $carts } = useCollectionData<Cart>('carts')
    const { items: $products } = useCollectionData<Product>('products')
    const cart_select = $carts.filter(cart => cart.select == true)
    const totalAmount = $carts.filter(a => a.select == true).reduce((total, item) => {
        const product = $products.find(p => p.id === item.product_id);
        if (product) {
            return total + (product.price * item.amount);
        }
        return total
    }, 0)

    return (
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
                    <ReceiveInfo />
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
                        <Text fontWeight='800' color='red.500' fontSize='18px'>{totalAmount.toLocaleString()}đ</Text>
                    </HStack>
                    <Button w='full' borderRadius='10px' colorScheme="red">Tiếp tục</Button>
                </VStack>
            </VStack>
        </VStack>
    )
}