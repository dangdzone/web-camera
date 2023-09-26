'use client'

import { theme } from "@/theme";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, useColorMode } from "@chakra-ui/react";
import { HomePage } from "./home/HomePage";
import { OrderList } from "./orders/OrderList";
import { TableList } from "./tables/TableList";
import { HistoryList } from "./histories/HistoryList";
import { TabListMap } from "@/text";
import { MenuResraurantList } from "./menus/MenuRestaurantList";



export default function PageAdmin() {

    const { colorMode } = useColorMode()

    return (
        <VStack w='full'>
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
                                TabListMap.map(({ icon, name }, i) => (
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
                                                display={{ base: 'none', md: 'block' }}
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
                        <OrderList />
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        <TableList />
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        <MenuResraurantList />
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        <HistoryList />
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        <HomePage />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack >
    )
}