
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useColorMode } from "@chakra-ui/react"
import { OrderCreateList } from "./OrderCreateList"
import { MenuTableList } from "../../../tables/[table_id]/orders/[order_id]/menus/MenuTableList"
import { useLiveQueryContext } from "@livequery/react"
import { Restaurant } from "@/types"

export type OrderCreateModal = {
    restaurant?: Restaurant
    onClose: () => void
}

export const OrderCreateModal = ({ onClose, restaurant }: OrderCreateModal) => {

    const { colorMode } = useColorMode()

    const { transporter } = useLiveQueryContext()
    // const onSubmit: SubmitHandler<Partial<Order>> = async data => {
    //     const new_order = await transporter.add<Order, { data: { item: Order } }>(`restaurants/${props.params.restaurant_id}/orders`, {
    //         table_id: props.params.table_id
    //     })
    // }

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
                    Tạo đơn mới
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
                            <Text fontWeight='400'>Tên người tạo đơn</Text>
                            <Select>
                                <option value='option1'>Chủ cửa hàng</option>
                                <option value='option2'>Nhân viên</option>
                            </Select>
                        </VStack>
                        <Tabs w='full' position="relative">
                            <TabList>
                                <Tab p='4' fontWeight='600'>Menu</Tab>
                                <Tab p='4' fontWeight='600'>Giỏ hàng</Tab>
                            </TabList>
                            <TabIndicator
                                mt="-1.5px"
                                height="2px"
                                bg="blue.500"
                            />
                            <TabPanels>
                                <TabPanel px='0' py='7'>
                                    <MenuTableList restaurant={restaurant}  />
                                </TabPanel>
                                <TabPanel px='0' pt='7'>
                                    <OrderCreateList />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal >
    )
}