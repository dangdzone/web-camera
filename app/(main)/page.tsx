'use client'
import { HStack, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/layout";
import { Image, Select } from "@chakra-ui/react";
import { useCollectionData } from "@livequery/react";
import { Brand, Product, Resolution } from "@/type";
import { ProductItemBox } from "@/app/(main)/ProductItemBox";
import { CategoryList } from "./CategoryList";
import { MainPageLoading } from "@/components/loading/MainPageLoading";
import { useState } from "react";
import { SearchBox } from "@/components/common/SearchBox";

export default function MainPage() {

    const [active_product, set_active_product] = useState<undefined | string>(undefined)
    const $brands = useCollectionData<Brand>('brands')
    const $resolutions = useCollectionData<Resolution>('resolutions')
    const $products = useCollectionData<Product>('products')
    const products = $products.items.filter(product => {
        if (active_product == undefined) return true
        if (active_product == product.brand_id) {
            return product.brand_id == active_product
        }
    })

    return (
        <VStack w='full' spacing='7' py='5'>
            <SimpleGrid w='full' spacing='2' columns={[1, 1, 2, 2]}>
                <Image borderRadius='10px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:80/plain/https://dashboard.cellphones.com.vn/storage/r50.png' />
                <Image borderRadius='10px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:80/plain/https://dashboard.cellphones.com.vn/storage/r100.png' />
            </SimpleGrid>
            <CategoryList products={$products} />
            <Stack w='full' spacing='5'>
                <Text fontWeight='700'>Thương hiệu</Text>
                <HStack w='full' flexWrap='wrap'>
                    <Text
                        px='4' py='2' borderRadius='10px' border='1px' borderColor='blackAlpha.100'
                        bg={active_product == undefined ? 'black' : 'blackAlpha.50'}
                        color={active_product == undefined ? 'white' : 'black'}
                        fontWeight='600' cursor='pointer' onClick={() => set_active_product(undefined)}
                    >
                        Tất cả
                    </Text>
                    {
                        $brands.items.map(brand => (
                            <Text
                                px='4' py='2' key={brand.id} borderRadius='10px' border='1px'
                                borderColor='blackAlpha.100' bg={brand.id == active_product ? 'black' : 'blackAlpha.50'}
                                color={active_product == brand.id ? 'white' : 'black'}
                                fontWeight='600' cursor='pointer' onClick={() => set_active_product(brand.id)}
                            >
                                {brand.name}
                            </Text>
                        ))
                    }
                </HStack>
            </Stack>
            <HStack w='full' spacing='5' flexDir={{base: 'column', md: 'row'}}>
                <HStack spacing='5' w={{ base: '100%', md: '50%' }}>
                    <Text fontWeight='700' whiteSpace='nowrap'>Độ phân giải</Text>
                    <Select borderRadius='10px'
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
                        <option value='all'>Tất cả</option>
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
                </HStack>
                <HStack w={{ base: '100%', md: '50%' }}>
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
            </HStack>
            {$products.loading && <MainPageLoading />}
            {$products.empty && <Text fontWeight='500'>Chưa có sản phẩm...</Text>}

            <SimpleGrid w='full' spacing='4' columns={[1, 2, 3, 4]}>
                {
                    products.filter(a => a.status == 'active').map(product => (
                        <ProductItemBox product={product} key={product.id} />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}