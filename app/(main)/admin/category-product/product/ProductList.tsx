import { HStack, SimpleGrid, Stack } from "@chakra-ui/layout"
import { Button, Input } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"
import { ProductItem } from "./ProductItem"
import { useState } from "react"
import { SmartQueryItem } from "@livequery/client"
import { Product } from "@/type"
import { useCollectionData } from "@livequery/react"
import { ProductModal } from "./ProductModal"

export const ProductList = () => {

    const [active_product, set_active_product] = useState<undefined | null | SmartQueryItem<Product>>(null)
    const $products = useCollectionData<Product>('products')

    return (
        <Stack w='full' spacing='7'>
            <HStack w='full'>
                <Input borderRadius='10px' w='50%' placeholder="Tìm kiếm mã sản phẩm" />
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
        </Stack>
    )
}