
import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { useState } from "react"
import { Button } from "@chakra-ui/react"
import { MenuRestaurantModal } from "./MenuRestaurantModal"
import { MenuRestaurantItem } from "./MenuRestaurantItem"


export const MenuResraurantList = () => {
    const [active_menu, set_active_menu] = useState<boolean>(false)
    return (
        <VStack w='full' spacing='5' align='start'>
            {
                active_menu != false && (
                    <MenuRestaurantModal onClose={() => set_active_menu(false)} />
                )
            }
            <HStack w='full' justifyContent='space-between'>
                <Text fontWeight='600' color='blue.500'>Quản lý menu</Text>
                <Button colorScheme='blue' size='sm' onClick={() => set_active_menu(true)}>Thêm menu</Button>
            </HStack>
            <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4'>
                {
                    new Array(5).fill(1).map(() => (
                        <MenuRestaurantItem onClick={() => set_active_menu(true)} />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}