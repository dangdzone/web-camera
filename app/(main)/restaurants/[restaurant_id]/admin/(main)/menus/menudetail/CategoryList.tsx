import { HStack, SimpleGrid, VStack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { CategoryItem } from "./CategoryItem"


export const CategoryList = () => {
    return (
        <VStack w='full' spacing='5'>
            <HStack w='full' justifyContent='flex-end'>
                <Button size='sm'>Thêm danh mục mới</Button>
            </HStack>
            <SimpleGrid w='full' columns={[2, 3, 4]} spacing='4'>
                {
                    new Array(5).fill(1).map((_,i) => (
                        <CategoryItem key={i} />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}