'use client'

import { Button, HStack, Text, VStack, useColorMode } from "@chakra-ui/react"
import { useDocumentData, useLiveQueryContext } from "@livequery/react"
import { Order, Restaurant, RestaurantTable } from "@/types"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { getRestaurantContext } from "@/hooks/useRestaurant"

export default function TablePage(props: {
    params: {
        restaurant_id: string,
        table_id: string
    }
}) {

    const { colorMode } = useColorMode()
    const r = getRestaurantContext()
    const $restaurant = useDocumentData<Restaurant>(`restaurants/${props.params.restaurant_id}`)
    const $tables = useDocumentData<RestaurantTable>(`restaurants/${props.params.restaurant_id}/tables/${props.params.table_id}`)
    const restaurant = $restaurant.item
    const table = $tables.item

    const { handleSubmit } = useForm()
    const router = useRouter()
    const { transporter } = useLiveQueryContext()

    const onSubmit: SubmitHandler<Partial<Order>> = async data => {
        const new_order = await transporter.add<Order, { data: { item: Order } }>(`restaurants/${props.params.restaurant_id}/orders`, {
            table_id: props.params.table_id,
            status: 'requested'
        })
        const order_id = new_order.data.item.id
        const ref = `/restaurants/${props.params.restaurant_id}/tables/${props.params.table_id}/orders/${order_id}`

        router.push(ref)
    }

    return (
        <VStack w='full' px={{ base: '4', md: '14' }} pt='14'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack
                    h='full'
                    w={{ base: 'full', md: '600px' }}
                    p={{ base: '4', md: '10' }}
                    bg={colorMode == 'dark' ? '#242526' : 'white'}
                    borderRadius='10px'
                    boxShadow='md'
                    spacing='10'
                    alignItems='center'
                >
                    {
                        r.status == 'active' ? (
                            <VStack w='full'>
                                <VStack w='full' spacing='5'>
                                    <Text
                                        fontWeight='600'
                                        fontSize='18px'
                                        opacity='0.8'
                                        textAlign='center'
                                    >
                                        Chào mừng bạn đến với nhà hàng Nét Huế - {restaurant?.name} !
                                    </Text>
                                    <Text fontSize='18px' opacity='0.8' textAlign='center'>Bạn có muốn vào bàn gọi món không ?</Text>
                                    <Text color='blue.500' fontWeight='600' fontSize='25px'>{table?.name}</Text>
                                </VStack>
                                <HStack w='full'>
                                    <Link href='/#' style={{ width: ' 100%' }}>
                                        <Button colorScheme="red" w='full' variant='outline'>Hủy</Button>
                                    </Link>
                                    <Button colorScheme="blue" w='full' type="submit">Có</Button>
                                </HStack>
                            </VStack>
                        ) : <Text>Nhà hàng đã đóng cửa !</Text>
                    }
                </VStack>
            </form>
        </VStack >
    )
}