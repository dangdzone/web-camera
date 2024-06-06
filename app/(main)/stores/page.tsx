'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { FindLocationNames } from "@/components/common/FindLocationNames"
import { SearchBox } from "@/components/common/SearchBox"
import { Store } from "@/type"
import { HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { useCollectionData } from "@livequery/react"
import { FiMapPin } from "react-icons/fi"
import { RiHome2Line } from "react-icons/ri"

export default function StorePage() {

    const { items: $stores, filters, filter } = useCollectionData<Store>('stores')

    return (
        <VStack w='full' py='5' spacing='5'>
            <DirectionalLink directional={[
                { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                { name: 'Hệ thống cửa hàng' },
            ]} />
            <VStack w='full' maxW='3xl' spacing='5'>
                <SearchBox
                    placeholder={'Tìm kiếm địa chỉ...'}
                    onSearch={value => filter({
                        ...filters,
                        "_id:like": value,
                        "name:like": value,
                    })}
                />
                {
                    $stores.map(store => {

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
                                key={store.id}
                                spacing='3'
                            >
                                <FiMapPin size='25px' />
                                <Stack spacing='0'>
                                    <Text fontWeight='700'>{store.name}</Text>
                                    <Text fontSize='14px'>{`${store?.street}, ${locationNames.wardName}, ${locationNames.districtName}, ${locationNames.provinceName}`}</Text>
                                </Stack>
                            </HStack>
                        )
                    })
                }
            </VStack>
        </VStack>
    )
}