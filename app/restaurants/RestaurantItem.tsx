import { Restaurant } from "@/types"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Image, Tag, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useDocumentData } from "@livequery/react"
import Link from "next/link"
import { FiMapPin } from "react-icons/fi"


export type RestarantItem = {
    onClick: () => void,
    // restaurant_id?: string,
    // restaurant?: SmartQueryItem<Restaurant>
}

export const RestarantItem = ({ onClick }: RestarantItem) => {

    const { colorMode } = useColorMode()
    // const $retaurant = useDocumentData<Restaurant>(restaurant_id && `restaurants/${restaurant_id}`)
    // const r = restaurant || $retaurant.item || {}

    return (
        <Link href={`/restaurants/restaurant_id/admin`}>
            <HStack
                w='full'
                p={{ base: '2', md: '4' }}
                // bg='#f0f1f1'
                borderRadius='10px'
                _hover={{
                    bg: colorMode == 'dark' ? '#4E4F50' : '#e5e5e5',
                }}
                cursor='pointer'
                // onClick={onClick}
                bg={colorMode == 'dark' ? '#2F3031' : 'white'}
                boxShadow='md'
            >
                <Image boxSize='40px' src='https://cdn-icons-png.flaticon.com/512/5223/5223909.png' />
                <VStack w='full' align='start'>
                    <HStack w='full' justifyContent='space-between'>
                        <Text fontWeight='600'>Cơ sở 1</Text>
                        <Tag colorScheme='blue'>Hoạt động</Tag>
                    </HStack>
                    <HStack>
                        <FiMapPin />
                        <Text opacity='0.9'>Số 1, Quang Trung, Hà Đông, HN</Text>
                    </HStack>
                </VStack>
            </HStack>
        </Link>
    )
}