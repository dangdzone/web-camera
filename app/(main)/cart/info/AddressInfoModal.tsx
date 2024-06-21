import { FindLocationNames } from "@/components/common/FindLocationNames"
import { Address } from "@/type"
import { Box, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa"

export type AddressInfoModal = {
    address: SmartQueryItem<Address>[]
    onClose: () => void
    onSetAddressId: (id: string) => void
    address_id_active: string
}

export const AddressInfoModal = ({ onClose, address, onSetAddressId, address_id_active }: AddressInfoModal) => {

    const [addres_id, set_address_id] = useState<string>(address_id_active)
    const handleSetAddressId = () => {
        onSetAddressId(addres_id);
        onClose()
    }

    return (
        < Modal
            isOpen={true}
            size={'2xl'}
            onClose={onClose}
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <ModalContent mx='2' borderRadius='15px'>
                <ModalHeader p='3'>
                    Thông tin giao hàng ({address?.length})
                </ModalHeader>
                <ModalCloseButton borderRadius='full' mt='1' />
                <ModalBody
                    px={{ base: '2', md: '4' }} py='6'
                    sx={{
                        "::-webkit-scrollbar": {
                            w: { base: 'none', md: '2' },
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '5',
                            bg: 'blackAlpha.300',
                        },
                        "::-webkit-scrollbar-thumb:hover": {
                            bg: 'blackAlpha.400'
                        }
                    }}
                >
                    <Stack w='full' spacing='4'>
                        {
                            address.map(item => {

                                const provinceId = `${item?.province}`
                                const districtId = `${item?.district}`
                                const wardId = `${item?.ward}`
                                const locationNames = FindLocationNames(provinceId, districtId, wardId)

                                return (
                                    <Stack
                                        w='full'
                                        key={item.id}
                                        spacing='0'
                                        fontSize='14px'
                                        p='2'
                                        borderRadius='10px'
                                        border='1px'
                                        borderColor={addres_id == item.id ? 'red.500' : 'blackAlpha.100'}
                                        bg={addres_id == item.id ? 'red.50' : 'white'}
                                        onClick={() => set_address_id(item.id)}
                                        cursor='pointer'
                                    >
                                        <HStack w='full' justifyContent='space-between'>
                                            <HStack fontWeight='600'>
                                                <Text>{item?.name}</Text>
                                                <Text>{item?.phone}</Text>
                                            </HStack>
                                            {addres_id == item.id ? <Box color='red.500'><FaCheckCircle size='18px' /></Box> : ''}
                                        </HStack>
                                        <Text>{`${item?.street}, ${locationNames.wardName}, ${locationNames.districtName}, ${locationNames.provinceName}`}</Text>
                                    </Stack>
                                )
                            })
                        }
                    </Stack>
                </ModalBody>
                <ModalFooter p={{ base: '2', md: '4' }}>
                    {
                        addres_id !== address_id_active && (
                            <Button w='full' borderRadius='10px' colorScheme="red" onClick={handleSetAddressId}>Xác nhận</Button>
                        )
                    }
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}