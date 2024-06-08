import { Store } from "@/type"
import { Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import { useForm } from "react-hook-form"
import dvhcvn from '../../../../dvhcvn.json';
import { useEffect, useState } from "react"

export type StoreModal = {
    store?: SmartQueryItem<Store>
    onClose: () => void
}

export const StoreModal = ({ onClose, store }: StoreModal) => {

    const { transporter } = useLiveQueryContext()
    const { register, handleSubmit, watch, control, formState: { errors, isSubmitting, isDirty }, reset } = useForm<Store>({
        defaultValues: {
            name: store?.name,
            province: store?.province, // Tỉnh
            district: store?.district,// huyện
            ward: store?.ward, // Phường, xã
            street: store?.street, // Số nhà, tên đường
            link_map: store?.link_map
        }
    })

    const provinces = dvhcvn.data;
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);
    const selectedProvince = watch("province");
    const selectedDistrict = watch("district");

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

    async function onSubmit(data: Store) {
        if (store) {
            store.__update(data)
        } else {
            await transporter.add(`stores`, data)
        }
        onClose()
    }

    function remove() {
        store?.__remove()
        onClose()
    }

    return (
        <Modal
            isOpen={true}
            size={'2xl'}
            onClose={onClose}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent mx='2' borderRadius='15px'>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <ModalHeader p='3'>
                        {store ? 'Cập nhật cửa hàng' : 'Tạo cửa hàng mới'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody px={{ base: '2', md: '4' }} py='6'>
                        <Stack w='full' spacing='7'>
                            <Stack w='full' spacing='3'>
                                <Text>Tên cửa hàng</Text>
                                <Input
                                    placeholder='Nhập tên cửa hàng...'
                                    {...register('name', { required: true })}
                                    onFocus={e => e.target.select()}
                                />
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Tỉnh/Thành phố</Text>
                                <Select placeholder="Chọn Tỉnh/Thành phố" {...register('province', { required: true })}>
                                    {provinces.map((province) => (
                                        <option key={province.level1_id} value={province.level1_id}>
                                            {province.name}
                                        </option>
                                    ))}
                                </Select>
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Quận/Huyện</Text>
                                <Select placeholder="Chọn Quận/Huyện" {...register('district', { required: true })} disabled={!districts.length}>
                                    {districts.map((district) => (
                                        <option key={district.level2_id} value={district.level2_id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </Select>
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Phường/Xã</Text>
                                <Select placeholder="Chọn Phường/Xã" {...register('ward', { required: true })} disabled={!wards.length}>
                                    {wards.map((ward) => (
                                        <option key={ward.level3_id} value={ward.level3_id}>
                                            {ward.name}
                                        </option>
                                    ))}
                                </Select>
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Số nhà, tên đường</Text>
                                <Input
                                    placeholder='Nhập số nhà, tên đường...'
                                    {...register('street', { required: true })}
                                    onFocus={e => e.target.select()}
                                />
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Link map</Text>
                                <Input
                                    placeholder='Nhập đường dẫn google map...'
                                    {...register('link_map')}
                                    onFocus={e => e.target.select()}
                                />
                            </Stack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack w='full' justifyContent='space-between'>
                            <HStack>
                                {
                                    store && (
                                        <Button onClick={remove} variant='ghost' borderRadius='10px' colorScheme='red'>Xóa</Button>
                                    )
                                }
                            </HStack>
                            <HStack>
                                <Button onClick={onClose} variant='ghost' borderRadius='10px' colorScheme='messenger'>Hủy</Button>
                                {
                                    isDirty && (
                                        <Button
                                            variant='solid'
                                            colorScheme='messenger'
                                            type="submit"
                                            borderRadius='10px'
                                            isLoading={isSubmitting}
                                        >
                                            {store ? 'Cập nhật' : 'Tạo mới'}
                                        </Button>
                                    )
                                }
                            </HStack>
                        </HStack>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}