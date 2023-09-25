
import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { useState } from "react"
import { Button, useColorMode } from "@chakra-ui/react"
import { MenuRestaurantModal } from "./MenuRestaurantModal"
import { MenuRestaurantItem } from "./MenuRestaurantItem"
import { theme } from "@/theme"
import { FiPlus } from "react-icons/fi"


export const MenuResraurantList = () => {
    const [active_menu, set_active_menu] = useState<boolean>(false)
    const { colorMode } = useColorMode()

    return (
        <VStack
            w='full'
            bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
            borderRadius='5px'
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
            spacing='5'
            pb='5'
        >
            <HStack
                w='full'
                p='4'
                borderBottom='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                justifyContent='space-between'
            >
                <Text fontWeight='600'>Danh sách menu</Text>
                <Button size='sm' leftIcon={<FiPlus />} onClick={() => set_active_menu(true)}>Tạo menu mới</Button>
            </HStack>
            {
                active_menu != false && (
                    <MenuRestaurantModal onClose={() => set_active_menu(false)} />
                )
            }
            <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4' px={{base: '2', md: '4'}}>
                {
                    new Array(5).fill(1).map(() => (
                        <MenuRestaurantItem onClick={() => set_active_menu(true)} />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}