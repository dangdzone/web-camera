import { Restaurant } from "@/types"
import { Badge, HStack, Text, VStack } from "@chakra-ui/layout"
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
                <Image boxSize={{base: '30px', md: '40px'}} src='https://cdn-icons-png.flaticon.com/512/5223/5223909.png' />
                <VStack w='full' align='start'>
                    <HStack w='full' justifyContent='space-between'>
                        <Text fontWeight='600' lineHeight='1.2'>Cơ sở 1</Text>
                        <Tag colorScheme='blue' variant='outline' size={{base: 'sm', md: 'md'}}>Hoạt động</Tag>
                    </HStack>
                    <Badge fontSize='sm' colorScheme='facebook'>0814201002</Badge>
                    <HStack>
                        <FiMapPin />
                        <Text opacity='0.9' lineHeight='1.2' fontSize='14px'>Số 1, Quang Trung, Hà Đông, HN</Text>
                    </HStack>
                </VStack>
            </HStack>
        </Link>
    )
}