
import { VStack, Text, HStack } from "@chakra-ui/layout"
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
    useColorMode
} from "@chakra-ui/react"

export type FoodModal = {
    onClose: () => void
}

export const FoodModal = ({ onClose }: FoodModal) => {

    const { colorMode } = useColorMode()

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
                    Thêm món mới
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
                    <VStack w='full' spacing='7'>
                        <VStack w='full' spacing='4' align='flex-start'>
                            <Text fontWeight='400'>Tên món</Text>
                            <Input
                                placeholder='Nhập tên món...'
                                size='md'
                                // {...form.register('amount', { valueAsNumber: true })}
                                onFocus={e => e.target.select()}
                            />
                        </VStack>
                        <VStack w='full' spacing='4' align='flex-start'>
                            <Text fontWeight='400'>Ghi chú món ăn</Text>
                            <Input
                                placeholder='Nhập tên ghi chú...'
                                size='md'
                                // {...form.register('amount', { valueAsNumber: true })}
                                onFocus={e => e.target.select()}
                            />
                        </VStack>
                        <VStack w='full' spacing='4' align='flex-start'>
                            <Text fontWeight='400'>Số tiền</Text>
                            <Input
                                placeholder='Nhập số tiền...'
                                size='md'
                                type='number'
                                // {...form.register('amount', { valueAsNumber: true })}
                                onFocus={e => e.target.select()}
                            />
                        </VStack>
                    </VStack>
                </ModalBody>
                <ModalFooter p={{ base: '2', md: '4' }}>
                    <HStack w='full' justifyContent='space-between'>
                        <Button mr={3} onClick={onClose} variant='outline' colorScheme='red'>Hủy</Button>
                        <HStack>
                            <Button mr={3} onClick={onClose} variant='ghost' colorScheme='blue'>Hủy</Button>
                            <Button
                                variant='solid'
                                colorScheme='blue'
                                type="submit"
                            >
                                Thêm mới
                            </Button>
                        </HStack>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}