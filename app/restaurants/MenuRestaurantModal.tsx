
import { VStack, HStack, Text } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, Button, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"

export type MenuRestaurantModal = {
    onClose: () => void
}

export const MenuRestaurantModal = ({ onClose }: MenuRestaurantModal) => {
    return (
        <Modal
            isOpen={true}
            size={'4xl'}
            onClose={onClose}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent bg='white' mx='2'>
                <ModalHeader p='3' borderBottom='1px solid' borderColor='gray.200'>
                    Thêm menu
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
                        <VStack w='full' spacing='4'>
                            <HStack w='full'>
                                <Text fontWeight='400'>Tên menu</Text>
                            </HStack>
                            <HStack w='full'>
                                <Input
                                    placeholder='Nhập tên menu...'
                                    size='md'
                                    // {...form.register('amount', { valueAsNumber: true })}
                                    onFocus={e => e.target.select()}
                                />
                            </HStack>
                        </VStack>
                        <Tabs position="relative" w='full'>
                            <TabList>
                                <Tab>Danh mục món</Tab>
                                <Tab>Món ăn</Tab>
                            </TabList>
                            <TabIndicator
                                mt="-1.5px"
                                height="2px"
                                bg="blue.500"
                                borderRadius="1px"
                            />
                            <TabPanels>
                                <TabPanel>
                                    <VStack w='full'>
                                        <HStack w='full' justifyContent='space-between'>
                                            <Text fontWeight='400'>Danh mục món</Text>
                                            <Button leftIcon={<FiPlus />} size='sm' colorScheme='blue'>Thêm danh mục</Button>
                                        </HStack>
                                        <HStack w='full'>
                                        </HStack>
                                    </VStack>
                                </TabPanel>
                                <TabPanel>
                                    <VStack w='full' spacing='4'>
                                        <HStack w='full' justifyContent='space-between'>
                                            <Text fontWeight='400'>Danh sách món</Text>
                                            <Button leftIcon={<FiPlus />} size='sm' colorScheme='blue'>Thêm món</Button>
                                        </HStack>
                                        <HStack w='full'>
                                        </HStack>
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
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
        </Modal >
    )
}