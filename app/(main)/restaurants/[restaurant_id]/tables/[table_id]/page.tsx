'use client'

import { TableCustomerMap } from "@/text"
import { Box, HStack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useColorMode } from "@chakra-ui/react"
import { OrderList } from "../../admin/(main)/orders/OrderList"
import { TableList } from "../../admin/(main)/tables/TableList"
import { theme } from "@/theme"
import { MenuTableList } from "../../../../../../components/common/menus/MenuTableList"
import { OrderTableList } from "./orders/[order_id]/OrderTableList"
import { useDocumentData } from "@livequery/react"
import { Restaurant, RestaurantTable } from "@/types"
import { TopbarTable } from "./TopbarTable"

export default function TablePage(props: {
    params: {
        restaurant_id: string,
        table_id: string
    }
}) {

    const { colorMode } = useColorMode()
    const $restaurant = useDocumentData<Restaurant>(`restaurants/${props.params.restaurant_id}`)
    const $tables = useDocumentData<RestaurantTable>(`restaurants/${props.params.restaurant_id}/tables/${props.params.table_id}`)
    const restaurant = $restaurant.item
    const table = $tables.item

    return (
        <VStack w='full' spacing='0'>
            <TopbarTable restaurant={restaurant} table={table} />
            <Tabs w='full' position="relative" variant="unstyled" >
                <Box
                    w='full'
                    pos='sticky'
                    top='0'
                    zIndex='99'
                >
                    <TabList
                        w='full'
                        bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
                        px='0'
                        justifyContent='center'
                        boxShadow='sm'
                    >
                        <HStack w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                            {
                                TableCustomerMap.map(({ icon, name }, i) => (
                                    <Tab
                                        key={i}
                                        p='5'
                                        _selected={{
                                            color: 'blue.500',
                                            opacity: '1'
                                        }}
                                        opacity='0.7'
                                        _hover={{
                                            color: 'blue.500',
                                            opacity: '1'
                                        }}
                                    >
                                        <HStack>
                                            <Box fontSize='xl'>{icon}</Box>
                                            <Text
                                                // display={{ base: 'none', md: 'block' }}
                                                fontWeight='600'
                                                fontSize='18px'
                                            >
                                                {name}
                                            </Text>
                                        </HStack>
                                    </Tab>
                                ))
                            }
                        </HStack>
                    </TabList>
                    <TabIndicator
                        height="3px"
                        bg="blue.500"
                    />
                </Box>
                <TabPanels w='full' py='4' px='0' display='flex' justifyContent='center'>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        <VStack
                            w='full'
                            bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
                            borderRadius='5px'
                            border='1px'
                            borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
                            spacing='5'
                            pb='5'
                            px={{ base: '2', md: '4' }}
                        >
                            {
                                restaurant && <MenuTableList restaurant={restaurant} />
                            }
                        </VStack>
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        <OrderTableList />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack >
    )
}