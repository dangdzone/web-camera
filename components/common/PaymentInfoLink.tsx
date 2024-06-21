import { HStack, Text, VStack } from "@chakra-ui/layout"
import Link from "next/link"

export type PaymentInfoLink = {
    list: Array<{ name: string, href: string, active: boolean }>
}

export const PaymentInfoLink = ({ list }: PaymentInfoLink) => {
    return (
        <HStack w='full'>
            {
                list.map((item, i) => (
                    <Link href={item.href} key={i} style={{ width: '100%' }}>
                        <VStack
                            w='full'
                            p='3'
                            bg={item.active == true ? 'red.50' : 'white'}
                            border='1px'
                            borderColor={item.active ? 'red.300' : 'blackAlpha.200'}
                            borderRadius='10px'
                            color={item.active ? 'red.500' : 'blackAlpha.700'}
                        >
                            <Text textTransform='uppercase' fontWeight='600'>{item.name}</Text>
                        </VStack>
                    </Link>
                )
                )
            }
        </HStack>
    )
}