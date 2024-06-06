
import { FindLocationNames } from "@/components/common/FindLocationNames"
import { HStack, Text, VStack } from "@chakra-ui/layout"

export type ReceiverInfo = {
    receiver: {
        receiver_name: string // Tên người nhận
        receiver_phone: number // sdt người nhận
        province: number | string // Tỉnh
        district: number | string // huyện
        ward: number | string // Phường, xã
        street: number | string // Số nhà, tên đường
        note: string // ghi chú
    }
}

export const ReceiverInfo = ({ receiver }: ReceiverInfo) => {

    const provinceId = `${receiver?.province}`
    const districtId = `${receiver?.district}`
    const wardId = `${receiver?.ward}`

    const locationNames = FindLocationNames(provinceId, districtId, wardId)

    console.log({provinceId, districtId, wardId})
    const ReceiverList = [
        { name: 'Khách hàng', value: receiver?.receiver_name },
        { name: 'Số điện thoại', value: `0${receiver?.receiver_phone}` },
        { name: 'Nhận hàng tại', value: `${receiver?.street}, ${locationNames.wardName}, ${locationNames.districtName}, ${locationNames.provinceName}` },
        { name: 'Ghi chú', value: receiver?.note },
    ]

    return (
        <VStack w='full' border='1px' spacing='4' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
            {
                ReceiverList.map((item, i) => (
                    <HStack w='full' key={i} justifyContent='space-between'>
                        <Text opacity='0.8'>{item.name}</Text>
                        <Text fontSize='15px' fontWeight='600'>{item.value}</Text>
                    </HStack>
                ))
            }
        </VStack>
    )
}