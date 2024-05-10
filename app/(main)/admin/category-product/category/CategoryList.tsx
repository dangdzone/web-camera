import { Center, SimpleGrid } from "@chakra-ui/layout"
import { FiPlus } from "react-icons/fi"
import { CategoryItem } from "./CategoryItem"
import { useCollectionData } from "@livequery/react"
import { Category } from "@/type"
import { useState } from "react"
import { SmartQueryItem } from "@livequery/client"
import { CategoryModal } from "./CategoryModal"

export const CategoryList = () => {

    const CategoryCameraList = [
        { name: 'An ninh', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-camera-an-ninh_1.png' },
        { name: 'Action camera', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-action-cam_1.png' },
        { name: 'Hành trình', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-action-cam_1.png' },
        { name: 'Máy ảnh', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-may-anh.png' },
        { name: 'Flycam', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-flycam_1.png' },
        { name: 'Gimbal', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-gimbal_1.png' },
        { name: 'Tripod', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-tripods_1.png' },
        { name: 'Lắp đặt', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-camera-an-ninh-lap-dat_1.png' },
    ]

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
            >
                <FiPlus />
            </Center>
        </SimpleGrid>
    )
}