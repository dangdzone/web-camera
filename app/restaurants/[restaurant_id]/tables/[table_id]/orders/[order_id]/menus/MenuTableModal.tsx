
import { Food, Order, Restaurant } from "@/types"
import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useColorMode, Image, Tag } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useDocumentData, useLiveQueryContext, useMonitor } from "@livequery/react"
import { Controller, useForm } from "react-hook-form"
import { BiCartAdd } from "react-icons/bi"

export type MenuTabbleModal = {
    food?: SmartQueryItem<Food>
    restaurant?: Restaurant
    order_id?: string
    onClose: () => void
}

export const MenuTabbleModal = ({ onClose, food, order_id, restaurant }: MenuTabbleModal) => {

    const { colorMode } = useColorMode()
    const $order = useDocumentData<Order>(`restaurants/${restaurant?.id}/orders/${order_id}`)
    const status = $order.item?.status

    const { handleSubmit, watch, control } = useForm({
        defaultValues: {
            id: food?.id,
            amount: 1,
            image: food?.images,
            name: food?.name,
            description: food?.description,
        }
    })

    const { transporter } = useLiveQueryContext()
    const onSubmit = useMonitor(async data => {
        await transporter.add(`restaurants/${restaurant?.id}/orders/${order_id}/order-items`, { ...data })
        onClose()
    })

    return (
        <Modal
            isOpen={true}
            size={'3xl'}
            onClose={onClose}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent bg={colorMode == "dark" ? "#242526" : "white"} mx='2'>
                <form onSubmit={handleSubmit(onSubmit.excute)}>
                    <ModalHeader p='3' borderBottom='1px solid' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}>
                        Đặt món
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
                    <ModalBody
                        px={{ base: '2', md: '4' }} py='6'
                        sx={{
                            "::-webkit-scrollbar": {
                                w: { base: 'none', md: '2' },
                            },
                            '&::-webkit-scrollbar-thumb': {
                                borderRadius: '10',
                                bg: '#c0c1c1',
                            },
                        }}
                    >
                        <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4'>
                            <Image
                                borderRadius='10px'
                                src={food?.images}
                                maxH='600px'
                                w='full'
                            />
                            <VStack w='full' spacing='5'>
                                <VStack w='full' align='flex-start' spacing='2'>
                                    <Text textTransform='uppercase'>{food?.name}</Text>
                                    <Text fontSize='14px' opacity='0.7'>{food?.description}</Text>
                                </VStack>
                                <HStack w='full'>
                                    <Tag colorScheme='red'>{food?.price.toLocaleString()} đ</Tag>
                                </HStack>
                                <HStack w='full' justifyContent='space-between'>
                                    <Text>Số lượng</Text>
                                    <Controller
                                        name="amount"
                                        control={control}
                                        render={({ field }) => (
                                            <HStack >
                                                <Button size='sm' isDisabled={field.value == 0} onClick={() => field.onChange(field.value - 1)} >-</Button>
                                                <Button variant='ghost' size='sm' borderRadius='full' colorScheme="teal">{field.value}</Button>
                                                <Button size='sm' onClick={() => field.onChange(field.value + 1)}>+</Button>
                                            </HStack>
                                        )}
                                    />
                                </HStack>
                                <HStack w='full' justifyContent='space-between'>
                                    <Text>Số tiền tạm tính</Text>
                                    <Tag colorScheme='orange'>{food && (watch('amount') * food?.price).toLocaleString()} đ</Tag>
                                </HStack>
                            </VStack>
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <Button mr={3} onClick={onClose} variant='ghost' colorScheme='blue'>Hủy</Button>
                        {
                            (status !== 'paid') && (status !== 'cancel') && (
                                <Button
                                    variant='solid'
                                    colorScheme='blue'
                                    type="submit"
                                    leftIcon={<BiCartAdd />}
                                    isDisabled={watch('amount') == 0}
                                    isLoading={onSubmit.loading}
                                >
                                    Đặt món ngay
                                </Button>
                            )
                        }
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal >
    )
}