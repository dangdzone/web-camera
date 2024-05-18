'use client'
import { HStack, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/layout";
import { Image, Skeleton, Spinner } from "@chakra-ui/react";
import { useCollectionData } from "@livequery/react";
import { Brand, Category, Product } from "@/type";
import { ProductItemBox } from "@/components/box/ProductItemBox";
import { CategoryItemBox } from "@/components/box/CategoryItemBox";

export default function MainPage() {

    const $products = useCollectionData<Product>('products')
    const $categories = useCollectionData<Category>('categories')
    const $brands = useCollectionData<Brand>('brands')

    return (
        <VStack w='full' py='5' spacing='7'>
            <SimpleGrid w='full' spacing='2' columns={[2]}>
                <Image borderRadius='5px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:80/plain/https://dashboard.cellphones.com.vn/storage/r50.png' />
                <Image borderRadius='5px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:80/plain/https://dashboard.cellphones.com.vn/storage/r100.png' />
            </SimpleGrid>
            <Stack w='full' spacing='5'>
                <Text fontWeight='700'>Danh mục</Text>
                <SimpleGrid w='full' spacing='2' columns={[2, 3, 5, 6, 7, 8]}>
                    {
                        $categories.items.map(category => (
                            <CategoryItemBox key={category.id} category={category} />
                        ))
                    }
                </SimpleGrid>
            </Stack>
            <Stack w='full' spacing='5'>
                <Text fontWeight='700'>Thương hiệu</Text>
                <HStack w='full'>
                    <Text
                        px='4' py='2'
                        borderRadius='10px'
                        border='1px' borderColor='blackAlpha.100'
                        bg={!$products.filters.brand_id ? 'blue.200' : 'blackAlpha.50'}
                        fontWeight='600'
                        cursor='pointer'
                        onClick={() => $products.filter({
                            ...$products.filters,
                            brand_id: undefined
                        })}
                    >
                        Tất cả
                    </Text>
                    {
                        $brands.items.map(brand => (
                            <Text
                                px='4' py='2'
                                key={brand.id}
                                borderRadius='10px'
                                border='1px'
                                borderColor='blackAlpha.100'
                                bg={brand.id == $products.filters.brand_id ? 'blue.200' : 'blackAlpha.50'}
                                fontWeight='600'
                                cursor='pointer'
                                onClick={() => $products.filter({
                                    ...$products.filters,
                                    brand_id: brand.id
                                })}
                            >
                                {brand.name}
                            </Text>
                        ))
                    }
                </HStack>
            </Stack>
            <SimpleGrid w='full' spacing='4' columns={[1, 2, 3, 4]}>
                {
                    $products.items.map(product => (
                        <ProductItemBox product={product} key={product.id} />
                    ))
                }
            </SimpleGrid>
            <VStack w='full' spacing='5'>
                {$products.loading && <Spinner color="teal.500" size='lg' />}
            </VStack>
        </VStack>
    )
}