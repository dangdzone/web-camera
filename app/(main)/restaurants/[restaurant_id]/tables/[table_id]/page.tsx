'use client'

import { TableCustomerMap } from "@/text"
import { Box, HStack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useColorMode } from "@chakra-ui/react"
import { OrderList } from "../../admin/(main)/orders/OrderList"
import { TableList } from "../../admin/(main)/tables/TableList"
import { theme } from "@/theme"
import { MenuTableList } from "./menus/MenuTableList"


export default function TablePage() {

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
                        <MenuTableList />
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        {/* <TableList /> */}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack >
    )
}