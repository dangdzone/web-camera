import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { RestarantItem } from "./RestaurantItem"
import { useState } from "react"
import { RestaurantModal } from "./RestaurantModal"
import { Button } from "@chakra-ui/react"


export const Restaurantlist = () => {
    const [active_restaurant, set_active_restaurant] = useState<boolean>(false)
    return (
        <VStack w='full' spacing='5' align='start'>
            {
                active_restaurant != false && (
                    <RestaurantModal onClose={() => set_active_restaurant(false)} />
                )
            }
            <HStack w='full' justifyContent='space-between'>
                <Text fontWeight='600' color='blue.500'>Quản lý chi nhánh</Text>
                <Button colorScheme='blue' size='sm' onClick={() => set_active_restaurant(true)}>Thêm chi nhánh</Button>
            </HStack>
            <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4'>
                {
                    new Array(5).fill(1).map(() => (
                        <RestarantItem onClick={() => set_active_restaurant(true)} />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}