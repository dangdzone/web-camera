
import { Resolution } from "@/type"
import { Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import { useForm } from "react-hook-form"

export type ResolutionModal = {
    resolution?: SmartQueryItem<Resolution>,
    onClose: () => void
}

export const ResolutionModal = ({ resolution, onClose }: ResolutionModal) => {

    const { transporter } = useLiveQueryContext()
    const { register, handleSubmit, watch, control, formState } = useForm<Resolution>({
        defaultValues: {
            name: resolution?.name,
            size: resolution?.size,
            note: resolution?.note
        }
    })
    async function onSubmit(data: Resolution) {
        if (resolution) {
            resolution.__update(data)
        } else {
            await transporter.add(`resolutions`, data)
        }
        onClose()
    }

    function remove() {
        resolution?.__remove()
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
                        {resolution ? 'Cập nhật độ phân giải' : 'Tạo độ phân giải mới'}
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
                    <ModalBody px={{ base: '2', md: '4' }} py='6'>
                        <Stack w='full' spacing='7'>
                            <Stack w='full' spacing='3'>
                                <Text>Tên độ phân giải</Text>
                                <Input
                                    placeholder='Nhập tên độ phân giải...'
                                    {...register('name', { required: true })}
                                    onFocus={e => e.target.select()}
                                />
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Kích thước</Text>
                                <Input
                                    placeholder='Nhập kích thước...'
                                    {...register('size', { required: true })}
                                    onFocus={e => e.target.select()}
                                />
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Ghi chú</Text>
                                <Textarea
                                    placeholder='Nhập ghi chú...'
                                    {...register('note')}
                                    onFocus={e => e.target.select()}
                                />
                            </Stack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack w='full' justifyContent='space-between'>
                            <HStack>
                                {
                                    resolution && (
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
                                    {resolution ? 'Cập nhật' : 'Tạo mới'}
                                </Button>
                            </HStack>
                        </HStack>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}