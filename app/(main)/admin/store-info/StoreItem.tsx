import { HStack, Stack, Text } from "@chakra-ui/layout"
import { FiMapPin } from "react-icons/fi"


export const StoreItem = () => {
    return (
        <Stack
            w='full'
            p='3'
            spacing='0'
            borderRadius='10px'
            border='1px'
            borderColor='blackAlpha.300'
            _hover={{
                bg: 'blackAlpha.100'
            }}
        >
            <Text fontWeight='700'>Cơ sở 3</Text>
            <HStack>
                <FiMapPin />
                <Text fontSize='14px'>Số 30 Nguyễn Trãi, Thanh Xuân, Hà Nội</Text>
            </HStack>
        </Stack>
    )
}