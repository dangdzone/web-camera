'use client'

import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Order } from "@/type"
import { Box, Divider, HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { Button, Image, Tag, useClipboard } from "@chakra-ui/react"
import { useCollectionData } from "@livequery/react"
import { FaCheck, FaRegCopy } from "react-icons/fa6"

export default function MemberPage() {

    const { fuser } = useFirebaseUserContext()
    const { onCopy, hasCopied } = useClipboard(fuser?.uid as any)
    const { items: $orders} = useCollectionData<Order>(fuser && `customers/${fuser.uid}/orders`)
    const accumulateMoney = $orders.filter(a => a.status == 'paid').reduce((total, item) => total + item.pay, 0)

    const statisticalOrder = [
        { name: 'Đơn hàng', value: $orders.length, unit: '' },
        { name: 'Tổng tiền tích lũy', value: accumulateMoney, unit: 'đ' },
    ]

    return fuser && (
        <Stack w='full' spacing='7'>
            <VStack w='full'>
                <Image border='2px' borderColor='#8E00FF' sizes='90px' borderRadius='full' src={fuser?.photoURL || ''} />
                <VStack >
                    <Text fontSize='18px' fontWeight='700' color='#8D00FF'>{fuser?.displayName}</Text>
                    <Text>Email: {fuser?.email}</Text>
                    <VStack>
                        {/* <HStack>
                            <Text color='blackAlpha.700' fontSize='14px'>ID: {fuser?.uid}</Text>
                            <Button size='xs' variant='outline' onClick={onCopy} colorScheme='messenger'>
                                {hasCopied ? <FaCheck /> : <FaRegCopy />}
                            </Button>
                        </HStack> */}
                        <Box><Tag size='sm' colorScheme='red' variant='outline'>Thành viên</Tag></Box>
                    </VStack>
                </VStack>
            </VStack>
            <HStack w='full' p='5' borderRadius='10px' border='1px' borderColor='blackAlpha.100' divider={<Divider height={'50px'} orientation='vertical' />}>
                {
                    statisticalOrder.map((item, i) => (
                        <VStack w='full' key={i}>
                            <Text fontSize='25px' fontWeight='800'>{item.value?.toLocaleString()}{item.unit}</Text>
                            <Text>{item.name}</Text>
                        </VStack>
                    ))
                }
            </HStack>
        </Stack>
    )
}