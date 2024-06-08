import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Cart } from "@/type"
import { Badge, Button, Divider, HStack, Menu, MenuButton, MenuList, Stack, Text } from "@chakra-ui/react"
import { useCollectionData } from "@livequery/react"
import Link from "next/link"
import { BiCartAdd } from "react-icons/bi"
import { FaShippingFast } from "react-icons/fa"
import { FiMapPin } from "react-icons/fi"
import { MdMenu, MdOutlinePhoneInTalk } from "react-icons/md"


export const MenuMobile = () => {

    const { fuser } = useFirebaseUserContext()
    const { items: $carts } = useCollectionData<Cart>(fuser && `customers/${fuser?.uid}/carts`)
    const cart_amount = $carts.reduce((total, item) => total + item.amount, 0)

    return (
        <Menu>
            <MenuButton
                as={Button}
                borderRadius='full'
                p='3'
                variant='unstyled'
                display={{ base: 'flex', md: 'none' }}
            >
                <MdMenu size='22px' />
            </MenuButton>
            <MenuList border='none' boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px' borderRadius='10px'>
                <Stack w='full' divider={<Divider />}>
                    <Link href={'tel:+0814201002'}>
                        <HStack color='blackAlpha.900' py='2' px='3' borderRadius='10px' cursor='pointer'>
                            <MdOutlinePhoneInTalk size='25px' />
                            <Text fontSize='14px' lineHeight='1.3'>Gọi mua hàng <br /> 1800.6759</Text>
                        </HStack>
                    </Link>
                    <Link href={'/stores'}>
                        <HStack color='blackAlpha.900' py='3' px='3' borderRadius='10px' cursor='pointer'>
                            <FiMapPin size='25px' />
                            <Text fontSize='14px' lineHeight='1.3'>Hệ thống cửa hàng</Text>
                        </HStack>
                    </Link>
                    <Link href={'/member/histories'}>
                        <HStack color='blackAlpha.900' py='3' px='3' borderRadius='10px' cursor='pointer'>
                            <FaShippingFast size='25px' />
                            <Text fontSize='14px' lineHeight='1.3'>Lịch sử đơn hàng</Text>
                        </HStack>
                    </Link>
                </Stack>
            </MenuList>

        </Menu>
    )
}