
import { Button, Divider, HStack, Stack, Text, VStack, useColorMode } from "@chakra-ui/react"

export const OrderCreateList = () => {

    const { colorMode } = useColorMode()

    return (
        <VStack w='full' spacing='5'>
            <Stack w='full' divider={<Divider />}>
                {/* {
                    new Array(5).fill(1).map((_, i) => (
                        <OrderTableItem key={i} />
                    ))
                } */}
            </Stack>
            <VStack w='full' py='4' borderTop='1px' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'} spacing='5'>
                <HStack w='full' justifyContent='space-between' pt='3'>
                    <Text as='b'>Tổng tiền:</Text>
                    <Text as='b' fontSize='20px'>1.002.000 đ</Text>
                </HStack>
                <Button colorScheme='teal' w='full'>Gọi đồ ngay</Button>
            </VStack>
        </VStack>
    )
}