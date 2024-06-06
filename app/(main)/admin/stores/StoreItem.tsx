import { FindLocationNames } from "@/components/common/FindLocationNames"
import { Store } from "@/type"
import { HStack, Stack, Text } from "@chakra-ui/layout"
import { SmartQueryItem } from "@livequery/client"
import { FiMapPin } from "react-icons/fi"

export type StoreItem = {
    store: SmartQueryItem<Store>,
    onClick?: () => void
}

export const StoreItem = ({ store, onClick }: StoreItem) => {

    const provinceId = `${store?.province}`
    const districtId = `${store?.district}`
    const wardId = `${store?.ward}`

    const locationNames = FindLocationNames(provinceId, districtId, wardId)

    return (
        <HStack
            w='full'
            p='4'
            borderRadius='10px'
            border='1px'
            borderColor='blackAlpha.200'
            _hover={{
                bg: 'blackAlpha.100'
            }}
            onClick={onClick}
            spacing='3'
        >
            <FiMapPin size='25px' />
            <Stack spacing='0'>
                <Text fontWeight='700'>{store.name}</Text>
                <Text fontSize='14px'>{`${store?.street}, ${locationNames.wardName}, ${locationNames.districtName}, ${locationNames.provinceName}`}</Text>
            </Stack>
        </HStack>
    )
}