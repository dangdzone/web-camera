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
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"

export const ProductList = () => {

    const { fuser } = useFirebaseUserContext()
    const [active_product, set_active_product] = useState<undefined | null | SmartQueryItem<Product>>(null)
    const $products = useCollectionData<Product>(fuser && 'products')

    return (
        <Stack w='full' spacing='7'>
            <Stack w='full' flexDir={{ base: 'column', md: 'row' }}>
                <HStack w={{ base: '100%', md: '40%' }}>
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
                <HStack w='full'>
                    <Button w='full' variant='outline' borderRadius='10px' isDisabled>Giá tăng dần</Button>
                    <Button w='full' variant='outline' borderRadius='10px' isDisabled>Giá giảm dần</Button>
                </HStack>
                <Button variant='outline' borderRadius='10px' leftIcon={<FiPlus />} onClick={() => set_active_product(undefined)}>Thêm sản phẩm</Button>
            </Stack>
            {
                active_product !== null && (
                    <ProductModal onClose={() => set_active_product(null)} product={active_product} />
                )
            }
            <SimpleGrid w='full' spacing='4' columns={[1, 1, 2, 3]}>
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