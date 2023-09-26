
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Image, Tag, useColorMode } from "@chakra-ui/react"

export type MenuRestaurantItem = {
    onClick: () => void
}

export const MenuRestaurantItem = ({ onClick }: MenuRestaurantItem) => {

    const { colorMode } = useColorMode()

    return (
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
        >
            <Image boxSize={{base: '25px', md: '35px'}} src='https://cdn-icons-png.flaticon.com/512/5305/5305384.png' />
            <VStack w='full' align='start'>
                <HStack w='full' justifyContent='space-between'>
                    <Text fontWeight='600'>VIP2</Text>
                    <Tag colorScheme='blue'>Hoạt động</Tag>
                </HStack>
            </VStack>
        </HStack>
    )
}