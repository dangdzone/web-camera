'use client'

import { Box, Container, HStack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useColorMode } from "@chakra-ui/react";
import { Restaurantlist } from "./RestaurantList";
import { MenuResraurantList } from "./MenuRestaurantList";
import { Topbar } from "./Topbar";
import { theme } from "@/theme";
import { RestauranManager } from "@/text";


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
        <VStack w='full' minH='100vh' spacing='0'>
            <Topbar />
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
                                RestauranManager.map(({ icon, name }, i) => (
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
                        <Restaurantlist />
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        <MenuResraurantList />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    )
}