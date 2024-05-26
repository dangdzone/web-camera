'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { Cart, Product } from "@/type"
import { Divider, HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { useCollectionData } from "@livequery/react"
import { RiHome2Line } from "react-icons/ri"
import { CartItem } from "./CartItem"
import { Button } from "@chakra-ui/react"
import Link from "next/link"

export default function CartPage() {

    const { items: $carts } = useCollectionData<Cart>('carts')
    const { items: $products } = useCollectionData<Product>('products')

    // Sản phẩm đã chọn trong giỏ hàng
    const cart_amount = $carts.filter(a => a.select == true).reduce((total, item) => total + item.amount, 0)
    // Tổng tiền tạm tính trong giỏ hàng
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
                { name: 'Giỏ hàng' },
            ]} />
            <VStack w='full' maxW='2xl' divider={<Divider />} spacing='5'>

                <HStack w='full' px='4' py='2' borderRadius='10px' bg='red.50' justifyContent='space-between' border='1px' borderColor='red.200'>
                    <Stack spacing='0'>
                        <HStack><Text fontSize='15px'>Sản phẩm đã chọn: </Text><Text>{cart_amount}</Text></HStack>
                        <HStack><Text fontSize='15px'>Tạm tính : </Text><Text fontWeight='700' color='red.500'>{totalAmount.toLocaleString()}đ</Text></HStack>
                    </Stack>
                    <Link href={cart_amount > 0 ? '/cart/info' : ''}>
                        <Button size='sm' colorScheme="red">Mua ngay</Button>
                    </Link>
                </HStack>

                <Stack w='full' spacing='5'>
                    {
                        $carts.map(cart => {
                            return (
                                <CartItem cart={cart} key={cart.id} />
                            )
                        })
                    }
                </Stack>
            </VStack>
        </VStack>
    )
}