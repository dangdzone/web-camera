import { OrderTableItem } from "@/components/common/OrderTableItem"
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Stack, Tag, Text, VStack, useColorMode } from "@chakra-ui/react"

export type OrderModal = {
    onClose: () => void
}

export const OrderModal = ({ onClose }: OrderModal) => {

    const { colorMode } = useColorMode()

    return (
        <Drawer onClose={onClose} isOpen={true} placement='left' size='lg'>
            <DrawerOverlay />
            <DrawerContent bg={colorMode == "dark" ? "#242526" : "white"} maxW='4xl'>
                <DrawerHeader borderBottomWidth='1px'>Đơn hàng</DrawerHeader>
                <DrawerCloseButton mt='1.5' />
                <DrawerBody py='4' px={{ base: '0', md: '4' }}>
                    <VStack w='full' spacing='5'>
                        <HStack
                            w='full'
                            p='4'
                            borderBottom='1px'
                            borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                            justifyContent='space-between'
                        >
                            <Text fontWeight='600'>Khách hàng</Text>
                            <Tag colorScheme='red'>Bàn 3A</Tag>
                        </HStack>
                        <Stack w='full' divider={<Divider />} p='4'>
                            {
                                new Array(5).fill(1).map((_, i) => (
                                    <OrderTableItem key={i} />
                                ))
                            }
                        </Stack>
                        <VStack w='full' p='4' borderTop='1px' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'} spacing='5'>
                            <HStack w='full' justifyContent='space-between' pt='3'>
                                <Text as='b'>Tổng tiền:</Text>
                                <Text as='b' fontSize='20px'>1.002.000 đ</Text>
                            </HStack>
                            <Button colorScheme='teal' w='full'>Xác nhận</Button>
                        </VStack>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}