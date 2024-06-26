'use client'
import { Stack, Text } from "@chakra-ui/layout";
import { CategoryList } from "./category/CategoryList";
import { ProductList } from "./product/ProductList";


export default function CategoryProductPage() {
    return (
        <Stack w='full' spacing='7'>
            <Stack w='full' spacing='4'>
                <Text fontWeight='600' fontSize='18px'>Danh mục</Text>
                <CategoryList />
            </Stack>
            <Stack w='full' spacing='4'>
                <Text fontWeight='600' fontSize='18px'>Sản phẩm</Text>
                <ProductList />
            </Stack>
        </Stack>
    )
}