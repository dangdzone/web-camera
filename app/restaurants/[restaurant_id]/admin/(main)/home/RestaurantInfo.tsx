import { theme } from "@/theme"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Input, useColorMode } from "@chakra-ui/react"


export const RestaurantInfo = () => {

    const { colorMode } = useColorMode()

    return (
        <VStack
            w='full'
            bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
            borderRadius='5px'
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : 'gray.200'}
            spacing='5'
        >
            <HStack w='full' p='4' borderBottom='1px' borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}>
                <Text fontWeight='600'>Thông tin cửa hàng</Text>
            </HStack>
            <VStack w='full' px='4' pb='5' spacing='4'>
                <VStack w='full' align='flex-start'>
                    <Text>Tên chi nhánh</Text>
                    <Input value='Cơ sở 1' />
                </VStack>
                <VStack w='full' align='flex-start'>
                    <Text>Địa chỉ</Text>
                    <Input value='Số 5 Hà Đông, Hà Nội' />
                </VStack>
                <VStack w='full' align='flex-start'>
                    <Text>Số điện thoại</Text>
                    <Input value='0814201002' />
                </VStack>
            </VStack>
        </VStack>
    )
}