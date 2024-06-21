import { Cart, Product } from "@/type"
import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useDocumentData } from "@livequery/react"

export type CartItemInfo = {
    cart: SmartQueryItem<Cart>
}

export const CartItemInfo = ({ cart }: CartItemInfo) => {

    const { item: product } = useDocumentData<Product>(`products/${cart.product_id}`)

    return (
        <Stack w='full' flexDirection='row' spacing='4' border='1px' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
            <Image maxH='80px' src={product?.image} />
            <Stack w='full' spacing='1'>
                <Text fontWeight='500'>{product?.name}</Text>
                <HStack>
                    <Text fontWeight='600' color='red.500'>{product?.price.toLocaleString()}đ</Text>
                    <Text textDecoration='line-through' color='blackAlpha.700' fontSize='14px'>{product?.advertising_price.toLocaleString()}đ</Text>
                </HStack>
                <Stack w='full' justifyContent='space-between' flexDir={{base: 'column', md: 'row'}}>
                    <HStack fontSize='14px'>
                        <Text>Mã sản phẩm :</Text>
                        <Text>{product?.code}</Text>
                    </HStack>
                    <HStack>
                        <Text>Số lượng :</Text>
                        <Text fontWeight='600' color='red.500'>{cart?.amount}</Text>
                    </HStack>
                </Stack>
            </Stack>
        </Stack>
    )
}