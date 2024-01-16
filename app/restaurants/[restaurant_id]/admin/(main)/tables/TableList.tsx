
import { theme } from "@/theme"
import { VStack, HStack, Text, SimpleGrid } from "@chakra-ui/layout"
import { Button, Spinner, useColorMode } from "@chakra-ui/react"
import { TableItem } from "./TableItem"
import { TableQr } from "./TableQr"
import { useState } from "react"
import { TableModal } from "./TableModal"
import { useCollectionData } from "@livequery/react"
import { Restaurant, RestaurantTable } from "@/types"
import { SmartQueryItem } from "@livequery/client"
import { getRestaurantContext } from "@/hooks/useRestaurant"
import { SearchBox } from "@/components/common/SearchBox"


export const TableList = () => {

    const r = getRestaurantContext()
    const { colorMode } = useColorMode()
    const [active_table, set_active_table] = useState<undefined | null | SmartQueryItem<RestaurantTable>>(null)

    const $tables = useCollectionData<RestaurantTable>(`restaurants/${r.id}/tables`)


    return (
        <VStack w='full' spacing='5'>
            {
                active_table !== null && (
                    <TableModal
                        onClose={() => set_active_table(null)}
                        table={active_table}
                        restaurant_id={r.id}
                    />
                )
            }
            <VStack
                w='full'
                bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
                borderRadius='5px'
                border='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
                spacing='7'
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
                    <Button size='sm' onClick={() => set_active_table(undefined)}>Tạo bàn mới</Button>
                </HStack>
                <HStack w={{ base: '100%', md: '70%' }}>
                    <SearchBox
                        placeholder='Tìm kiếm bàn...'
                        onSearch={value => $tables.filter({
                            ...$tables.filters,
                            "name:like": value,
                        })}
                    />
                </HStack>
                <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4' px='4'>
                    {
                        $tables.items.map((table, i) => (
                            <TableItem
                                key={table.id}
                                onClick={() => set_active_table(table)}
                                table={table}
                                index={i + 1}
                            />
                        ))
                    }
                </SimpleGrid>
                {
                    $tables.loading && <Spinner color="teal.500" size='lg' />
                }
                {
                    $tables.empty && <Text fontSize='18px' color="teal.500">Chưa có bàn...</Text>
                }
            </VStack>
            <VStack
                w='full'
                bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
                borderRadius='5px'
                border='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
                spacing='7'
                pb='5'
            >
                <HStack
                    w='full'
                    p='4'
                    borderBottom='1px'
                    borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                    justifyContent='space-between'
                >
                    <Text fontWeight='600'>Danh sách qr</Text>
                    <Button size='sm' onClick={() => window.print()}>Xuất mã Qr</Button>
                </HStack>
                <SimpleGrid columns={[2, 3, 4, 6]} spacing='4' p='4' w='full'>
                    {
                        $tables.items.map(table => (
                            <TableQr
                                key={table.id}
                                table={table}
                            />
                        ))
                    }
                </SimpleGrid>
            </VStack>
        </VStack >
    )
}