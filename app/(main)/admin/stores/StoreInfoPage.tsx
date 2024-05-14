import { SimpleGrid, Stack, Text } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { useState } from "react"
import { StoreModal } from "./StoreModal"
import { SmartQueryItem } from "@livequery/client"
import { Store } from "@/type"
import { useCollectionData } from "@livequery/react"
import { StoreItem } from "./StoreItem"

export const StorePage = () => {

    const [store_active, set_store_active] = useState<undefined | null | SmartQueryItem<Store>>(null)
    const $stores = useCollectionData<Store>('stores')

    return (
        <Stack w='full' spacing='7'>
            {
                store_active !== null && (
                    <StoreModal onClose={() => set_store_active(null)} store={store_active} />
                )
            }
            <Text fontWeight='700' fontSize='18px'>Hệ thống cửa hàng</Text>
            <Button onClick={() => set_store_active(undefined)}>Thêm cửa hàng mới</Button>
            <SimpleGrid w='full' spacing='4' columns={[1, 2, 3]}>
                {
                    $stores.items.map(store => (
                        <StoreItem key={store.id} store={store} onClick={() => set_store_active(store)} />
                    ))
                }
            </SimpleGrid>
        </Stack>
    )
}