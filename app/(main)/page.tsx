'use client'
import { SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import { Image, Spinner } from "@chakra-ui/react";
import { useCollectionData } from "@livequery/react";
import { Product } from "@/type";
import { ProductItemBox } from "@/app/(main)/ProductItemBox";
import { BrandList } from "./BrandList";
import { CategoryList } from "./CategoryList";

export default function MainPage() {

    const $products = useCollectionData<Product>('products')

    return (
        <VStack w='full' spacing='7' py='5'>
            <SimpleGrid w='full' spacing='2' columns={[2]}>
                <Image borderRadius='5px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:80/plain/https://dashboard.cellphones.com.vn/storage/r50.png' />
                <Image borderRadius='5px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:80/plain/https://dashboard.cellphones.com.vn/storage/r100.png' />
            </SimpleGrid>
            <CategoryList products={$products} />
            <BrandList products={$products} />
            <SimpleGrid w='full' spacing='4' columns={[1, 2, 3, 4]}>
                {
                    $products.items.map(product => (
                        <ProductItemBox product={product} key={product.id} />
                    ))
                }
            </SimpleGrid>
            <VStack w='full' spacing='5'>
                {$products.loading && <Spinner color="teal.500" size='lg' />}
                {$products.empty && <Text fontWeight='500'>Chưa có sản phẩm...</Text>}
            </VStack>
        </VStack>
    )
}