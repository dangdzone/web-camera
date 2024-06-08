import { FileUploader } from "@/components/common/FileUploader"
import { Category } from "@/type"
import { Button, FormControl, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import { Controller, useForm } from "react-hook-form"

export type CategoryModal = {
    category?: SmartQueryItem<Category>
    onClose: () => void
}

export const CategoryModal = ({ onClose, category }: CategoryModal) => {

    const { transporter } = useLiveQueryContext()
    const { register, handleSubmit, watch, control, formState: { errors, isSubmitting, isDirty } } = useForm<Category>({
        defaultValues: {
            name: category?.name,
            href: category?.href,
            image: category?.image
        }
    })
    async function onSubmit(data: Category) {
        if (category) {
            category.__update(data)
        } else {
            await transporter.add(`categories`, data)
        }
        onClose()
    }

    function remove() {
        category?.__remove()
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
                        {category ? 'Cập nhật danh mục' : 'Tạo danh mục mới'}
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
                    <ModalBody px={{ base: '2', md: '4' }} py='6'>
                        <Stack w='full' spacing='7'>
                            <Stack w='full' spacing='3'>
                                <Text>Tên danh mục</Text>
                                <Input
                                    placeholder='Nhập tên danh mục...'
                                    {...register('name', { required: true })}
                                    onFocus={e => e.target.select()}
                                />
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Đường dẫn</Text>
                                <Input
                                    placeholder='Nhập đường dẫn...'
                                    {...register('href', { required: true })}
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
                                    category && (
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
                                            {category ? 'Cập nhật' : 'Tạo mới'}
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