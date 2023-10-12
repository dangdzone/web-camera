
import { OrderItem } from "@/types"
import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { Image, Tag } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"

export type OrderTableItem = {
    order_item: SmartQueryItem<OrderItem>
}

export const OrderTableItem = (props: OrderTableItem) => {

    return (
        <HStack py='2' spacing='4' w='full'>
            <Image alignSelf='flex-start' boxSize='80px' borderRadius='5px' src={props.order_item.image} />
            <SimpleGrid w='full' spacing='2' columns={[1, 1, 2, 2]}>
                <VStack w='full' align='flex-start' spacing='2'>
                    <Text textTransform='uppercase'>{props.order_item.name}</Text>
                    <Tag colorScheme='red' size='sm'>{props.order_item.price.toLocaleString()} đ</Tag>
                </VStack>
                <VStack w='full' align='flex-start'>
                    <HStack>
                        <Text>SL: {props.order_item.amount}</Text>
                    </HStack>
                    <HStack>
                        <Text opacity='0.7'>Thành tiền</Text>
                        <Tag colorScheme='orange' size='sm'>{(props.order_item.price*props.order_item.amount).toLocaleString()} đ</Tag>
                    </HStack>
                </VStack>
            </SimpleGrid>
        </HStack>
    )
}