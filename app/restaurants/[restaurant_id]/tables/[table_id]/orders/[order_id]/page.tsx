'use client'

import { TableCustomerMap } from "@/text";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, useColorMode } from "@chakra-ui/react";
import { MenuTableList } from "./menus/MenuTableList";
import { OrderTableList } from "./OrderTableList";
import { theme } from "@/theme";
import { useCollectionData, useDocumentData } from "@livequery/react";
import { OrderItem, Restaurant } from "@/types";


export default function OrderPage(props: {
    params: {
        restaurant_id: string,
        table_id: string,
        order_id: string
    }
}) {

    const { colorMode } = useColorMode()
    const $restaurant = useDocumentData<Restaurant>(`restaurants/${props.params.restaurant_id}`)
    const restaurant = $restaurant.item

    return (
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
            <TabPanels w='full' px='0' py='4' display='flex' justifyContent='center'>
                <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                    <VStack
                        w='full'
                        bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
                        borderRadius='5px'
                        border='1px'
                        borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
                        spacing='5'
                        px={{ base: '2', md: '4' }}
                        py='10'
                    >
                        {
                            restaurant && (
                                <MenuTableList
                                    restaurant={restaurant}
                                    order_id={props.params.order_id}
                                />
                            )
                        }
                    </VStack>
                </TabPanel>
                <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                    <OrderTableList
                        restaurant_id={props.params.restaurant_id}
                        order_id={props.params.order_id}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}