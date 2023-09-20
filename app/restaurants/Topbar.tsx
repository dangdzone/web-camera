import { FirebaseAuth } from "@/config/firebase"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Avatar, Box, Button, Flex, HStack, Image, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react"
import { signOut } from "firebase/auth"
import { FiChevronDown, FiHome } from "react-icons/fi"
import { MdLogout } from "react-icons/md"

export const Topbar = () => {

    const { fuser } = useFirebaseUserContext()

    return (
        <HStack
            position='sticky'
            zIndex='999'
            top='0'
            w='full'
            bg='#FFFFFF'
            height='65px'
            px={{ base: 2, md: 4 }}
            borderBottom='1px'
            borderBottomColor='gray.200'
            justifyContent='space-between'
        >
            <HStack fontWeight='600' fontSize='20px' mr='4'>
                <Image
                    src='https://cdn-icons-png.flaticon.com/512/1376/1376355.png'
                    boxSize={{ base: '35px', md: '40px' }}
                />
                <Text fontSize={{ base: 16, md: 20 }} color='#2193b0'>Quản lý nhà hàng</Text>
            </HStack>
            <Menu>
                <MenuButton as={Button} rightIcon={<FiChevronDown />}>
                    Actions
                </MenuButton>
                <MenuList>
                    <MenuItem>Download</MenuItem>
                    <MenuItem>Create a Copy</MenuItem>
                    <MenuItem>Mark as Draft</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    )
}