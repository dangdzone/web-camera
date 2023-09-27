import { theme } from "@/theme"
import { Button, Divider, HStack, Stack, Text, VStack, useColorMode } from "@chakra-ui/react"
import { OrderTableItem } from "./OrderTableItem"

export const OrderTableList = () => {

    const { colorMode } = useColorMode()

    return (
        <VStack
            w='full'
            bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
            borderRadius='5px'
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
            spacing='5'
            pb='5'
        >
            <HStack
                w='full'
                p='4'
                borderBottom='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                justifyContent='space-between'
            >
                <Text fontWeight='600'>Đơn hàng của bạn </Text>
            </HStack>
            <Stack w='full' divider={<Divider />} p='4'>
                {
                    new Array(5).fill(1).map((_, i) => (
                        <OrderTableItem key={i} />
                    ))
                }
            </Stack>
            <VStack w='full' p='4' borderTop='1px' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'} spacing='5'>
                <HStack w='full' justifyContent='space-between'>
                    <Text as='b'>Tổng tiền:</Text>
                    <Text as='b' fontSize='20px'>1.002.000 đ</Text>
                </HStack>
                <Button colorScheme='teal' w='full'>Gọi đồ ngay</Button>
            </VStack>
        </VStack>
    )
}