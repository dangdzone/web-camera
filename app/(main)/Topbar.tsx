import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Badge, HStack, Text } from "@chakra-ui/layout"
import { Button, Image, useColorMode } from "@chakra-ui/react"
import { BiCartAdd } from "react-icons/bi"
import { FiMapPin } from "react-icons/fi"
import { MdOutlinePhoneInTalk } from "react-icons/md"
import { UserName } from "./UserName"
import Link from "next/link"
import { FaShippingFast } from "react-icons/fa";
import { useCollectionData } from "@livequery/react"
import { Cart } from "@/type"
import { MenuMobile } from "../MenuMobile"

export const Topbar = () => {

    const { toggleColorMode } = useColorMode()
    const { fuser } = useFirebaseUserContext()
    const { items: $carts } = useCollectionData<Cart>(fuser && `customers/${fuser?.uid}/carts`)
    const cart_amount = $carts.reduce((total, item) => total + item.amount, 0)

    return (
        <HStack w='full' h='60px' color='white' justifyContent='space-between' position='sticky' top='0'>
            <HStack>
                <MenuMobile />
                <Link href='/'>
                    <Image maxH='40px' borderRadius='10px' src="https://www.flygo-aviation.com/wp-content/uploads/2021/08/flygo-logo-trp-big.png" />
                </Link>
            </HStack>
            <HStack spacing='5'>
                <HStack spacing='5' display={{ md: 'flex', base: 'none' }}>
                    <Link href={'tel:+0814201002'}>
                        <HStack _hover={{ bg: 'blackAlpha.300' }} py='1' px='3' borderRadius='10px' cursor='pointer'>
                            <MdOutlinePhoneInTalk size='25px' />
                            <Text fontSize='14px' lineHeight='1.3'>Gọi mua hàng <br /> 1800.6759</Text>
                        </HStack>
                    </Link>
                    <Link href={'/stores'}>
                        <HStack _hover={{ bg: 'blackAlpha.300' }} py='1' px='3' borderRadius='10px' cursor='pointer'>
                            <FiMapPin size='25px' />
                            <Text fontSize='14px' lineHeight='1.3'>Hệ thống <br /> cửa hàng</Text>
                        </HStack>
                    </Link>
                    <Link href={'/member/histories'}>
                        <HStack _hover={{ bg: 'blackAlpha.300' }} py='1' px='3' borderRadius='10px' cursor='pointer'>
                            <FaShippingFast size='25px' />
                            <Text fontSize='14px' lineHeight='1.3'>Lịch sử <br /> đơn hàng</Text>
                        </HStack>
                    </Link>
                </HStack>
                <HStack>
                    <Link href={'/cart'}>
                        <HStack _hover={{ bg: 'blackAlpha.300' }} px='3' py='1' borderRadius='10px' cursor='pointer'>
                            <BiCartAdd size='25px' />
                            <Badge fontSize='xs' ml='-13px' mt='-16px' borderRadius='10px' colorScheme='green'>{cart_amount}</Badge>
                            <Text whiteSpace='nowrap' lineHeight='1.3' fontSize='14px'>Giỏ <br /> hàng</Text>
                        </HStack>
                    </Link>
                    {!fuser && (
                        <Link href={'/login'} style={{ width: '100%' }}>
                            <Button size='sm' borderRadius='10px'>Đăng nhập</Button>
                        </Link>
                    )}
                    {fuser && <UserName />}
                </HStack>
            </HStack>
            {/* <Button onClick={toggleColorMode}>Sáng</Button> */}
        </HStack>
    )
}