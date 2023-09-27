
import { HStack, SimpleGrid, Text, VStack, Wrap } from "@chakra-ui/layout"
import { useState } from "react"
import { Button, Input, useColorMode } from "@chakra-ui/react"
import { theme } from "@/theme"
import { FiPlus } from "react-icons/fi"
import { MenuTableItem } from "./MenuTableItem"

const MenuTableMap = ['Tất cả', 'Món chính', 'Khai vị', 'Tránng miệng', 'Nước uống']

export const MenuTableList = () => {
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
            {/* <HStack
                w='full'
                p='4'
                borderBottom='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                justifyContent='space-between'
            >
                <Text fontWeight='600'>Danh sách menu</Text>
            </HStack> */}
            <HStack w='full' pt='4' px='4' justifyContent='center'>
                <Input w={{ base: '100%', md: '70%' }} placeholder="Tìm kiếm món..." />
            </HStack>
            <Wrap spacing={{ base: '2', md: '4' }} w='full' px='4'>
                {
                    MenuTableMap.map((category, i) => (
                        <Button size={{ base: 'sm', md: 'md' }} variant='outline' key={i} colorScheme='teal'>{category}</Button>
                    ))
                }
            </Wrap>
            <SimpleGrid w='full' columns={[2, 3, 4, 4, 4]} spacing='4' px={{ base: '2', md: '4' }}>
                {
                    new Array(5).fill(1).map(() => (
                        <MenuTableItem />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}