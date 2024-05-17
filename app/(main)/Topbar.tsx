import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { HStack, Text } from "@chakra-ui/layout"
import { Button, Image, useColorMode } from "@chakra-ui/react"
import { BiCartAdd } from "react-icons/bi"
import { FiMapPin } from "react-icons/fi"
import { MdOutlinePhoneInTalk } from "react-icons/md"
import { UserName } from "./UserName"
import Link from "next/link"
import { FaShippingFast } from "react-icons/fa";

export const Topbar = () => {

    const { toggleColorMode } = useColorMode()
    const { fuser } = useFirebaseUserContext()

    return (
        <HStack w='full' h='60px' bg='blue.400' color='white' justifyContent='space-between' position='sticky' top='0'>
            <HStack spacing='4'>
                {/* <Categogy /> */}
                <Image maxH='50px' borderRadius='10px' src="https://www.flygo-aviation.com/wp-content/uploads/2021/08/flygo-logo-trp-big.png" />
            </HStack>
            <HStack spacing='5'>
                <HStack _hover={{ bg: 'blackAlpha.300' }} py='1' px='3' borderRadius='10px' cursor='pointer'>
                    <MdOutlinePhoneInTalk size='25px' />
                    <Text fontSize='14px' lineHeight='1.3'>Gọi mua hàng <br /> 1800.6759</Text>
                </HStack>
                <HStack _hover={{ bg: 'blackAlpha.300' }} py='1' px='3' borderRadius='10px' cursor='pointer'>
                    <FiMapPin size='25px' />
                    <Text fontSize='14px' lineHeight='1.3'>Hệ thống <br /> cửa hàng</Text>
                </HStack>
                <HStack _hover={{ bg: 'blackAlpha.300' }} py='1' px='3' borderRadius='10px' cursor='pointer'>
                    <FaShippingFast size='25px' />
                    <Text fontSize='14px' lineHeight='1.3'>Tra cứu <br /> đơn hàng</Text>
                </HStack>
                <HStack>
                    <HStack _hover={{ bg: 'blackAlpha.300' }} px='3' py='1' borderRadius='10px' cursor='pointer'>
                        <BiCartAdd size='25px' />
                        <Text whiteSpace='nowrap' lineHeight='1.3' fontSize='14px'>Giỏ <br /> hàng</Text>
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