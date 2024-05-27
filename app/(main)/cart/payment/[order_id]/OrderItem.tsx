import { Product } from "@/type"
import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { useDocumentData } from "@livequery/react"

export type OrderItem = {
    order: {
        product_id: string;
        amount: number;
        select: boolean;
    }
}

export const OrderItem = ({ order }: OrderItem) => {
    
    const { item: product } = useDocumentData<Product>(`products/${order.product_id}`)

    return (
        <Stack w='full' flexDirection='row' spacing='4' border='1px' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
            <Image maxH='100px' src={product?.image} />
            <Stack w='full' spacing='1'>
                <Text fontWeight='600'>{product?.name}</Text>
                <HStack>
                    <Text fontWeight='700' color='red.500'>{product?.price.toLocaleString()}đ</Text>
                    <Text textDecoration='line-through' color='blackAlpha.700' fontSize='14px'>{product?.advertising_price.toLocaleString()}đ</Text>
                </HStack>
                <HStack w='full' justifyContent='space-between'>
                    <HStack fontSize='14px'>
                        <Text>Mã sản phẩm :</Text>
                        <Text>{product?.code}</Text>
                    </HStack>
                    <HStack>
                        <Text>Số lượng :</Text>
                        <Text fontWeight='700' color='red.500'>{order?.amount}</Text>
                    </HStack>
                </HStack>
            </Stack>
        </Stack>
    )
}