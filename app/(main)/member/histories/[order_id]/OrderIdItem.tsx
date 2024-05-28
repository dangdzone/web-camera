import { Product } from "@/type"
import { Box, HStack, Stack, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { useDocumentData } from "@livequery/react"

export type OrderIdItem = {
    order_item: {
        product_id: string
        amount: number
        select: boolean
    }
}

export const OrderIdItem = ({ order_item }: OrderIdItem) => {

    const { item: $order_item } = useDocumentData<Product>(`products/${order_item.product_id}`)
    // Tổng tiền / sản phẩm
    const order_item_price = order_item?.amount * $order_item?.price

    return (
        <Stack w='full' spacing='4' flexDir='row' p='4' border='1px' borderRadius='10px' borderColor='blackAlpha.100'>
            <Box>
                <Image maxH='70px' src={$order_item?.image} />
            </Box>
            <Stack w='full'>
                <Text fontWeight='600' color='green.500'>{$order_item?.name}</Text>
                <HStack w='full' justifyContent='space-between'>
                    <HStack>
                        <Text fontSize='14px' color='blackAlpha.700'>Số lượng:</Text>
                        <Text fontWeight='700' color='red.500'>{order_item?.amount}</Text>
                    </HStack>
                    <Text fontWeight='700' color='red.500'>{order_item_price?.toLocaleString()}đ</Text>
                </HStack>
            </Stack>
        </Stack>
    )
}