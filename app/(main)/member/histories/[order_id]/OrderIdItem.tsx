import { Box, HStack, Stack, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"

export type OrderIdItem = {
    order_item: {
        product_id: string
        image: string
        name: string,
        price: number
        code: string
        advertising_price: number // Giá quảng cáo
        amount: number
        select: boolean
        total_price: number
    }
}

export const OrderIdItem = ({ order_item }: OrderIdItem) => {

    return (
        <Stack w='full' spacing='4' flexDir='row' p='4' border='1px' borderRadius='10px' borderColor='blackAlpha.100'>
            <Box>
                <Image maxH='70px' src={order_item?.image} />
            </Box>
            <Stack w='full'>
                <Text fontWeight='500' color='green.500'>{order_item?.name}</Text>
                <HStack w='full' justifyContent='space-between'>
                    <HStack>
                        <Text fontSize='14px' color='blackAlpha.700'>Số lượng:</Text>
                        <Text fontWeight='600' color='red.500'>{order_item?.amount}</Text>
                    </HStack>
                    <Text fontWeight='600' color='red.500'>{order_item.total_price?.toLocaleString()}đ</Text>
                </HStack>
            </Stack>
        </Stack>
    )
}