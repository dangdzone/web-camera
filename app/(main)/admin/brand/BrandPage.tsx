import { Brand } from "@/type"
import { Center, SimpleGrid, Stack, Text } from "@chakra-ui/layout"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData } from "@livequery/react"
import { useState } from "react"
import { BrandModal } from "./BrandModal"
import { BrandItem } from "./BrandItem"
import { FiPlus } from "react-icons/fi"
import { Skeleton } from "@chakra-ui/react"


export const BrandPage = () => {

    const [active_brand, set_active_brand] = useState<undefined | null | SmartQueryItem<Brand>>(null)
    const $brands = useCollectionData<Brand>('brands')

    return (
        <Stack w='full' spacing='7'>
            <Text fontWeight='700' fontSize='18px'>Thương hiệu</Text>
            {
                active_brand !== null && (
                    <BrandModal onClose={() => set_active_brand(null)} brand={active_brand} />
                )
            }
            <SimpleGrid w='full' spacing='4' columns={[4, 5, 6, 7]}>
                {
                    $brands.items.map(brand => (
                        <BrandItem key={brand.id} brand={brand} onClick={() => set_active_brand(brand)} />
                    ))
                }
                {
                    $brands.loading ? new Array(5).fill(0).map((_, i) => (
                        <Skeleton key={i} borderRadius='10px' height='100px' />
                    )) : (
                        <Center
                            minH='100px'
                            bg='blackAlpha.50'
                            borderRadius='10px'
                            border='1px dashed'
                            borderColor='blackAlpha.200'
                            _hover={{ bg: 'blackAlpha.200' }}
                            onClick={() => set_active_brand(undefined)}
                            cursor='pointer'
                        >
                            <FiPlus />
                        </Center>
                    )
                }
            </SimpleGrid>
        </Stack>
    )
}