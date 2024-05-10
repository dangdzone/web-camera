import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"

export const ProductItem = () => {
    return (
        <Stack
            w='full'
            p='2'
            borderRadius='10px'
            boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
            _hover={{
                cursor: 'pointer',
                transform: 'scale(1.02)',
                transition: 'all 0.3s'
            }}
        >
            <Image maxH='300px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/a/camera-ip-wifi-ezviz-h8c-1080p-full-color.png' />
            <Stack w='full'>
                <Text lineHeight='1.3' fontWeight='700' fontSize='14px'>Camera IP ngoài trời 2 ống kính IMOU IPC-S7XP-10M0WED 10MP</Text>
                <HStack w='full' justifyContent='space-between' fontWeight='700' >
                    <Text color='red.500'>1.800.555 đ</Text>
                    <Text fontSize='14px' opacity='0.5' textDecoration='line-through'>1.800.555 đ</Text>
                </HStack>
                <Text p='2' fontSize='14px' bg='blackAlpha.100' borderRadius='5px'>
                    Dễ dàng lắp đặt, sử dụng. Có cung cấp dịch vụ lắp đặt tại nhà
                </Text>
            </Stack>
        </Stack>
    )
}