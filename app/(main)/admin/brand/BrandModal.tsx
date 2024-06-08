

import { FileUploader } from "@/components/common/FileUploader"
import { Brand } from "@/type"
import { Button, FormControl, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import { Controller, useForm } from "react-hook-form"

export type BrandModal = {
    brand?: SmartQueryItem<Brand>
    onClose: () => void
}

export const BrandModal = ({ onClose, brand }: BrandModal) => {

    const { transporter } = useLiveQueryContext()
    const { register, handleSubmit, control, formState: { errors, isSubmitting, isDirty } } = useForm<Brand>({
        defaultValues: {
            name: brand?.name,
            image: brand?.image
        }
    })
    async function onSubmit(data: Brand) {
        if (brand) {
            brand.__update(data)
        } else {
            await transporter.add(`brands`, data)
        }
        onClose()
    }

    function remove() {
        brand?.__remove()
        onClose()
    }

    return (
        <Modal
            isOpen={true}
            size={'2xl'}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent mx='2' borderRadius='15px'>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <ModalHeader p='3'>
                        {brand ? 'Cập nhật thương hiệu' : 'Tạo thương hiệu mới'}
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
                    <ModalBody px={{ base: '2', md: '4' }} py='6'>
                        <Stack w='full' spacing='7'>
                            <Stack w='full' spacing='3'>
                                <Text>Tên thương hiệu</Text>
                                <Input
                                    placeholder='Nhập tên thương hiệu...'
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
                        </Stack>
                    </ModalBody>
                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack w='full' justifyContent='space-between'>
                            <HStack>
                                {
                                    brand && (
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
                                            {brand ? 'Cập nhật' : 'Tạo mới'}
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