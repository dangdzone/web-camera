import { HStack, SimpleGrid, Stack, VStack } from "@chakra-ui/layout"
import { Button, Skeleton } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"
import { ProductItem } from "./ProductItem"
import { useState } from "react"
import { SmartQueryItem } from "@livequery/client"
import { Product } from "@/type"
import { useCollectionData } from "@livequery/react"
import { ProductModal } from "./ProductModal"
import { SearchBox } from "@/components/common/SearchBox"

export const ProductList = () => {

    const [active_product, set_active_product] = useState<undefined | null | SmartQueryItem<Product>>(null)
    const $products = useCollectionData<Product>('products')

    return (
        <Stack w='full' spacing='7'>
            <HStack w='full'>
                <HStack w='40%'>
                    <SearchBox
                        placeholder={'Tìm kiếm sản phẩm...'}
                        onSearch={value => $products.filter({
                            ...$products.filters,
                            "_id:like": value,
                            "name:like": value,
                            "code:like": value,
                        })}
                    />
                </HStack>
                <Button variant='outline' borderRadius='10px'>Giá giảm dần</Button>
                <Button variant='outline' borderRadius='10px'>Giá tăng dần</Button>
                <Button variant='outline' borderRadius='10px' leftIcon={<FiPlus />} onClick={() => set_active_product(undefined)}>Thêm sản phẩm</Button>
            </HStack>
            {
                active_product !== null && (
                    <ProductModal onClose={() => set_active_product(null)} product={active_product} />
                )
            }
            <SimpleGrid w='full' spacing='4' columns={[2, 3]}>
                {
                    $products.items.map(product => (
                        <ProductItem key={product.id} product={product} onClick={() => set_active_product(product)} />
                    ))
                }
            </SimpleGrid>
            <VStack w='full'>
                {$products.loading && new Array(5).fill(0).map((_, i) => (
                    <Skeleton w='full' key={i} borderRadius='10px' height='30px' />
                ))}
            </VStack>
        </Stack>
    )
}