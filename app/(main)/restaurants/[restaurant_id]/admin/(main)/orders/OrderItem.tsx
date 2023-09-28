
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Tag, useColorMode } from "@chakra-ui/react"

export const OrderItem = () => {

    const { colorMode } = useColorMode()

    return (
        <HStack
            w='full'
            p='4'
            borderRadius='10px'
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
            _hover={{
                bg: colorMode == 'dark' ? '#2F3031' : '#f0f1f1'
            }}
            spacing='4'
        >
            <Tag variant='outline' borderRadius='full'>1</Tag>
            <VStack w='full' align='flex-start'>
                <HStack w='full' justifyContent='space-between'>
                    <Text fontWeight='600' opacity='0.8'>Khách hàng</Text>
                    <Tag colorScheme='teal'>10.200 đ</Tag>
                </HStack>
                <Text color='red.500'>Bàn 3A</Text>
            </VStack>
        </HStack>
    )
}