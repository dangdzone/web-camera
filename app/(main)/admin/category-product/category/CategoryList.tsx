import { Center, SimpleGrid } from "@chakra-ui/layout"
import { FiPlus } from "react-icons/fi"
import { CategoryItem } from "./CategoryItem"
import { useCollectionData } from "@livequery/react"
import { Category } from "@/type"
import { useState } from "react"
import { SmartQueryItem } from "@livequery/client"
import { CategoryModal } from "./CategoryModal"

export const CategoryList = () => {

    const [active_category, set_active_category] = useState<undefined | null | SmartQueryItem<Category>>(null)
    const $categories = useCollectionData<Category>('categories')

    return (
        <SimpleGrid w='full' spacing='4' columns={[4, 5, 6, 7, 8]}>
            {
                active_category !== null && <CategoryModal category={active_category} onClose={() => set_active_category(null)} />
            }
            {
                $categories.items.map(category => (
                    <CategoryItem key={category.id} category={category} onClick={() => set_active_category(category)} />
                ))
            }
            <Center
                minH='125px'
                bg='blackAlpha.50'
                borderRadius='10px'
                border='1px dashed'
                borderColor='blackAlpha.200'
                _hover={{ bg: 'blackAlpha.200' }}
                onClick={() => set_active_category(undefined)}
                cursor='pointer'
            >
                <FiPlus />
            </Center>
        </SimpleGrid>
    )
}