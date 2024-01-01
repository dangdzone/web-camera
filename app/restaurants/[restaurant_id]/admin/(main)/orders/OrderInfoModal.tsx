
import { OrderItemStatusMap } from "@/text"
import { Food, OrderItem } from "@/types"
import { HStack, SimpleGrid, Text, VStack, Wrap } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useColorMode, Image, Tag } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData } from "@livequery/react"
import { Controller, useForm } from "react-hook-form"

export type OrderInfoModal = {
    onClose: () => void
    order_item?: SmartQueryItem<OrderItem>
    restaurant_id?: string,
    order_id?: string
}

export const OrderInfoModal = ({ onClose, order_item, restaurant_id, order_id }: OrderInfoModal) => {

    const { colorMode } = useColorMode()
    const $foods = useCollectionData<Food>(`restaurants/${restaurant_id}/foods`)
    const foods = $foods.items.filter(a => a.id == order_item?.food_id)
    // const $order_items = useCollectionData<OrderItem>(`restaurants/${restaurant_id}/${order_id}/order-items`)
    // console.log({ $order_items })

    const { handleSubmit, watch, control, formState } = useForm<OrderItem>({
        defaultValues: {
            id: order_item?.id,
            status: order_item?.status,
            ...order_item
        }
    })

    async function onSubmit(data: OrderItem) {
        order_item?.__update({ ...data })
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
                        Thông tin món
                    </ModalHeader>
                    <ModalCloseButton borderRadius='full' mt='1' />
                    <ModalBody px={{ base: '2', md: '4' }} py='6'>
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
                                <HStack w='full'>
                                    <Text>Số lượng:</Text>
                                    <Text>{order_item?.amount}</Text>
                                </HStack>
                                <HStack w='full' justifyContent='space-between'>
                                    <Text>Số tiền tạm tính</Text>
                                    <Tag colorScheme='orange'>{order_item && (order_item?.amount * order_item?.price).toLocaleString()} đ</Tag>
                                </HStack>
                                <HStack w='full' justifyContent='space-between'>
                                    <Text>Trạng thái món</Text>
                                    <Controller
                                        name={'status'}
                                        control={control}
                                        render={({ field }) => (
                                            <Wrap spacing={2}>
                                                {
                                                    Object.entries(OrderItemStatusMap).map(([name_id, { name, color }]) => {
                                                        const selected = field.value == name_id
                                                        return (
                                                            <Button
                                                                key={name_id}
                                                                size='sm'
                                                                variant={selected ? 'solid' : 'outline'}
                                                                colorScheme={color}
                                                                onClick={() => field.onChange(name_id)}
                                                            >
                                                                {name}
                                                            </Button>
                                                        )
                                                    }
                                                    )
                                                }
                                            </Wrap>
                                        )} />
                                </HStack>
                                {

                                }
                            </VStack>
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter p={{ base: '2', md: '4' }}>
                        <HStack w='full' justifyContent='flex-end'>
                            <Button onClick={onClose} variant='ghost' colorScheme='blue'>Thoát</Button>
                            <Button
                                variant='solid'
                                colorScheme='blue'
                                type="submit"
                                isLoading={formState.isSubmitting}
                            >
                                Cập nhật
                            </Button>
                        </HStack>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal >
    )
}