import { Store } from "@/type"
import { Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import { useForm } from "react-hook-form"

export type StoreModal = {
    store?: SmartQueryItem<Store>
    onClose: () => void
}

export const StoreModal = ({ onClose, store }: StoreModal) => {

    const { transporter } = useLiveQueryContext()
    const { register, handleSubmit, watch, control, formState, reset } = useForm<Store>({
        defaultValues: {
            name: store?.name,
            address: store?.address,
            link_map: store?.link_map
        }
    })

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
            <ModalContent mx='2'>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <ModalHeader p='3' borderBottom='1px solid' borderColor={'gray.200'}>
                        {store ? 'Cập nhật cửa hàng' : 'Tạo cửa hàng mới'}
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
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
                                <Text>Địa chỉ</Text>
                                <Input
                                    placeholder='Nhập địa cửa hàng...'
                                    {...register('address', { required: true })}
                                    onFocus={e => e.target.select()}
                                />
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Link map</Text>
                                <Input
                                    placeholder='Nhập đường dẫn google map...'
                                    {...register('link_map', { required: true })}
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
                                        <Button onClick={remove} variant='ghost' colorScheme='red'>Xóa</Button>
                                    )
                                }
                            </HStack>
                            <HStack>
                                <Button onClick={onClose} variant='ghost' colorScheme='teal'>Hủy</Button>
                                <Button
                                    variant='solid'
                                    colorScheme='teal'
                                    type="submit"
                                    isLoading={formState.isSubmitting}
                                >
                                    {store ? 'Cập nhật' : 'Tạo mới'}
                                </Button>
                            </HStack>
                        </HStack>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}