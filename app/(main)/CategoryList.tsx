import { Category, Product } from "@/type"
import { Center, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/layout"
import { CollectionData, useCollectionData } from "@livequery/react"
import { FaCheck } from "react-icons/fa6"

export type CategoryList = {
    products: CollectionData<Product>
}

export const CategoryList = ({ products }: CategoryList) => {

    const $categories = useCollectionData<Category>('categories')

    return (
        <Stack w='full' spacing='5'>
            <Text fontWeight='700'>Danh mục</Text>
            <SimpleGrid w='full' spacing='2' columns={[2, 3, 5, 6, 7, 8]}>
                <Stack
                    bgImage={'https://thbvn.com/cdn/images/restore-lap-camera-an-ninh-cho-ho-gia-dinh-3optimized.jpeg'}
                    borderRadius='10px'
                    minH='125px'
                    backgroundSize='cover'
                    backgroundPosition='center'
                    backgroundRepeat='no-repeat'
                    _hover={{
                        cursor: 'pointer',
                        transform: 'scale(1.02)',
                        transition: 'all 0.3s'
                    }}
                    spacing='0'
                    onClick={() => products.filter({
                        ...products.filters,
                        category_id: undefined
                    })}
                >
                    <HStack w='full' color='white' px='2' bg={'blackAlpha.600'} borderTopRadius='10px' justifyContent='space-between'>
                        <Text fontSize='14px' py='2' fontWeight='600'>Tất cả</Text>
                        {
                            !products.filters.category_id && <Center p='1' borderRadius='10px' bg='#4299E1'><FaCheck /></Center>
                        }
                    </HStack>
                </Stack>
                {
                    $categories.items.map(category => (
                        <Stack
                            bgImage={category.image}
                            borderRadius='10px'
                            minH='125px'
                            backgroundSize='cover'
                            backgroundPosition='center'
                            backgroundRepeat='no-repeat'
                            _hover={{
                                cursor: 'pointer',
                                transform: 'scale(1.02)',
                                transition: 'all 0.3s'
                            }}
                            spacing='0'
                            onClick={() => products.filter({
                                ...products.filters,
                                category_id: category.id
                            })}
                            key={category.id}
                        >
                            <HStack w='full' color='white' px='2' bg={'blackAlpha.600'} borderTopRadius='10px' justifyContent='space-between'>
                                <Text fontSize='14px' py='2' fontWeight='600'>{category.name}</Text>
                                {
                                    products.filters.category_id == category.id && <Center p='1' borderRadius='10px' bg='#4299E1'><FaCheck /></Center>
                                }
                            </HStack>
                        </Stack>
                    ))
                }
            </SimpleGrid>
        </Stack>
    )
}