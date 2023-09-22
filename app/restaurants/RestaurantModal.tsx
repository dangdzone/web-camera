import { VStack, SimpleGrid, HStack, Text } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Textarea, ModalFooter, Button, useColorMode } from "@chakra-ui/react"

export type RestaurantModal = {
    onClose: () => void
}

export const RestaurantModal = ({ onClose }: RestaurantModal) => {

    const { colorMode } = useColorMode()

    return (
        <Modal
            isOpen={true}
            size={'3xl'}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent bg={colorMode == "dark" ? "#242526" : "white"} mx='2'>
                <ModalHeader p='3'  borderBottom='1px solid' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}>
                    Thêm chi nhánh
                </ModalHeader>
                <ModalCloseButton borderRadius='full' mt='1' />
                <ModalBody px={{ base: '2', md: '4' }} py='6'>
                    <VStack w='full' spacing='5'>
                        <VStack w='full' spacing='5'>
                            <VStack w='full' spacing='4'>
                                <HStack w='full'>
                                    <Text fontWeight='400'>Tên chi nhánh</Text>
                                </HStack>
                                <HStack w='full'>
                                    <Input
                                        placeholder='Nhập tên chi nhánh...'
                                        size='md'
                                        // {...form.register('amount', { valueAsNumber: true })}
                                        onFocus={e => e.target.select()}
                                    />
                                </HStack>
                            </VStack>
                            <VStack w='full' spacing='4'>
                                <HStack w='full'>
                                    <Text fontWeight='400'>Địa chỉ</Text>
                                </HStack>
                                <HStack w='full'>
                                    <Input
                                        placeholder='Nhập địa chỉ...'
                                        size='md'
                                        // {...form.register('real_amount',{valueAsNumber:true})}
                                        onFocus={e => e.target.select()}
                                    />
                                </HStack>
                            </VStack>
                            <VStack w='full' spacing='4'>
                                <HStack w='full'>
                                    <Text fontWeight='400'>Trạng thái hoạt động</Text>
                                </HStack>
                                <HStack w='full'>
                                    <Button colorScheme='blue'>Đang hoạt động</Button>
                                    <Button colorScheme='red' variant='outline'>Dừng hoạt động</Button>
                                </HStack>
                            </VStack>
                        </VStack>
                    </VStack>
                </ModalBody>

                <ModalFooter p={{ base: '2', md: '4' }}>
                    <Button mr={3} onClick={onClose}>Thoát</Button>
                    <Button
                        variant='solid'
                        colorScheme='teal'
                        type="submit"
                    >
                        Cập nhật
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}