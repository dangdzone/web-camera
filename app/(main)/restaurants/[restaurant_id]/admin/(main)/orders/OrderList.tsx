import { theme } from "@/theme"
import { HStack, SimpleGrid, Text, VStack, Wrap } from "@chakra-ui/layout"
import { Button, useColorMode } from "@chakra-ui/react"
import { OrderItem } from "./OrderItem"
import { OrderStatusMap } from "@/text"
import { useState } from "react"
import { OrderModal } from "./OrderModal"


export const OrderList = () => {

    const { colorMode } = useColorMode()
    const [active_order, set_active_order] = useState<undefined | null>(null)

    return (
        <VStack w='full' spacing='5'>
            {
                active_order !== null && (
                    <OrderModal onClose={() => set_active_order(null)} />
                )
            }
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
                    <Text fontWeight='600'>Gọi món</Text>
                    <Button size='sm' onClick={() => set_active_order(undefined)}>Tạo đơn mới</Button>
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