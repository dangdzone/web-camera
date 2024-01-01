
import { Food, Order, OrderItem, RestaurantTable } from "@/types"
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, SimpleGrid, Spinner, Stack, Tag, Text, VStack, Wrap, useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData, useDocumentData } from "@livequery/react"
import { OrderItemDetail } from "./OrderItemDetail"
import { useState } from "react"
import { OrderInfoModal } from "./OrderInfoModal"
import { Controller, useForm } from "react-hook-form"
import { OrderStatusMap } from "@/text"
import dayjs from "dayjs"

export type OrderModal = {
    order?: SmartQueryItem<Order>
    onClose: () => void
}

export const OrderModal = (props: OrderModal) => {

    const { colorMode } = useColorMode()
    const [order_update, set_order_update] = useState<null | undefined | SmartQueryItem<OrderItem>>(null)
    const $table = useDocumentData<RestaurantTable>(`restaurants/${props.order?.restaurant_id}/tables/${props.order?.table_id}`)
    const $order_items = useCollectionData<OrderItem>(`restaurants/${props.order?.restaurant_id}/orders/${props.order?.id}/order-items`)

    const order_items = $order_items.items

    const { handleSubmit, watch, control, formState, reset } = useForm<Order>({
        defaultValues: {
            id: props.order?.id,
            status: props.order?.status,
            ...props.order
        }
    })

    async function onSubmit(data: Order) {
        props.order?.__update({ ...data })
        reset(data)
    }

    return (
        <Drawer onClose={props.onClose} isOpen={true} placement='left' size='lg'>
            {
                order_update !== null && (
                    <OrderInfoModal
                        onClose={() => set_order_update(null)}
                        order_item={order_update}
                        restaurant_id={props.order?.restaurant_id}
                        order_id={props.order?.id as any}
                    />
                )
            }
            <DrawerOverlay />
            <DrawerContent bg={colorMode == "dark" ? "#242526" : "white"} maxW='4xl'>
                <DrawerHeader borderBottomWidth='1px'>Đơn hàng</DrawerHeader>
                <DrawerCloseButton mt='1.5' />
                <DrawerBody
                    py='4' px={{ base: '0', md: '4' }}
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack w='full' spacing='5'>
                            <HStack
                                w='full'
                                p='4'
                                borderBottom='1px'
                                borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
                                justifyContent='space-between'
                            >
                                <Text fontWeight='600'>{props.order?.customer_name}</Text>
                                {
                                    $table.item && (
                                        <Tag colorScheme='red'>{$table.item?.name}</Tag>
                                    )
                                }
                            </HStack>
                            <VStack w='full' divider={<Divider />} py='4'>
                                {
                                    order_items.map(order_item => (
                                        <OrderItemDetail
                                            key={order_item.id}
                                            order_item={order_item}
                                            onClick={() => set_order_update(order_item)}
                                        />
                                    ))
                                }
                                {
                                    $order_items.loading && <Spinner color="teal.500" size='lg' />
                                }
                                {
                                    $order_items.empty && <Text fontSize='18px' color="teal.500">Chưa có món...</Text>
                                }
                            </VStack>
                            <VStack w='full' p='4' borderTop='1px' borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'} spacing='7'>
                                <HStack w='full' justifyContent='space-between' >
                                    <Text as='b'>Tổng tiền:</Text>
                                    <Text as='b' fontSize='20px'>{props.order?.total.toLocaleString()} đ</Text>
                                </HStack>
                                <HStack w='full' justifyContent='space-between'>
                                    <Text as='b'>Thời gian tạo đơn:</Text>
                                    <Text as='b' fontSize='20px'>{dayjs(props.order?.created_at).format('HH:mm - DD/MM/YYYY')}</Text>
                                </HStack>
                                <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='5'>
                                    <Text as='b'>Trạng thái đơn hàng</Text>
                                    <Controller
                                        name={'status'}
                                        control={control}
                                        render={({ field }) => (
                                            <Wrap spacing={2}>
                                                {
                                                    Object.entries(OrderStatusMap).map(([name_id, { name, color }]) => {
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
                                </SimpleGrid>
                                <HStack w='full'>
                                    {
                                        formState.isDirty && (
                                            <Button
                                                colorScheme='red'
                                                w='full'
                                                onClick={() => reset()}
                                                variant={'outline'}
                                            >
                                                Hủy
                                            </Button>
                                        )
                                    }
                                    {
                                        formState.isDirty && (
                                            <Button
                                                type="submit"
                                                colorScheme='teal'
                                                w='full'
                                                isLoading={formState.isSubmitting}
                                            >
                                                Xác nhận trạng thái
                                            </Button>
                                        )
                                    }
                                </HStack>
                                <Button
                                    colorScheme='gray'
                                    w='full'
                                    onClick={props.onClose}
                                >
                                    Thoát
                                </Button>
                            </VStack>
                        </VStack>
                    </form>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}