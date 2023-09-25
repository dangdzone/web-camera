'use client'

import { theme } from "@/theme";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, useColorMode } from "@chakra-ui/react";
import { FiHome, FiPieChart, FiShoppingCart } from "react-icons/fi";
import { MdOutlineHistory, MdOutlineTableBar } from "react-icons/md";
import { HomePage } from "./home/HomePage";

const TabListMap = [
    {
        name: 'Trang chủ',
        icon: <FiHome />
    },
    {
        name: 'Đơn hàng',
        icon: <FiShoppingCart />
    },
    {
        name: 'Bàn ăn',
        icon: <MdOutlineTableBar />
    },
    {
        name: 'Lịch sử',
        icon: <MdOutlineHistory />
    }
]

export default function PageAdmin() {

    const { colorMode } = useColorMode()

    return (
        <VStack w='full'>
            <Tabs w='full' position="relative" variant="unstyled" >
                <TabList
                    w='full'
                    bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
                    px='0'
                    justifyContent='center'
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
                <TabPanels w='full' py='4' px='0' display='flex' justifyContent='center'>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        <HomePage />
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl'>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl'>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack >
    )
}