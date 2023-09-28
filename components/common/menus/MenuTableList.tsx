
import { HStack, SimpleGrid, VStack, Wrap } from "@chakra-ui/layout"
import { useState } from "react"
import { Button, Input, useColorMode } from "@chakra-ui/react"
import { MenuTableItem } from "./MenuTableItem"
import { MenuTabbleModal } from "./MenuTableModal"

const MenuTableMap = ['Tất cả', 'Món chính', 'Khai vị', 'Tránng miệng', 'Nước uống']

export const MenuTableList = () => {

    const { colorMode } = useColorMode()
    const [active_menu_table, set_active_menu_table] = useState<undefined | null>(null)

    return (
        <VStack w='full' spacing='5'>
            {
                active_menu_table !== null && (
                    <MenuTabbleModal onClose={() => set_active_menu_table(null)} />
                )
            }
            <HStack w='full' pt='4' justifyContent='center'>
                <Input w={{ base: '100%', md: '70%' }} placeholder="Tìm kiếm món..." />
            </HStack>
            <Wrap spacing={{ base: '2', md: '4' }} w='full'>
                {
                    MenuTableMap.map((category, i) => (
                        <Button size={{ base: 'sm', md: 'md' }} variant='outline' key={i} colorScheme='teal'>{category}</Button>
                    ))
                }
            </Wrap>
            <SimpleGrid w='full' columns={[2, 2, 3, 4, 4]} spacing='4'>
                {
                    new Array(5).fill(1).map(() => (
                        <MenuTableItem onClick={() => set_active_menu_table(undefined)} />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}