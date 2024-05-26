import { Brand, Category, Product, Resolution } from "@/type"
import { Box, HStack, Stack, Text } from "@chakra-ui/layout"
import { Image, Tag } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData } from "@livequery/react"
import { MdOutlineRemoveRedEye } from "react-icons/md"

export type ProductItem = {
    product: SmartQueryItem<Product>,
    onClick?: () => void
}

export const ProductItem = ({ product, onClick }: ProductItem) => {

    const $brands = useCollectionData<Brand>('brands')
    const $categories = useCollectionData<Category>('categories')
    const $resolutions = useCollectionData<Resolution>('resolutions')
    const brand_name = $brands.items.filter(a => a.id == product.brand_id).map(a => a.name)
    const category_name = $categories.items.filter(a => a.id == product.category_id).map(a => a.name)
    const resolution_name = $resolutions.items.filter(a => a.id == product.resolution_id).map(a => a.name)

    return (
        <Stack
            w='full'
            p='2'
            borderRadius='10px'
            _hover={{
                cursor: 'pointer',
                transform: 'scale(1.02)',
                transition: 'all 0.3s'
            }}
            border='1px'
            borderColor='blackAlpha.200'
            onClick={onClick}
        >
            <Stack w='full' flexDirection='row' spacing='3'>
                <Box minH='150px' minW='150px'>
                    <Image p='2' borderRadius='10px' border='1px' borderColor='blackAlpha.100' maxH='150px' src={product.image} />
                </Box>
                <Stack fontSize='14px' spacing='3' justifyContent='center'>
                    <Stack spacing='1'>
                        <HStack><Text>Mã:</Text><Text fontWeight='bold'>{product?.code}</Text></HStack>
                        <HStack><Text>Còn lại:</Text><Text fontWeight='bold'>{product?.amount.toLocaleString()} (chiếc)</Text></HStack>
                        <HStack><Text>Giá nhập:</Text><Text fontWeight='bold'>{product?.cost.toLocaleString()} đ</Text></HStack>
                        <HStack><Text>Giá bán:</Text><Text fontWeight='bold'>{product?.price.toLocaleString()} đ</Text></HStack>
                        <HStack><Text>Giá quảng cáo:</Text><Text fontWeight='bold' textDecoration='line-through'>{product?.advertising_price.toLocaleString()} đ</Text></HStack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack w='full'>
                <Text lineHeight='1.3' fontWeight='700' fontSize='14px'>
                    {/* {product.name}{product?.status == 'active' ? '1' : '3'} */}
                </Text>
                <HStack flexWrap='wrap' spacing='1'>
                    <Tag size='sm' colorScheme="red">{category_name}</Tag>
                    <Tag size='sm' colorScheme="orange">{brand_name}</Tag>
                    <Tag size='sm' colorScheme="green">{resolution_name}</Tag>
                </HStack>
            </Stack>
        </Stack>
    )
}