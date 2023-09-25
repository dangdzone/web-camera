import { theme } from "@/theme"
import { HStack, SimpleGrid, Text, VStack, Wrap } from "@chakra-ui/layout"
import { Button, useColorMode } from "@chakra-ui/react"
import { OrderItem } from "./OrderItem"


export const OrderList = () => {

    const { colorMode } = useColorMode()
    const OrderStatusMap = [
        {
            name: 'Đã đặt đơn',
            color: 'gray'
        },
        {
            name: 'Chờ xác nhận',
            color: 'blue'
        },
        {
            name: 'Chờ lên bàn',
            color: 'teal'
        },
        {
            name: 'Đã lên bàn',
            color: 'red'
        },
        {
            name: 'Đã thanh toán',
            color: 'pink'
        },
    ]


    return (
        <VStack w='full' spacing='5'>
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
                    <Text fontWeight='600'>Danh sách đơn hàng</Text>
                    <Button size='sm'>Tạo đơn mới</Button>
                </HStack>
                <Wrap spacing={{ base: '2', md: '4' }} w='full' px='4'>
                    {
                        OrderStatusMap.map(({ color, name }, i) => (
                            <Button size={{ base: 'sm', md: 'md' }} key={i} colorScheme={color}>{name}</Button>
                        ))
                    }
                </Wrap>
                <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4' px='4'>
                    {
                        new Array(10).fill(1).map((_, i) => (
                            <OrderItem key={i} />
                        ))
                    }
                </SimpleGrid>
            </VStack>
        </VStack>
    )
}