
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

export type CategoryModal = {
    onClose: () => void
}

export const CategoryModal = ({ onClose }: CategoryModal) => {

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
                    Thêm danh mục món
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
                            <Text fontWeight='400'>Tên danh mục</Text>
                            <Input
                                placeholder='Nhập tên danh mục...'
                                size='md'
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