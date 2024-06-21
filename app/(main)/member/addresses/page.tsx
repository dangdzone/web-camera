'use client'

import { Address } from "@/type"
import { HStack, Stack, VStack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData } from "@livequery/react"
import { useState } from "react"
import { AddressModal } from "./AddressModal"
import { AddressItem } from "./AddressItem"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { FiPlus } from "react-icons/fi"

export default function AddressesPage() {

    const { fuser } = useFirebaseUserContext()
    const [active_address, set_active_address] = useState<undefined | null | SmartQueryItem<Address>>(null)
    const $addresses = useCollectionData<Address>(`customers/${fuser?.uid}/addresses`)

    return fuser && (
        <Stack w='full' spacing='5'>
            {
                active_address !== null && (
                    <AddressModal onClose={() => set_active_address(null)} address={active_address} isOpen={true} />
                )
            }
            <HStack w='full' justifyContent='flex-end'>
                <Button borderRadius='10px' size='sm' leftIcon={<FiPlus />} colorScheme='red' onClick={() => set_active_address(undefined)}>Thêm địa chỉ</Button>
            </HStack>
            <VStack w='full' spacing='4'>
                {
                    $addresses.items.map(address => (
                        <AddressItem
                            address={address}
                            onClick={() => set_active_address(address)}
                            key={address.id}
                        />
                    ))
                }
            </VStack>
        </Stack>
    )
}