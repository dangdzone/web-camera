
import { VStack, Text } from "@chakra-ui/layout"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter,
    Button,
    useColorMode,
    Select
} from "@chakra-ui/react"

export type TableModal = {
    onClose: () => void
}

export const TableModal = ({ onClose }: TableModal) => {

    const { colorMode } = useColorMode()

    return (
        <Modal
            isOpen={true}
            size={'3xl'}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent bg={colorMode == "dark" ? "#242526" : "white"} mx='2'>
                <ModalHeader p='3' borderBottom='1px solid' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}>
                    Thêm bàn mới
                </ModalHeader>
                <ModalCloseButton borderRadius='full' mt='1' />
                <ModalBody px={{ base: '2', md: '4' }} py='6'>
                    <VStack w='full' spacing='5'>
                        <VStack w='full' spacing='5'>
                            <VStack w='full' spacing='4' align='flex-start'>
                                <Text fontWeight='400'>Tên bàn</Text>
                                <Input
                                    placeholder='Nhập tên bàn...'
                                    size='md'
                                    // {...form.register('amount', { valueAsNumber: true })}
                                    onFocus={e => e.target.select()}
                                />
                            </VStack>
                            <VStack w='full' spacing='4' align='flex-start'>
                                <Text fontWeight='400'>Chọn kiểu menu</Text>
                                <Select>
                                    <option value='option1'>Menu 1</option>
                                    <option value='option2'>Menu 2</option>
                                    <option value='option3'>Menu 3</option>
                                </Select>
                            </VStack>

                        </VStack>
                    </VStack>
                </ModalBody>

                <ModalFooter p={{ base: '2', md: '4' }}>
                    <Button mr={3} onClick={onClose} variant='ghost' colorScheme='blue'>Hủy</Button>
                    <Button
                        variant='solid'
                        colorScheme='blue'
                        type="submit"
                    >
                        Thêm mới
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}