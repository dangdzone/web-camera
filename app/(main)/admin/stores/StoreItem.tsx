import { Store } from "@/type"
import { HStack, Stack, Text } from "@chakra-ui/layout"
import { SmartQueryItem } from "@livequery/client"
import { FiMapPin } from "react-icons/fi"

export type StoreItem = {
    store: SmartQueryItem<Store>,
    onClick?: () => void
}

export const StoreItem = ({ store, onClick} : StoreItem) => {
    return (
        <Stack
            w='full'
            p='4'
            spacing='0'
            borderRadius='10px'
            border='1px'
            borderColor='blackAlpha.200'
            _hover={{
                bg: 'blackAlpha.100'
            }}
            onClick={onClick}
        >
            <Text fontWeight='700'>{store.name}</Text>
            <HStack>
                <FiMapPin />
                <Text fontSize='14px'>{store.address}</Text>
            </HStack>
        </Stack>
    )
}