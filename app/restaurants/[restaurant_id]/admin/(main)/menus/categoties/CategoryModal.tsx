
import { Category } from "@/types"
import { VStack, Text, HStack } from "@chakra-ui/layout"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter,
    Button,
    useColorMode
} from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import { useForm } from "react-hook-form"

export type CategoryModal = {
    category?: SmartQueryItem<Category>
    restaurant_id: string
    onClose: () => void
}

export const CategoryModal = ({ onClose, restaurant_id, category }: CategoryModal) => {

    const { colorMode } = useColorMode()

    const { register, handleSubmit, watch, } = useForm<Category>({
        defaultValues: {
            name: category?.name
        }
    })

    const { transporter } = useLiveQueryContext()

    async function onSubmit(data: Category) {
        if (category) {
            category.__update(data)
        } else {
            await transporter.add(`restaurants/${restaurant_id}/categories`, data)

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
            size={'3xl'}
            onClose={onClose}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent bg={colorMode == "dark" ? "#242526" : "white"} mx='2'>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <ModalHeader p='3' borderBottom='1px solid' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}>
                        {category ? 'Cập nhật' : 'Tạo mới'}
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
                    <ModalBody px={{ base: '2', md: '4' }} py='6' >
                        <VStack w='full' spacing='7'>
                            <VStack w='full' spacing='4' align='flex-start'>
                                <Text fontWeight='400'>Tên danh mục</Text>
                                <Input
                                    placeholder='Nhập tên danh mục...'
                                    size='md'
                                    {...register('name', { required: true })}
                                    onFocus={e => e.target.select()}
                                />
                            </VStack>
                        </VStack>
                    </ModalBody>

                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack w='full' justifyContent='space-between'>
                            <HStack>
                                {
                                    category && (
                                        <Button onClick={remove} variant='outline' colorScheme='red'>Xóa</Button>
                                    )
                                }
                            </HStack>
                            <HStack>
                                <Button onClick={onClose} variant='ghost' colorScheme='blue'>Hủy</Button>
                                <Button
                                    variant='solid'
                                    colorScheme='blue'
                                    type="submit"
                                >
                                    {category ? 'Cập nhật' : 'Tạo mới'}
                                </Button>
                            </HStack>
                        </HStack>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal >
    )
}