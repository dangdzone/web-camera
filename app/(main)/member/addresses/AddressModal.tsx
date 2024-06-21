
import { Address } from "@/type"
import { Button, FormControl, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Switch, Text } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import dvhcvn from '../../../../dvhcvn.json';
import { useEffect, useState } from "react"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"

export type AddressModal = {
    address?: SmartQueryItem<Address>
    onClose: () => void
    isOpen?: boolean
}

export const AddressModal = ({ onClose, address, isOpen }: AddressModal) => {

    const { transporter } = useLiveQueryContext()
    const { fuser } = useFirebaseUserContext()
    const $address = useForm<Address>({
        defaultValues: {
            customer_id: fuser?.uid,
            name: address?.name,
            phone: address?.phone,
            district: address?.district,
            province: address?.province,
            ward: address?.ward,
            street: address?.street,
            default: address?.default ?? false
        }
    })

    const provinces = dvhcvn.data;
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);
    const selectedProvince = $address.watch("province");
    const selectedDistrict = $address.watch("district");

    useEffect(() => {
        if (selectedProvince) {
            const province = provinces.find(p => p.level1_id === selectedProvince);
            setDistricts(province?.level2s || []);
            setWards([]);
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            const district = districts.find(d => d.level2_id === selectedDistrict);
            setWards(district?.level3s || []);
        } else {
            setWards([]);
        }
    }, [selectedDistrict, districts]);

    async function onSubmit(data: Address) {
        if (address) {
            address.__update(data)
        } else {
            await transporter.add(`customers/${fuser?.uid}/addresses`, data)
        }
        onClose()
    }

    function remove() {
        address?.__remove()
        onClose()
    }

    return (
        <Modal
            isOpen={!!isOpen}
            size={'2xl'}
            onClose={onClose}
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <FormProvider {...$address}>
                <form onSubmit={$address.handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <ModalContent mx='2' borderRadius='15px'>
                        <ModalHeader p='3'>
                            {address ? 'Cập nhật địa chỉ' : 'Tạo địa chỉ mới'}
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
                            <Stack w='full' spacing='7'>
                                <Stack w='full' spacing='3'>
                                    <Text>Họ và tên</Text>
                                    <Input borderRadius='10px' placeholder="Nhập họ và tên" {...$address.register('name', { required: true })} onFocus={e => e.target.select()} />
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Số điện thoại</Text>
                                    <Input borderRadius='10px' placeholder="Nhập số điện thoại" {...$address.register('phone', { required: true })} onFocus={e => e.target.select()} />
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text>Tỉnh / Thàn phố</Text>
                                    <Select borderRadius='10px' placeholder="Chọn Tỉnh/Thành phố" {...$address.register('province', { required: true })}>
                                        {provinces.map((province) => (
                                            <option key={province.level1_id} value={province.level1_id}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text fontWeight='400'>Quận / Huyện</Text>
                                    <Select borderRadius='10px' placeholder="Chọn Quận/Huyện" {...$address.register('district', { required: true })} disabled={!districts.length}>
                                        {districts.map((district) => (
                                            <option key={district.level2_id} value={district.level2_id}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text fontWeight='400'>Phường / Xã</Text>
                                    <Select borderRadius='10px' placeholder="Chọn Phường/Xã" {...$address.register('ward', { required: true })} disabled={!wards.length}>
                                        {wards.map((ward) => (
                                            <option key={ward.level3_id} value={ward.level3_id}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Stack>
                                <Stack w='full' spacing='3'>
                                    <Text fontWeight='400'>Số nhà / Tên đường</Text>
                                    <Input borderRadius='10px' placeholder="Nhập số nhà, tên đường" {...$address.register('street', { required: true })} onFocus={e => e.target.select()} />
                                </Stack>
                                <HStack w='full' spacing='5'>
                                    <Text fontWeight='400' whiteSpace='nowrap'>Mặc định</Text>
                                    <FormControl>
                                        <Controller
                                            name="default"
                                            control={$address.control}
                                            render={({ field }) => (
                                                <Switch isChecked={field.value} onChange={field.onChange} />
                                            )}
                                        />
                                    </FormControl>
                                </HStack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter p={{ base: '2', md: '4' }}>
                            <HStack w='full' justifyContent='space-between'>
                                <HStack>
                                    {
                                        address && (
                                            <Button onClick={remove} variant='ghost' borderRadius='10px' colorScheme='red'>Xóa</Button>
                                        )
                                    }
                                </HStack>
                                <HStack>
                                    <Button onClick={onClose} variant='ghost' borderRadius='10px' colorScheme='messenger'>Hủy</Button>
                                    {
                                        $address.formState.isDirty && (
                                            <Button
                                                variant='solid'
                                                colorScheme='messenger'
                                                type="submit"
                                                borderRadius='10px'
                                                isLoading={$address.formState.isSubmitting}
                                            >
                                                {address ? 'Cập nhật' : 'Tạo mới'}
                                            </Button>
                                        )
                                    }
                                </HStack>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </FormProvider>
        </Modal>
    )
}