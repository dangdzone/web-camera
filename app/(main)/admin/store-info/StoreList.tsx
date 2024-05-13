import { Stack, Text } from "@chakra-ui/layout"
import { StoreItem } from "./StoreItem"


export const StoreList = () => {
    return (
        <Stack w='full' spacing='5'>
            <Text>Hệ thống cửa hàng</Text>
            {
                new Array(5).fill(0).map((_, i) => (
                    <StoreItem key={i} />
                ))
            }
        </Stack>
    )
}