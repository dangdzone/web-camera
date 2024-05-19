import { Product } from "@/type"
import { HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"

export type ProductItemBox = {
    product: SmartQueryItem<Product>,
}

export const ProductItemBox = ({ product }: ProductItemBox) => {

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
        >
            <VStack minH='200px'>
                <Image p='2' maxH='200px' src={product.image} />
            </VStack>
            <Text lineHeight='1.3' fontWeight='700'>{product.name}</Text>
            <HStack w='full' justifyContent='space-between'>
                <Text fontWeight='bold' color='red.500'>{product?.price.toLocaleString()} đ</Text>
                <Text fontWeight='bold' textDecoration='line-through' color='blackAlpha.600'>{product?.advertising_price.toLocaleString()} đ</Text>
            </HStack>
            <Text fontSize='14px' p='2' bg='blackAlpha.50' borderRadius='10px' border='1px' borderColor='blackAlpha.100'>{product.description}</Text>
        </Stack>
    )
}