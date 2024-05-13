import { Stack, Text } from "@chakra-ui/layout"
import { Button, Image, Input } from "@chakra-ui/react"
import { StoreList } from "./StoreList"
import { useState } from "react"
import { StoreModal } from "./StoreModal"
import { SmartQueryItem } from "@livequery/client"
import { Store } from "@/type"
import { useCollectionData } from "@livequery/react"

export const StoreInfoPage = () => {

    const [store_active, set_store_active] = useState<undefined | null | SmartQueryItem<Store>>(null)
    const $stores = useCollectionData<Store>('stores')
    console.log($stores )

    return (
        <Stack w='full' spacing='7'>
            {
                store_active !== null && (
                    <StoreModal onClose={() => set_store_active(null)} store={store_active} />
                )
            }
            <Text fontWeight='700' fontSize='18px'>Thông tin cửa hàng</Text>
            <Stack w='full' flexDirection={{ base: 'column', md: 'row' }} spacing='5'>
                <Stack w={{ base: '100%', md: '60%' }} spacing='5'>
                    <Text>Tên cửa hàng</Text>
                    <Input placeholder='gofly' />
                    <Text>Ảnh</Text>
                    <Image borderRadius='10px' p='5' border='1px' borderColor='blackAlpha.200' maxW='200px' src='https://www.flygo-aviation.com/wp-content/uploads/2021/08/flygo-logo-trp-big.png' />
                    <Text>Liện hệ</Text>
                    <Input placeholder='0814201002' />
                </Stack>
                <Stack w={{ base: '100%', md: '40%' }}>
                    <StoreList />
                </Stack>
            </Stack>
            <Button onClick={() => set_store_active(undefined)}>Cập nhật thông tin</Button>
        </Stack>
    )
}