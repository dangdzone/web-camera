
import { Restaurant } from "@/types"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Image, Tag, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import Link from "next/link"
import { FiMapPin, FiPhone } from "react-icons/fi"

export type RestarantItem = {
    restaurant?: SmartQueryItem<Restaurant>
}

export const RestarantItem = ({ restaurant }: RestarantItem) => {

    const { colorMode } = useColorMode()
    const string_phone = restaurant?.phone?.toString() || ''
    const phone_render = (phone: string) => {
        if (phone.length === 8) {
            // Định dạng cho số điện thoại 7 số
            return phone.replace(/(\d{4})(\d{4})/, "$1-$2");
        } else if (phone.length === 10) {
            // Định dạng cho số điện thoại 10 số
            return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3");
        } else if (phone.length === 11) {
            // Định dạng cho số điện thoại 11 số
            return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        } else {
            // Trả về chuỗi gốc nếu không hợp lệ
            return phone;
        }
    }

    return (
        <Link href={`/restaurants/${restaurant?.id}/admin`}>
            <HStack
                w='full'
                p='4'
                borderRadius='10px'
                _hover={{
                    bg: colorMode == 'dark' ? '#2F3031' : '#f0f1f1'
                }}
                cursor='pointer'
                // onClick={onClick}
                border='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                spacing='3'
            >
                <Image boxSize={{ base: '30px', md: '40px' }} src='https://cdn-icons-png.flaticon.com/512/5223/5223909.png' />
                <VStack w='full' align='start' spacing='3'>
                    <HStack w='full' justifyContent='space-between'>
                        <Text fontWeight='600' lineHeight='1.2' color='orange.500'>{restaurant?.name}</Text>
                        <Tag
                            colorScheme={restaurant?.status == 'active' ? 'blue' : 'red'}
                            variant='outline'
                            size={{ base: 'sm', md: 'md' }}
                        >
                            {restaurant?.status == 'active' ? 'Đang hoạt động' : 'Đóng cửa'}
                        </Tag>
                    </HStack>
                    <HStack>
                        <FiPhone />
                        <Text>Hotline: {phone_render(string_phone) || 'Chưa có SĐT'}</Text>
                    </HStack>
                    <HStack>
                        <FiMapPin />
                        <Text opacity='0.9' lineHeight='1.2' fontSize='14px'>{restaurant?.address}</Text>
                    </HStack>
                </VStack>
            </HStack>
        </Link>
    )
}