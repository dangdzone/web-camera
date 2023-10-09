
import { Restaurant } from "@/types"
import { VStack, HStack, Text } from "@chakra-ui/layout"
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
import { useLiveQueryContext } from "@livequery/react"
import { useForm } from "react-hook-form"

export type RestaurantModal = {
    onClose: () => void
}

export const RestaurantModal = ({ onClose }: RestaurantModal) => {

    const { colorMode } = useColorMode()

    const { register, handleSubmit, watch } = useForm<Restaurant>()
    const { transporter } = useLiveQueryContext()
    // const { fuser, reload_permissions } = useFirebaseUserContext()

    async function onSubmit(data: Restaurant) {
        console.log('data', data)
        await transporter.add(`restaurants`, data)
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader p='3' borderBottom='1px solid' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}>
                        Thêm chi nhánh
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
                    <ModalBody px={{ base: '2', md: '4' }} py='6'>
                        <VStack w='full' spacing='5'>
                            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
                            <VStack w='full' spacing='5'>
                                <VStack w='full' spacing='4' align='flex-start'>
                                    <Text fontWeight='400'>Tên chi nhánh</Text>
                                    <Input
                                        placeholder='Nhập tên chi nhánh...'
                                        size='md'
                                        {...register('name', { required: true })}
                                        onFocus={e => e.target.select()}
                                    />
                                </VStack>
                                <VStack w='full' spacing='4' align='flex-start'>
                                    <Text fontWeight='400'>Số điện thoại</Text>
                                    <Input
                                        placeholder='Nhập số điện thoại...'
                                        size='md'
                                        {...register('phone', { valueAsNumber: true })}
                                        onFocus={e => e.target.select()}
                                    />
                                </VStack>
                                <VStack w='full' spacing='4'>
                                    <HStack w='full'>
                                        <Text fontWeight='400'>Địa chỉ</Text>
                                    </HStack>
                                    <HStack w='full'>
                                        <Input
                                            placeholder='Nhập địa chỉ...'
                                            size='md'
                                            {...register('address', { required: true })}
                                            onFocus={e => e.target.select()}
                                        />
                                    </HStack>
                                </VStack>

                            </VStack>
                        </VStack>
                    </ModalBody>

                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <Button mr={3} onClick={onClose} variant='ghost' colorScheme='blue'>Hủy</Button>
                        <Button
                            variant='solid'
                            colorScheme='blue'
                            type="submit"
                        >
                            Thêm mới
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}