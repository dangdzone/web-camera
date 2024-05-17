'use client'
import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
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
            <SimpleGrid w='full' spacing='2' columns={[2, 3, 5, 6, 7, 8]}>
                {
                    $categories.items.map(category => (
                        <CategoryItemBox category={category} />
                    ))
                }
            </SimpleGrid>
            <HStack w='full'>
                {
                    $brands.items.map(brand => (
                        <Text
                            px='4' py='2'
                            key={brand.id}
                            borderRadius='10px'
                            border='1px' borderColor='blackAlpha.100'
                            bg='blackAlpha.50'
                            fontWeight='600'
                        >
                            {brand.name}
                        </Text>
                    ))
                }
            </HStack>
            <SimpleGrid w='full' spacing='4' columns={[1, 2, 3, 4]}>
                {
                    $products.items.map(product => (
                        <ProductItemBox product={product} key={product.id} />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}