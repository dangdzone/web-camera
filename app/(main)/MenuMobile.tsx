import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Cart } from "@/type"
import { Badge, Button, Divider, HStack, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react"
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
            <MenuList border='none' boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px' borderRadius='10px' px='2'>
                <Stack w='full' divider={<Divider />}>
                    <Link href={'tel:+0814201002'}>
                        <MenuItem borderRadius='10px' color='blackAlpha.800' _hover={{ bg: 'blackAlpha.100' }} >
                            <HStack py='1' cursor='pointer' >
                                <MdOutlinePhoneInTalk size='25px' />
                                <Text fontWeight='500' lineHeight='1.3'>Gọi mua hàng <br /> 1800.6759</Text>
                            </HStack>
                        </MenuItem>
                    </Link>
                    <Link href={'/stores'}>
                        <MenuItem borderRadius='10px' color='blackAlpha.800' _hover={{ bg: 'blackAlpha.100' }} >
                            <HStack py='2' cursor='pointer' >
                                <FiMapPin size='25px' />
                                <Text fontWeight='500' lineHeight='1.3'>Hệ thống cửa hàng</Text>
                            </HStack>
                        </MenuItem>
                    </Link>
                    <Link href={'/member/histories'}>
                        <MenuItem borderRadius='10px' color='blackAlpha.800' _hover={{ bg: 'blackAlpha.100' }} >
                            <HStack py='2' cursor='pointer' >
                                <FaShippingFast size='25px' />
                                <Text lineHeight='1.3' fontWeight='500'>Lịch sử đơn hàng</Text>
                            </HStack>
                        </MenuItem>
                    </Link>
                </Stack>
            </MenuList>

        </Menu>
    )
}