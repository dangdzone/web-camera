'use client'

import { HStack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import { Restaurantlist } from "./RestaurantList";
import { MenuResraurantList } from "./MenuRestaurantList";
import { FiAirplay } from "react-icons/fi";


export default function Page() {
    return (
        <VStack
            w='full'
            px={{ base: '2', md: '4' }}
            py='10'
            spacing='7'
            bg='red.200'
        >
            <Tabs w='full' position="relative">
                <TabList>
                    <Tab>Nhà hàng</Tab>
                    <Tab>Menu</Tab>
                </TabList>
                <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="blue.500"
                    borderRadius="1px"
                />
                <TabPanels>
                    <TabPanel>
                        <Restaurantlist />
                    </TabPanel>
                    <TabPanel>
                        <MenuResraurantList />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            

        </VStack>
    )
}