import { HStack, SimpleGrid, Stack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"
import { ProductItem } from "./ProductItem"

export const ProductList = () => {
    return (
        <Stack w='full' spacing='7'>
            <HStack w='full'>
                <Button variant='outline' borderRadius='10px' leftIcon={<FiPlus />}>Thêm sản phẩm</Button>
                <Button variant='outline' borderRadius='10px'>Giá giảm dần</Button>
                <Button variant='outline' borderRadius='10px'>Giá tăng dần</Button>
            </HStack>
            <SimpleGrid w='full' spacing='4' columns={[2, 3, 4, 5]}>
                {
                    new Array(10).fill(0).map((_, i) => (
                        <ProductItem key={i} />
                    ))
                }
            </SimpleGrid>
        </Stack>
    )
}