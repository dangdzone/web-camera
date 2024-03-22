
import { RestaurantTable } from "@/types"
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
    useColorMode,
    useClipboard
} from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useLiveQueryContext } from "@livequery/react"
import Link from "next/link"
import { useForm } from "react-hook-form"

export type TableModal = {
    table?: SmartQueryItem<RestaurantTable>
    onClose: () => void
    restaurant_id: string
}

export const TableModal = ({ onClose, table, restaurant_id }: TableModal) => {

    const { colorMode } = useColorMode()
    const { register, handleSubmit, watch, } = useForm<RestaurantTable>({
        defaultValues: {
            name: table?.name
        }
    })

    const { transporter } = useLiveQueryContext()
    const { onCopy: onCopyAccNumber, hasCopied: copiedOne } = useClipboard(table?.id || '')

    async function onSubmit(data: RestaurantTable) {
        if (table) {
            table.__update(data)
        } else {
            await transporter.add(`restaurants/${restaurant_id}/tables`, data)

        }
        onClose()
    }

    function remove() {
        table?.__remove()
        onClose()
    }

    return (
        <Modal
            isOpen={true}
            size={'3xl'}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent bg={colorMode == "dark" ? "#242526" : "white"} mx='2'>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <ModalHeader p='3' borderBottom='1px solid' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}>
                        {table ? 'Cập nhật' : 'Tạo mới'}
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
                    <ModalBody px={{ base: '2', md: '4' }} py='6'>
                        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
                        <VStack w='full' spacing='5'>
                            <VStack w='full' spacing='4' align='flex-start'>
                                <Text fontWeight='400'>Tên bàn</Text>
                                <Input
                                    placeholder='Nhập tên bàn...'
                                    size='md'
                                    {...register('name', { 
                                        required: "Tên bàn không được để trống",
                                        minLength: { value: 5, message: "Số tiền phải có ít nhất 5 kí tự" },
                                        maxLength: { value: 50, message: "Số tiền không được vượt quá 50 kí tự" }
                                     })}
                                    onFocus={e => e.target.select()}
                                />
                            </VStack>
                            {
                                table && (
                                    <VStack w='full' align='flex-start'>
                                        <Text fontWeight='400'>ID bàn</Text>
                                        <HStack w='full'>
                                            <Input placeholder={table.id} isReadOnly  />
                                            <Button onClick={onCopyAccNumber}>{copiedOne ? 'Đã copy' : 'Copy'}</Button>
                                        </HStack>
                                    </VStack>
                                )
                            }
                        </VStack>
                    </ModalBody>

                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack w='full' justifyContent='space-between'>
                            <HStack>
                                {
                                    table && (
                                        <HStack>
                                            <Button onClick={remove} variant='outline' colorScheme='red'>Xóa</Button>
                                            <Link href={`https://go-menu.online/restaurants/${restaurant_id}/tables/${table.id}`} target="_blank">
                                                <Button colorScheme='red'>Mở</Button>
                                            </Link>
                                        </HStack>

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
                                    {table ? 'Cập nhật' : 'Tạo mới'}
                                </Button>
                            </HStack>
                        </HStack>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}