import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"

export type OrderItem = {
    order: {
        product_id: string
        image: string
        name: string,
        code: string
        price: number
        advertising_price: number // Giá quảng cáo
        amount: number
        select: boolean
        total_price: number
    }
}

export const OrderItem = ({ order }: OrderItem) => {
    
    return (
        <Stack w='full' flexDirection='row' spacing='4' border='1px' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
            <Image maxH='100px' src={order?.image} />
            <Stack w='full' spacing='1'>
                <Text fontWeight='500'>{order?.name}</Text>
                <HStack>
                    <Text fontWeight='600' color='red.500'>{order?.price.toLocaleString()}đ</Text>
                    <Text textDecoration='line-through' color='blackAlpha.700' fontSize='14px'>{order?.advertising_price.toLocaleString()}đ</Text>
                </HStack>
                <Stack w='full' justifyContent='space-between' flexDir={{base: 'column', md: 'row'}}>
                    <HStack fontSize='14px'>
                        <Text>Mã sản phẩm :</Text>
                        <Text>{order?.code}</Text>
                    </HStack>
                    <HStack>
                        <Text>Số lượng :</Text>
                        <Text fontWeight='600' color='red.500'>{order?.amount}</Text>
                    </HStack>
                </Stack>
            </Stack>
        </Stack>
    )
}