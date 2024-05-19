import { Brand, Product } from "@/type"
import { HStack, Stack, Text } from "@chakra-ui/layout"
import { SmartQueryItem } from "@livequery/client"
import { CollectionData, useCollectionData } from "@livequery/react"

export type BrandList = {
    products: CollectionData<Product>
}

export const BrandList = ({ products }: BrandList) => {

    const $brands = useCollectionData<Brand>('brands')

    return (
        <Stack w='full' spacing='5'>
            <Text fontWeight='700'>Thương hiệu</Text>
            <HStack w='full' flexWrap='wrap'>
                <Text
                    px='4' py='2'
                    borderRadius='10px'
                    border='1px' borderColor='blackAlpha.100'
                    bg={!products.filters.brand_id ? 'blue.200' : 'blackAlpha.50'}
                    fontWeight='600'
                    cursor='pointer'
                    onClick={() => products.filter({
                        ...products.filters,
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
                            bg={brand.id == products.filters.brand_id ? 'blue.200' : 'blackAlpha.50'}
                            fontWeight='600'
                            cursor='pointer'
                            onClick={() => products.filter({
                                ...products.filters,
                                brand_id: brand.id
                            })}
                        >
                            {brand.name}
                        </Text>
                    ))
                }
            </HStack>
        </Stack>
    )
}