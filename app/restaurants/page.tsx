'use client'

import { Container, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, VStack, useColorMode } from "@chakra-ui/react";
import { Restaurantlist } from "./RestaurantList";
import { MenuResraurantList } from "./MenuRestaurantList";
import { Topbar } from "./Topbar";


export default function Page() {

    const { colorMode } = useColorMode()
    const tb = {
        fontWeight: '600',
        _selected: { color: '#2193b0' },
        _hover: { color: '#2193b0' },
        color: colorMode == 'dark' ? 'gray.300' : 'gray.600',
        pb: '3'
    }

    return (
        <VStack w='full' spacing='0'>
            <Topbar />
            <Container
                maxW='8xl'
                px={{ base: '2', md: '4' }}
                py='6'
                minH='calc(100vh - 65px)'
                bg={colorMode == 'dark' ? '#18191A' : '#F0F1F1'}
            >
                <VStack
                    w='full'
                    px={{ base: '2', md: '4' }}
                    py='4'
                    bg={colorMode == 'dark' ? '#242526' : 'white'}
                    borderRadius='10px'
                    boxShadow='md'
                >
                    <Tabs w='full' position="relative">
                        <TabList>
                            <Tab {...tb}>Quản lý nhà hàng</Tab>
                            <Tab {...tb}>Quản lý Menu</Tab>
                        </TabList>
                        <TabIndicator
                            mt="-3px"
                            height="3px"
                            bgGradient='linear(to-l, #2193b0, #005C97)'
                        />
                        <TabPanels >
                            <TabPanel px='0'>
                                <Restaurantlist />
                            </TabPanel>
                            <TabPanel px='0'>
                                <MenuResraurantList />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            </Container>
        </VStack>
    )
}