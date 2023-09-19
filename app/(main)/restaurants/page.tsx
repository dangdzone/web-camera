'use client'

import { VStack } from "@chakra-ui/react";
import { Restaurantlist } from "./RestaurantList";
import { MenuResraurantList } from "./MenuRestaurantList";


export default function Page() {
    return (
        <VStack w='full' px={{base: '2', md: '4'}} py='10' spacing='7'>
            <Restaurantlist />
            <MenuResraurantList />
        </VStack>
    )
}