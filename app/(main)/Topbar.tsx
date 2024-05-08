import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Button, IconButton, Image, Input, useColorMode } from "@chakra-ui/react"
import { BiCartAdd } from "react-icons/bi"
import { FiMapPin } from "react-icons/fi"
import { MdMenu, MdOutlinePhoneInTalk } from "react-icons/md"
import { Categogy } from "./Category"

export const Topbar = () => {
    const { toggleColorMode } = useColorMode()
    return (
        <HStack w='full' h='60px' bg='cyan.800' color='white' justifyContent='space-between' position='sticky' top='0'>
            <HStack spacing='4'>
                <Categogy />
                <Image maxH='50px' borderRadius='10px' src="https://www.flygo-aviation.com/wp-content/uploads/2021/08/flygo-logo-trp-big.png" />
            </HStack>
            <HStack spacing='5'>
                <HStack>
                    <MdOutlinePhoneInTalk size='25px' />
                    <Text>Gọi mua hàng</Text>
                </HStack>
                <HStack>
                    <FiMapPin size='25px' />
                    <Stack spacing='0' fontSize='14px'>
                        <Text>Hệ thống cửa hàng</Text>
                    </Stack>
                </HStack>
                <Button size='sm'>Đăng nhập</Button>
                <Button size='sm' leftIcon={<BiCartAdd />} >Giỏ hàng</Button>
            </HStack>
            {/* <Button onClick={toggleColorMode}>Sáng</Button> */}
        </HStack>
    )
}