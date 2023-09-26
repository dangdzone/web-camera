import { theme } from "@/theme"
import { VStack, HStack, Text, Wrap, SimpleGrid } from "@chakra-ui/layout"
import { Button, useColorMode } from "@chakra-ui/react"
import { TableItem } from "./TableItem"
import { TableStatusMap } from "@/text"
import { TableQr } from "./TableQr"


export const TableList = () => {

    const { colorMode } = useColorMode()

    return (
        <VStack w='full' spacing='5'>
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
                    <Text fontWeight='600'>Danh sách bàn</Text>
                    <Button size='sm'>Tạo bàn mới</Button>
                </HStack>
                <Wrap spacing={{ base: '2', md: '4' }} w='full' px='4'>
                    {
                        TableStatusMap.map(({ color, name }, i) => (
                            <Button size={{ base: 'sm', md: 'md' }} key={i} colorScheme={color}>{name}</Button>
                        ))
                    }
                </Wrap>
                <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4' px='4'>
                    {
                        new Array(10).fill(1).map((_, i) => (
                            <TableItem key={i} />
                        ))
                    }
                </SimpleGrid>
            </VStack>
            <TableQr />
        </VStack>
    )
}