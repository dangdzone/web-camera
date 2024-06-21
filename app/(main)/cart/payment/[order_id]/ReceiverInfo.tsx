
import { FindLocationNames } from "@/components/common/FindLocationNames"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Address } from "@/type"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { useDocumentData } from "@livequery/react"

export type ReceiverInfo = {
    address_id: string
}

export const ReceiverInfo = ({ address_id }: ReceiverInfo) => {

    const { fuser } = useFirebaseUserContext()
    const { item: address } = useDocumentData<Address>(address_id && `customers/${fuser?.uid}/addresses/${address_id}`)

    const provinceId = `${address?.province}`
    const districtId = `${address?.district}`
    const wardId = `${address?.ward}`

    const locationNames = FindLocationNames(provinceId, districtId, wardId)

    const ReceiverList = [
        { name: 'Khách hàng', value: address?.name },
        { name: 'Số điện thoại', value: `${address?.phone}` },
        { name: 'Nhận hàng tại', value: `${address?.street}, ${locationNames.wardName}, ${locationNames.districtName}, ${locationNames.provinceName}` },
    ]

    return (
        <VStack w='full' border='1px' spacing='4' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
            {
                ReceiverList.map((item, i) => (
                    <HStack w='full' key={i} justifyContent='space-between'>
                        <Text opacity='0.8' whiteSpace='nowrap'>{item.name}</Text>
                        <Text fontSize='15px' fontWeight='500' textAlign='end'>{item.value}</Text>
                    </HStack>
                ))
            }
        </VStack>
    )
}