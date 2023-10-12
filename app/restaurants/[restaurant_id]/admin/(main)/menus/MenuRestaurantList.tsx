
import { HStack, SimpleGrid, Text, VStack, Wrap } from "@chakra-ui/layout"
import { useState } from "react"
import { Button, Spinner, useColorMode } from "@chakra-ui/react"
import { theme } from "@/theme"
import { CategoryModal } from "./categoties/CategoryModal"
import { FoodModal } from "./foods/FoodModal"
import { Category, Food, Restaurant } from "@/types"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData } from "@livequery/react"
import { CategoryItem } from "./categoties/CategoryItem"
import { FoodItem } from "./foods/FoodItem"

export type MenuResraurantList = {
    restaurant: Restaurant
}

export const MenuResraurantList = ({ restaurant }: MenuResraurantList) => {

    const { colorMode } = useColorMode()
    const [active_category, set_active_category] = useState<undefined | null | SmartQueryItem<Category>>(null)
    const [active_food, set_active_food] = useState<undefined | null | SmartQueryItem<Food>>(null)

    const $categories = useCollectionData<Category>(`restaurants/${restaurant.id}/categories`)
    const $foods = useCollectionData<Food>(`restaurants/${restaurant.id}/foods`)
    const { filters, filter } = $foods

    return (
        <VStack w='full' spacing='5'>
            {
                active_category !== null && (
                    <CategoryModal
                        onClose={() => set_active_category(null)}
                        restaurant_id={restaurant.id}
                        category={active_category}
                    />
                )
            }
            {
                active_food !== null && (
                    <FoodModal
                        onClose={() => set_active_food(null)}
                        restaurant_id={restaurant.id}
                        food={active_food}
                        categories={$categories.items}
                    />
                )
            }
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
                    <Text fontWeight='600'>Danh mục món</Text>
                    <Button size='sm' onClick={() => set_active_category(undefined)}>Tạo danh mục mới</Button>
                </HStack>
                <SimpleGrid w='full' columns={[2, 2, 2, 4, 4]} spacing='4' px='4'>
                    {
                        $categories.items.map(category => (
                            <CategoryItem
                                key={category.id}
                                category={category}
                                onClick={() => set_active_category(category)}
                            />
                        ))
                    }
                </SimpleGrid>
                <VStack w='full'>
                    {
                        $categories.loading && <Spinner color="teal.500" size='lg' />
                    }
                    {
                        $categories.empty && <Text fontSize='18px' color="teal.500">Chưa có danh mục món...</Text>
                    }
                </VStack>
            </VStack>

            <VStack
                w='full'
                bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
                borderRadius='5px'
                border='1px'
                borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
                spacing='5'
                pb='5'
                align='flex-start'
            >
                <HStack
                    w='full'
                    p='4'
                    borderBottom='1px'
                    borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                    justifyContent='space-between'
                >
                    <Text fontWeight='600'>Danh sách món</Text>
                    <Button size='sm' onClick={() => set_active_food(undefined)}>Tạo món mới</Button>
                </HStack>
                <Wrap spacing={4} px='4'>
                    <Button
                        colorScheme='red'
                        onClick={() => filter({
                            ...filters,
                            category_id: undefined
                        })}
                        variant={!filters.category_id ? 'solid' : 'outline'}
                    >
                        Tất cả
                    </Button>
                    {
                        $categories.items.map(category => (
                            <Button
                                key={category.id}
                                colorScheme='red'
                                onClick={() => filter({
                                    ...filters,
                                    category_id: category.id
                                })}
                                variant={category.id == filters.category_id ? 'solid' : 'outline'}
                            >
                                {category.name}
                            </Button>
                        ))
                    }
                </Wrap>
                <SimpleGrid w='full' columns={[2, 2, 4, 4]} spacing='4' px='4'>
                    {
                        $foods.items.map(food => (
                            <FoodItem
                                key={food.id}
                                onClick={() => set_active_food(food)}
                                food={food}
                            />
                        ))
                    }
                </SimpleGrid>
                <VStack w='full'>
                    {
                        $foods.loading && <Spinner color="teal.500" size='lg' />
                    }
                    {
                        $foods.empty && <Text fontSize='18px' color="teal.500">Chưa có món...</Text>
                    }
                </VStack>
            </VStack>
        </VStack>
    )
}