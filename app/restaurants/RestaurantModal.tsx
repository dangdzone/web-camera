
import { AlertModal } from "@/components/common/AlertModal"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
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
    useColorMode,
    useToast,
    FormErrorMessage,
    Alert,
    AlertIcon
} from "@chakra-ui/react"
import { useLiveQueryContext } from "@livequery/react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

export type RestaurantModal = {
    onClose: () => void
    alert_check: () => void
}

export const RestaurantModal = ({ onClose, alert_check }: RestaurantModal) => {

    const { colorMode } = useColorMode()
    const toast = useToast()

    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, control } = useForm<Restaurant>()
    const { transporter } = useLiveQueryContext()
    const { fuser, reload_permissions } = useFirebaseUserContext()

    async function onSubmit(data: Restaurant) {
        await transporter.add(`owners/${fuser?.uid}/restaurants`, data)
        await reload_permissions()
        alert_check()
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
                        Tạo chi nhánh
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
                    <ModalBody px={{ base: '2', md: '4' }} py='6'>
                        <VStack w='full' spacing='5'>
                            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
                            <VStack w='full' spacing='5'>
                                <VStack w='full' spacing='4' align='flex-start'>
                                    <Text fontWeight='400'>Tên chi nhánh</Text>
                                    <Input
                                        placeholder='Nhập tên nhà hàng...'
                                        size='md'
                                        {...register('name', {
                                            required: "Tên nhà hàng không được để trống",
                                            minLength: { value: 7, message: "Tên nhà hàng phải có ít nhất 7 kí tự" },
                                            maxLength: { value: 50, message: "Tên nhà hàng không được quá 50 kí tự" },
                                            pattern: {
                                                value: /^(?=.*[a-zA-Z])[a-zA-Z0-9\sÀ-ỹ!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
                                                message: "Tên nhà hàng phải chứa cả chữ và không chứa kí tự đặc biệt"
                                            },
                                        })}
                                        onFocus={e => e.target.select()}
                                    />
                                    {
                                        errors.name && (
                                            <Alert status="error" p='2' borderRadius='10px'>
                                                <AlertIcon />
                                                {errors.name.message}
                                            </Alert>
                                        )
                                    }
                                </VStack>
                                <VStack w='full' spacing='4' align='flex-start'>
                                    <Text fontWeight='400'>Số điện thoại</Text>
                                    <Input
                                        placeholder='Nhập số điện thoại...'
                                        size='md'
                                        type="tel"
                                        {...register('phone', {
                                            required: "Số điện thoại không được để trống",
                                            pattern: {
                                                value: /^0[0-9]{9,14}$/,
                                                message: "Số điện thoại phải chứa số và bắt đầu bằng số 0"
                                            },
                                            minLength: { value: 10, message: "Số điện thoại phải có ít nhất 10 số và bắt đầu bằng số 0" },
                                            maxLength: { value: 15, message: "Số điện thoại không được quá 15 số và bắt đầu bằng số 0" }
                                        })}
                                        onFocus={e => e.target.select()}
                                    />
                                    {
                                        errors.phone && (
                                            <Alert status="error" p='2' borderRadius='10px'>
                                                <AlertIcon />
                                                {errors.phone.message}
                                            </Alert>
                                        )
                                    }
                                </VStack>
                                <VStack w='full' spacing='4'>
                                    <Text w='full' fontWeight='400'>Địa chỉ</Text>
                                    <Input
                                        placeholder='Nhập địa chỉ...'
                                        size='md'
                                        {...register('address', {
                                            required: 'Địa chỉ nhà hàng không được bỏ trống',
                                            minLength: { value: 15, message: "Tên nhà hàng phải có ít nhất 15 kí tự" },
                                            pattern: {
                                                value: /^(?=.*[a-zA-Z])[a-zA-Z0-9\sÀ-ỹ!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/,
                                                message: "Địa chỉ nhà hàng phải chứa cả chữ"
                                            },
                                        })}
                                        onFocus={e => e.target.select()}
                                    />
                                    {
                                        errors.address && (
                                            <Alert status="error" p='2' borderRadius='10px'>
                                                <AlertIcon />
                                                {errors.address.message}
                                            </Alert>
                                        )
                                    }
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
                            isLoading={isSubmitting}
                        >
                            Thêm mới
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}