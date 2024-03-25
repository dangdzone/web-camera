
import { HStack, SimpleGrid, Text, VStack, Wrap } from "@chakra-ui/layout"
import { useState } from "react"
import { Button, Spinner, useColorMode } from "@chakra-ui/react"
import { theme } from "@/theme"
import { CategoryModal } from "./categoties/CategoryModal"
import { FoodModal } from "./foods/FoodModal"
import { Category, Food } from "@/types"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData } from "@livequery/react"
import { CategoryItem } from "./categoties/CategoryItem"
import { FoodItem } from "./foods/FoodItem"
import { getRestaurantContext } from "@/hooks/useRestaurant"
import { SearchBox } from "@/components/common/SearchBox"
import { AlertModal } from "@/components/common/AlertModal"

export const MenuResraurantList = () => {

    const r = getRestaurantContext()
    const { colorMode } = useColorMode()
    const [active_category, set_active_category] = useState<undefined | null | SmartQueryItem<Category>>(null)
    const [active_food, set_active_food] = useState<undefined | null | SmartQueryItem<Food>>(null)

    const [alert_category, set_alert_category] = useState<boolean>(false)
    const [alert_remove_category, set_alert_remove_category] = useState<boolean>(false)

    const [alert_food, set_alert_food] = useState<boolean>(false)
    const [alert_remove_food, set_alert_remove_food] = useState<boolean>(false)

    const $categories = useCollectionData<Category>(`restaurants/${r.id}/categories`)
    const $foods = useCollectionData<Food>(`restaurants/${r.id}/foods`)
    const { filters, filter } = $foods

    return (
        <VStack w='full' spacing='5'>
            {
                active_category !== null && (
                    <CategoryModal
                        onClose={() => set_active_category(null)}
                        category={active_category}
                        alert_check={() => set_alert_category(true)}
                        alert_remove={() => set_alert_remove_category(true)}
                    />
                )
            }
            {alert_category && <AlertModal onClose={() => set_alert_category(false)} title={'Thêm danh mục món thành công !'} />}
            {alert_remove_category && <AlertModal onClose={() => set_alert_remove_category(false)} title={'Xóa danh mục món thành công !'} />}
            {
                active_food !== null && (
                    <FoodModal
                        onClose={() => set_active_food(null)}
                        food={active_food}
                        categories={$categories.items}
                        alert_check={() => set_alert_food(true)}
                        alert_remove={() => set_alert_remove_food(true)}
                    />
                )
            }
            {alert_food && <AlertModal onClose={() => set_alert_food(false)} title={'Thêm món ăn thành công !'} />}
            {alert_remove_food && <AlertModal onClose={() => set_alert_remove_food(false)} title={'Xóa món ăn thành công !'} />}
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
                <HStack w={{ base: '100%', md: '70%' }}>
                    <SearchBox
                        placeholder='Tìm kiếm danh mục...'
                        onSearch={value => $categories.filter({
                            ...$categories.filters,
                            "name:like": value,
                        })}
                    />
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
                spacing='7'
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
                <VStack w='full'>
                    <HStack w={{ base: '100%', md: '70%' }}>
                        <SearchBox
                            placeholder='Tìm kiếm món...'
                            onSearch={value => $foods.filter({
                                ...$foods.filters,
                                "status:like": value,
                                "name:like": value,
                                "description:like": value,
                                "category_id:like": value,
                            })}
                        />
                    </HStack>
                </VStack>
                <Wrap spacing={4} px='4'>
                    <Button
                        colorScheme={!filters.category_id ? 'orange' : 'gray'}
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
                                colorScheme={category.id == filters.category_id ? 'orange' : 'gray'}
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