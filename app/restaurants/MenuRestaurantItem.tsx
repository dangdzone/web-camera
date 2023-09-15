

import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Image, Tag } from "@chakra-ui/react"
import { FiMapPin } from "react-icons/fi"


export type MenuRestaurantItem = {
    onClick: () => void
}

export const MenuRestaurantItem = ({ onClick }: MenuRestaurantItem) => {
    return (
        <HStack
            w='full'
            p={{base: '2', md: '4'}}
            bg='#f0f1f1'
            borderRadius='10px'
            _hover={{
                bg: '#e5e5e5',
            }}
            cursor='pointer'
            onClick={onClick}
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
    )
}