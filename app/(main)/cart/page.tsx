'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { Cart } from "@/type"
import { Divider, HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { useCollectionData } from "@livequery/react"
import { RiHome2Line } from "react-icons/ri"
import { CartItem } from "./CartItem"
import { Button } from "@chakra-ui/react"

export default function CartPage() {

    const $carts = useCollectionData<Cart>('carts')

    return (
        <VStack w='full' spacing='5' py='5'>
            <DirectionalLink directional={[
                { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                { name: 'Giỏ hàng' },
            ]} />
            <VStack w='full' maxW='2xl' divider={<Divider />} spacing='5'>

                <HStack w='full' px='4' py='2' borderRadius='10px' bg='red.50' justifyContent='space-between' border='1px' borderColor='red.200'>
                    <Stack spacing='0'>
                        <HStack><Text fontSize='15px'>Sản phẩm đã chọn: </Text><Text>2</Text></HStack>
                        <HStack><Text fontSize='15px'>Tạm tính : </Text><Text fontWeight='700' color='red.500'>2.000.000 đ</Text></HStack>
                    </Stack>
                    <Button size='sm' colorScheme="red">Mua ngay</Button>
                </HStack>
                
                <Stack w='full' spacing='5'>
                    {
                        $carts.items.map(cart => {
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