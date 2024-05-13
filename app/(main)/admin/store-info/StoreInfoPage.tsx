import { Stack, Text } from "@chakra-ui/layout"
import { Image, Input } from "@chakra-ui/react"
import { StoreList } from "./StoreList"

export const StoreInfoPage = () => {
    return (
        <Stack w='full' spacing='7'>
            <Text fontWeight='700' fontSize='18px'>Thông tin cửa hàng</Text>
            <Stack w='full' flexDirection={{ base: 'column', md: 'row' }}>
                <Stack w={{ base: '100%', md: '60%' }} spacing='5'>
                    <Text>Tên cửa hàng</Text>
                    {/* <Input _placeholder='gofly' /> */}
                    <Text>Ảnh</Text>
                    <Image borderRadius='10px' p='5' border='1px' borderColor='blackAlpha.200' maxW='200px' src='https://www.flygo-aviation.com/wp-content/uploads/2021/08/flygo-logo-trp-big.png' />
                    <Text>Liện hệ</Text>
                    {/* <Input _placeholder='0814201002' /> */}
                </Stack>
                <Stack w={{ base: '100%', md: '40%' }}>
                    <StoreList />
                </Stack>
            </Stack>
        </Stack>
    )
}