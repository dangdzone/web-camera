import { HStack, SimpleGrid, VStack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { CategoryItem } from "./CategoryItem"
import { useState } from "react"
import { CategoryModal } from "./CategoryModal"


export const CategoryList = () => {

    const [active_category, set_active_category] = useState<undefined | null>(null)

    return (
        <VStack w='full' spacing='5'>
            {
                active_category !== null && (
                    <CategoryModal onClose={() => set_active_category(null)} />
                )
            }
            <HStack w='full' justifyContent='flex-end'>
                <Button size='sm' onClick={() => set_active_category(undefined)}>Thêm danh mục mới</Button>
            </HStack>
            <SimpleGrid w='full' columns={[2, 3, 4]} spacing='4'>
                {
                    new Array(5).fill(1).map((_,i) => (
                        <CategoryItem key={i} onClick={() => set_active_category(undefined)} />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}