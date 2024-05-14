import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Button, Image, useColorMode } from "@chakra-ui/react"
import { BiCartAdd } from "react-icons/bi"
import { FiMapPin } from "react-icons/fi"
import { MdOutlinePhoneInTalk } from "react-icons/md"
import { UserName } from "./UserName"
import Link from "next/link"

export const Topbar = () => {

    const { toggleColorMode } = useColorMode()
    const { fuser } = useFirebaseUserContext()

    return (
        <HStack w='full' h='60px' bg='cyan.700' color='white' justifyContent='space-between' position='sticky' top='0'>
            <HStack spacing='4'>
                {/* <Categogy /> */}
                <Image maxH='50px' borderRadius='10px' src="https://www.flygo-aviation.com/wp-content/uploads/2021/08/flygo-logo-trp-big.png" />
            </HStack>
            <HStack spacing='5'>
                <HStack _hover={{bg: 'blackAlpha.300'}} py='1' px='3' borderRadius='10px' cursor='pointer'>
                    <MdOutlinePhoneInTalk size='25px' />
                    <Stack spacing='0' fontSize='14px'>
                        <Text >Gọi mua hàng</Text>
                        <Text>1800.6759</Text>
                    </Stack>
                </HStack>
                <HStack _hover={{bg: 'blackAlpha.300'}} py='1' px='3' borderRadius='10px' cursor='pointer'>
                    <FiMapPin size='25px' />
                    <Stack spacing='0' fontSize='14px'>
                        <Text>Hệ thống cửa hàng</Text>
                        <Text>Xem ngay</Text>
                    </Stack>
                </HStack>
                <HStack>
                    {/* <IconButton aria-label="gio-hang" size='sm' icon={<BiCartAdd />} /> */}
                    <HStack _hover={{bg: 'blackAlpha.300'}} p='3' borderRadius='10px' cursor='pointer'>
                        <BiCartAdd size='25px' />
                        <Stack spacing='0' fontWeight='700'>
                            <Text>Giỏ hàng</Text>
                        </Stack>
                    </HStack>
                    {!fuser && (
                        <Link href={'/login'} style={{ width: '100%' }}>
                            <Button size='sm' >Đăng nhập</Button>
                        </Link>
                    )}
                    {fuser && <UserName />}
                </HStack>
            </HStack>
            {/* <Button onClick={toggleColorMode}>Sáng</Button> */}
        </HStack>
    )
}