import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Input, Textarea } from "@chakra-ui/react"


export const ReceiveInfo = () => {
    return (
        <Stack w='full' p='4' borderRadius='10px' spacing='7' border='1px' borderColor='blackAlpha.200'>
            <HStack w='full'>
                <Stack w='full' spacing='0'>
                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>TÊN NGƯỜI NHẬN</Text>
                    <Input variant='flushed' />
                </Stack>
                <Stack w='full' spacing='0'>
                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>SĐT NGƯỜI NHẬN</Text>
                    <Input variant='flushed' />
                </Stack>
            </HStack>
            <HStack w='full'>
                <Stack w='full' spacing='0'>
                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>TỈNH / THÀNH PHỐ</Text>
                    <Input variant='flushed' />
                </Stack>
                <Stack w='full' spacing='0'>
                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>QUẬN / HUYỆN</Text>
                    <Input variant='flushed' />
                </Stack>
            </HStack>
            <HStack w='full'>
                <Stack w='full' spacing='0'>
                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>PHƯỜNG / XÃ</Text>
                    <Input variant='flushed' />
                </Stack>
                <Stack w='full' spacing='0'>
                    <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'>SỐ NHÀ / TÊN ĐƯỜNG</Text>
                    <Input variant='flushed' />
                </Stack>
            </HStack>
            <Stack w='full' spacing='0'>
                <Text fontSize='12px' fontWeight='700' color='blackAlpha.600'> GHI CHÚ KHÁC (NẾU CÓ)</Text>
                <Input variant='flushed' />
            </Stack>
        </Stack>
    )
}