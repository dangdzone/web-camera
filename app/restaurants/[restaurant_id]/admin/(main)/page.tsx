'use client'

import { theme } from "@/theme";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, useColorMode } from "@chakra-ui/react";
import { RestaurantPage } from "./home/RestaurantPage";
import { OrderList } from "./orders/OrderList";
import { TableList } from "./tables/TableList";
import { HistoryList } from "./histories/HistoryList";
import { TabListMap } from "@/text";
import { MenuResraurantList } from "./menus/MenuRestaurantList";
import { Restaurant } from "@/types";
import { useDocumentData } from "@livequery/react";
import { TopbarAdmin } from "./TopbarAdmin";

export default function PageAdmin(props: {
    params: {
        restaurant_id: string,
    }
}) {

    const { colorMode } = useColorMode()
    const $restaurant = useDocumentData<Restaurant>(`restaurants/${props.params.restaurant_id}`)

    const restaurant = $restaurant.item

    return (
        <VStack w='full' spacing='0'>
            <TopbarAdmin restaurant={restaurant} />
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
                        {
                            restaurant && <OrderList restaurant={restaurant} />
                        }
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        {
                            restaurant && <MenuResraurantList restaurant={restaurant} />
                        }
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        {
                            restaurant && <TableList restaurant={restaurant} />
                        }
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        {
                            restaurant && <HistoryList restaurant={restaurant} />
                        }
                    </TabPanel>
                    <TabPanel w='full' maxW='6xl' px={{ base: '2', md: '4' }}>
                        {
                            restaurant && <RestaurantPage restaurant={restaurant} />
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack >
    )
}