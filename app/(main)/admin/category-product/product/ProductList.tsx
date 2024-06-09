import { Divider, HStack, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/layout"
import { Button, Select, Skeleton } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"
import { ProductItem } from "./ProductItem"
import { useState } from "react"
import { SmartQueryItem } from "@livequery/client"
import { Brand, Product, Resolution } from "@/type"
import { useCollectionData } from "@livequery/react"
import { ProductModal } from "./ProductModal"
import { SearchBox } from "@/components/common/SearchBox"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"

export const ProductList = () => {

    const { fuser } = useFirebaseUserContext()
    const [active_product, set_active_product] = useState<undefined | null | SmartQueryItem<Product>>(null)
    const $products = useCollectionData<Product>(fuser && 'products')
    const $brands = useCollectionData<Brand>('brands')
    const $categories = useCollectionData<Brand>('categories')
    const $resolutions = useCollectionData<Resolution>('resolutions')

    return (
        <Stack w='full' spacing='7'>
            <Stack w='full' flexDir='column' spacing='4'>
                <Stack w='full' spacing='4' flexDir={{ base: 'column', md: 'row' }}>
                    <HStack w={{ base: '100%', md: '30%' }}>
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
                    <Button borderRadius='10px' colorScheme='red' leftIcon={<FiPlus />} onClick={() => set_active_product(undefined)}>Thêm sản phẩm</Button>
                </Stack>
                <Stack w='full' spacing='4' flexDir={{ base: 'column', md: 'row' }}>
                    <Select
                        w={{ base: '100%', md: '25%' }}
                        borderRadius='10px'
                        onChange={(e) => {
                            if (e.target.value == 'all') {
                                $products.filter({
                                    ...$products.filters,
                                    category_id: undefined
                                })
                            } else {
                                $products.filter({
                                    ...$products.filters,
                                    category_id: e.target.value
                                })
                            }
                        }}
                    >
                        <option value='all'>Tất cả danh mục</option>
                        {
                            $categories.items.map(category => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </Select>
                    <Select
                        w={{ base: '100%', md: '25%' }}
                        borderRadius='10px'
                        onChange={(e) => {
                            if (e.target.value == 'all') {
                                $products.filter({
                                    ...$products.filters,
                                    brand_id: undefined
                                })
                            } else {
                                $products.filter({
                                    ...$products.filters,
                                    brand_id: e.target.value
                                })
                            }
                        }}
                    >
                        <option value='all'>Tất cả thương hiệu</option>
                        {
                            $brands.items.map(brand => (
                                <option
                                    key={brand.id}
                                    value={brand.id}
                                >
                                    {brand.name}
                                </option>
                            ))
                        }
                    </Select>
                    <Select
                        w={{ base: '100%', md: '25%' }}
                        borderRadius='10px'
                        onChange={(e) => {
                            if (e.target.value == 'all') {
                                $products.filter({
                                    ...$products.filters,
                                    resolution_id: undefined
                                })
                            } else {
                                $products.filter({
                                    ...$products.filters,
                                    resolution_id: e.target.value
                                })
                            }
                        }}
                    >
                        <option value='all'>Tất cả độ phân giải</option>
                        {
                            $resolutions.items.map(resolution => (
                                <option
                                    key={resolution.id}
                                    value={resolution.id}
                                >
                                    {resolution.name}
                                </option>
                            ))
                        }
                    </Select>
                </Stack>

            </Stack>

            {
                active_product !== null && (
                    <ProductModal onClose={() => set_active_product(null)} product={active_product} />
                )
            }
            {
                $categories.items.map(category => {
                    const products = $products.items.filter(a => a.category_id == category.id)
                    return products.length > 0 && (
                        <Stack w='full' spacing='4'>
                            <HStack w='full' justifyContent='space-between'>
                                <Text fontWeight='700' whiteSpace='nowrap'>{category.name} ({products.length})</Text>
                                <Divider w='90%' />
                            </HStack>
                            <SimpleGrid w='full' spacing='4' columns={[1, 1, 2, 3]}>
                                {
                                    products.map(product => (
                                        <ProductItem key={product.id} product={product} onClick={() => set_active_product(product)} />
                                    ))
                                }
                            </SimpleGrid>
                        </Stack>
                    )
                })
            }
            <VStack w='full'>
                {$products.loading && new Array(5).fill(0).map((_, i) => (
                    <Skeleton w='full' key={i} borderRadius='10px' height='30px' />
                ))}
                {
                    $products.empty && (
                        <Text>Chưa có sản phẩm...</Text>
                    )
                }
            </VStack>
        </Stack>
    )
}