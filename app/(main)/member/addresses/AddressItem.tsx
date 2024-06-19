import { FindLocationNames } from "@/components/common/FindLocationNames"
import { Address } from "@/type"
import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"

export type AddressItem = {
    address: SmartQueryItem<Address>
    onClick: () => void
}

export const AddressItem = ({ address, onClick }: AddressItem) => {

    const provinceId = `${address?.province}`
    const districtId = `${address?.district}`
    const wardId = `${address?.ward}`

    const locationNames = FindLocationNames(provinceId, districtId, wardId)

    return (
        <Stack
            w='full' onClick={onClick} borderRadius='10px'
            border='1px'
            borderColor={address.default == true ? 'red.300' : 'blackAlpha.200'}
            py='2' px='4'
            spacing='1'
            bg={address.default == true ? 'red.50' : 'blackAlpha.50'}
            cursor='pointer'
        >
            <HStack w='full' justifyContent='space-between'>
                <HStack fontSize='14px'>
                    <Text fontWeight='600'>{address?.name}</Text>
                    <Text>{address?.phone}</Text>
                </HStack>
                {
                    address.default == true && <Tag size='sm' colorScheme='red'>Mặc định</Tag>
                }
            </HStack>
            <Text fontSize='14px'>{`${address?.street}, ${locationNames.wardName}, ${locationNames.districtName}, ${locationNames.provinceName}`}</Text>
        </Stack>
    )
}