import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Button, Image, Input, useColorMode } from "@chakra-ui/react"
import { BiCartAdd } from "react-icons/bi"
import { FiMapPin } from "react-icons/fi"
import { MdOutlinePhoneInTalk } from "react-icons/md"

export const Topbar = () => {
    const { toggleColorMode } = useColorMode()
    return (
        <HStack w='full' h='65px' bg='#1D4A81' color='white' justifyContent='space-between' px='4'>
            <HStack>
                <Image maxH='50px' borderRadius='10px' src="https://i.imgur.com/2BgMXlp.jpeg" />
                {/* <Input placeholder="Tìm kiếm..." /> */}
            </HStack>
            <HStack spacing='5'>
                <HStack>
                    <MdOutlinePhoneInTalk size='25px' />
                    <Stack spacing='0' fontSize='14px'>
                        <Text>Gọi mua hàng</Text>
                        <Text fontWeight='700'>0814.200.200</Text>
                    </Stack>
                </HStack>
                <HStack>
                    <FiMapPin size='25px' />
                    <Stack spacing='0' fontSize='14px'>
                        <Text>Hệ thống cửa hàng</Text>
                    </Stack>
                </HStack>
                <Button>Đăng nhập</Button>
                <Button leftIcon={<BiCartAdd />} >Giỏ hàng</Button>
            </HStack>
            {/* <Button onClick={toggleColorMode}>Sáng</Button> */}
        </HStack>
    )
}