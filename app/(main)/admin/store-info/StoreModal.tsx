import { FileUploader } from "@/components/common/FileUploader"
import { Store } from "@/type"
import { Button, FormControl, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { MdAdd, MdClose } from "react-icons/md"

export type StoreModal = {
    store?: SmartQueryItem<Store>
    onClose: () => void
}

export const StoreModal = ({ onClose, store }: StoreModal) => {

    const { transporter } = useLiveQueryContext()
    const { register, handleSubmit, watch, control, formState, reset } = useForm<Store>({
        defaultValues: {
            name: store?.name,
            image: store?.image,
            store_list: store?.store_list
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'store_list',
    });

    async function onSubmit(data: Store) {
        if (store) {
            store.__update(data)
        } else {
            await transporter.add(`categories`, data)
        }
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
                        Cập nhật thông tin
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
                                <Text fontWeight='400'>Ảnh</Text>
                                <FormControl>
                                    <Controller
                                        name='image'
                                        control={control}
                                        render={FileUploader}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Hệ thống cửa hàng</Text>
                                {
                                    fields.map((field, index) => (
                                        <Stack w='full' key={field.id} flexDirection='row'>
                                            <Input
                                                {...register(
                                                    `store_list.${index}.name` as const
                                                )}
                                                placeholder='Nhập tên cửa hàng...'
                                            />
                                            <Textarea
                                                {...register(
                                                    `store_list.${index}.address` as const
                                                )}
                                                placeholder='Nhập địa chỉ cửa hàng...'
                                            />
                                            <IconButton aria-label="close" onClick={() => remove(index)} icon={<MdClose />} />
                                        </Stack>
                                    ))
                                }
                                <Button leftIcon={<MdAdd />} onClick={() => append({ name: '', address: '' })}>Thêm cửa hàng</Button>
                            </Stack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack w='full' justifyContent='space-between'>
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