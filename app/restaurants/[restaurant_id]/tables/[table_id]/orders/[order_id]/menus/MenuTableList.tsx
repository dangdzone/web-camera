
import { HStack, SimpleGrid, Text, VStack, Wrap } from "@chakra-ui/layout"
import { useRef, useState } from "react"
import { Button, Input, Spinner, useColorMode } from "@chakra-ui/react"
import { MenuTableItem } from "./MenuTableItem"
import { MenuTabbleModal } from "./MenuTableModal"
import { Category, Food, Restaurant } from "@/types"
import { useCollectionData } from "@livequery/react"
import { SmartQueryItem } from "@livequery/client"
import { Subject } from "rxjs"

export type MenuTableList = {
    restaurant?: Restaurant
    order_id?: string
}

export const MenuTableList = ({ restaurant, order_id }: MenuTableList) => {

    const { colorMode } = useColorMode()
    const [active_menu_table, set_active_menu_table] = useState<undefined | null | SmartQueryItem<Food>>(null)

    const $categories = useCollectionData<Category>(`restaurants/${restaurant?.id}/categories`)
    const $foods = useCollectionData<Food>(`restaurants/${restaurant?.id}/foods`)
    const foods = $foods.items.filter(a => a.status == 'active')
    const { filters, filter } = $foods

    const $value = useRef(new Subject<string>())

    // useEffect(() => {
    //     const s = $value.current.pipe(
    //         debounceTime(500)
    //     ).subscribe(v => onSearch?.(v == '' ? undefined : v))
    //     return () => s.unsubscribe()
    // }, [$value.current])

    return (
        <VStack w='full' spacing='7'>
            {
                active_menu_table !== null && (
                    <MenuTabbleModal
                        onClose={() => set_active_menu_table(null)}
                        food={active_menu_table}
                        restaurant={restaurant}
                        order_id={order_id}
                    />
                )
            }
            {/* <HStack w='full' justifyContent='center'>
                <Input
                    w={{ base: '100%', md: '70%' }}
                    placeholder={'Tìm kiếm...'}
                />
            </HStack> */}
            <Wrap spacing={4} w='full'>
                <Button
                    colorScheme={!filters.category_id ? 'orange' : 'gray'}
                    onClick={() => filter({
                        ...filters,
                        category_id: undefined
                    })}
                    variant={!filters.category_id ? 'solid' : 'outline'}
                    px='7'
                >
                    Tất cả
                </Button>
                {
                    $categories.items.map(category => (
                        <Button
                            key={category.id}
                            colorScheme={category.id == filters.category_id ? 'orange' : 'gray'}
                            onClick={() => filter({
                                ...filters,
                                category_id: category.id
                            })}
                            variant={category.id == filters.category_id ? 'solid' : 'outline'}
                            px='7'
                        >
                            {category.name}
                        </Button>
                    ))
                }
            </Wrap>
            <SimpleGrid w='full' columns={[2, 2, 3, 4, 4]} spacing='4'>
                {
                    foods.map(food => (
                        <MenuTableItem
                            key={food.id}
                            onClick={() => set_active_menu_table(food)}
                            food={food}
                        />
                    ))
                }
            </SimpleGrid>
            {
                $foods.loading && <Spinner color="teal.500" size='lg' />
            }
            {
                $foods.empty && <Text fontSize='18px' color="teal.500">Chưa có món...</Text>
            }
        </VStack>
    )
}