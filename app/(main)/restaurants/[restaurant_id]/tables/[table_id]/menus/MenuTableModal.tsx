import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, Button, useColorMode, Image, Tag, useNumberInput } from "@chakra-ui/react"
import { BiCartAdd } from "react-icons/bi"

export type MenuTabbleModal = {
    onClose: () => void
}

export const MenuTabbleModal = ({ onClose }: MenuTabbleModal) => {

    const { colorMode } = useColorMode()
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            defaultValue: 1,
            min: 0,
        })
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        <Modal
            isOpen={true}
            size={'3xl'}
            onClose={onClose}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent bg={colorMode == "dark" ? "#242526" : "white"} mx='2'>
                <ModalHeader p='3' borderBottom='1px solid' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}>
                    Thêm món
                </ModalHeader>
                <ModalCloseButton borderRadius='full' mt='1' />
                <ModalBody
                    px={{ base: '2', md: '4' }} py='6'
                    sx={{
                        "::-webkit-scrollbar": {
                            w: { base: 'none', md: '2' },
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '10',
                            bg: '#c0c1c1',
                        },
                    }}
                >
                    <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4'>
                        <Image
                            borderRadius='10px'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToDygOmQKcr4VkjRlVnULVsBCaRfM1c7rtSg&usqp=CAU'
                            maxH='600px'
                            w='full'
                        />
                        <VStack w='full' spacing='5'>
                            <VStack w='full' align='flex-start' spacing='2'>
                                <Text textTransform='uppercase'>Mẹt Bún Ninh Bình</Text>
                                <Text fontSize='12px' opacity='0.7'>Từ vùng quê Ning Bình </Text>
                            </VStack>
                            <HStack w='full'>
                                <Tag colorScheme='red'>174.4993 đ</Tag>
                            </HStack>
                            <HStack w='full' justifyContent='space-between'>
                                <Text>Số lượng</Text>
                                <HStack >
                                    <Button {...dec}>-</Button>
                                    <Input w='70px' {...input} />
                                    <Button {...inc}>+</Button>
                                </HStack>
                            </HStack>
                            <HStack w='full' justifyContent='space-between'>
                                <Text>Số tiền tạm tính</Text>
                                <Tag colorScheme='orange'>102.300 đ</Tag>
                            </HStack>
                        </VStack>
                    </SimpleGrid>
                </ModalBody>
                <ModalFooter p={{ base: '2', md: '4' }}>
                    <Button mr={3} onClick={onClose} variant='ghost' colorScheme='blue'>Hủy</Button>
                    <Button
                        variant='solid'
                        colorScheme='blue'
                        type="submit"
                        leftIcon={<BiCartAdd />}
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}