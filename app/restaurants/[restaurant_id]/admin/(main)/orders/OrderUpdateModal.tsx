
import { Food, OrderItem } from "@/types"
import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useColorMode, Image, Tag } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData } from "@livequery/react"
import { Controller, useForm } from "react-hook-form"
import { BiCartAdd } from "react-icons/bi"

export type OrderUpdateModal = {
    onClose: () => void
    order_item?: SmartQueryItem<OrderItem>
    restaurant_id?: string
}

export const OrderUpdateModal = ({ onClose, order_item, restaurant_id }: OrderUpdateModal) => {

    const { colorMode } = useColorMode()
    const $foods = useCollectionData<Food>(`restaurants/${restaurant_id}/foods`)
    const foods = $foods.items.filter(a => a.id == order_item?.food_id)

    console.log({ foods })
    console.log('food_id', order_item?.food_id)

    const { handleSubmit, watch, control, formState } = useForm<OrderItem>({
        defaultValues: {
            id: order_item?.id,
            amount: order_item?.amount,
            food_id: order_item?.food_id,
            ...order_item
        }
    })

    async function onSubmit(data: OrderItem) {
        console.log({ data })
        // await transporter.add(`restaurants/${restaurant?.id}/orders/${order_id}/order-items`, { ...data })
        order_item?.__update({ ...data, price: order_item.price })
        onClose()
    }

    function remove() {
        order_item?.__remove()
        onClose()
    }


    console.log('food_id', order_item?.food_id)

    return (
        <Modal
            isOpen={true}
            size={'3xl'}
            onClose={onClose}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent bg={colorMode == "dark" ? "#242526" : "white"} mx='2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader p='3' borderBottom='1px solid' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}>
                        Cập nhật món
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
                                src={order_item?.image}
                                maxH='600px'
                                w='full'
                            />
                            <VStack w='full' spacing='5'>
                                <VStack w='full' align='flex-start' spacing='2'>
                                    <Text textTransform='uppercase'>{order_item?.name}</Text>
                                    <Text fontSize='14px' opacity='0.7'>{order_item?.description}</Text>
                                </VStack>
                                <HStack w='full'>
                                    <Tag colorScheme='red'>{order_item?.price.toLocaleString()} đ</Tag>
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
                                    <Tag colorScheme='orange'>{order_item && (watch('amount') * order_item?.price).toLocaleString()} đ</Tag>
                                </HStack>
                            </VStack>
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack w='full' justifyContent='space-between'>
                            {
                                order_item && (
                                    <Button mr={3} colorScheme='red' onClick={remove}>Xóa</Button>
                                )
                            }
                            <HStack>
                                <Button mr={3} onClick={onClose} variant='ghost' colorScheme='blue'>Hủy</Button>
                                <Button
                                    variant='solid'
                                    colorScheme='blue'
                                    type="submit"
                                    leftIcon={<BiCartAdd />}
                                    isDisabled={watch('amount') == 0}
                                    isLoading={formState.isSubmitting}
                                >
                                    Cập nhật
                                </Button>
                            </HStack>
                        </HStack>

                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal >
    )
}