import { Product } from "@/type"
import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"

export type ProductItem = {
    product: SmartQueryItem<Product>,
    onClick?: () => void
}

export const ProductItem = ({ product, onClick}: ProductItem) => {
    return (
        <Stack
            w='full'
            p='2'
            borderRadius='10px'
            _hover={{
                cursor: 'pointer',
                transform: 'scale(1.02)',
                transition: 'all 0.3s'
            }}
            border='1px'
            borderColor='blackAlpha.200'
            onClick={onClick}
        >
            <Image maxH='300px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/a/camera-ip-wifi-ezviz-h8c-1080p-full-color.png' />
            <Stack w='full'>
                <Text lineHeight='1.3' fontWeight='700' fontSize='14px'>{product.name}</Text>
                <HStack w='full' justifyContent='space-between' fontWeight='700' >
                    <Text color='red.500'>{product.price}</Text>
                    <Text fontSize='14px' opacity='0.5' textDecoration='line-through'>{product.advertising_price}</Text>
                </HStack>
                <Text p='2' fontSize='14px' bg='blackAlpha.100' borderRadius='5px'>
                    Dễ dàng lắp đặt, sử dụng. Có cung cấp dịch vụ lắp đặt tại nhà
                </Text>
            </Stack>
        </Stack>
    )
}