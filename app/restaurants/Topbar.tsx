import { FirebaseAuth } from "@/config/firebase"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Avatar, Box, Button, Flex, HStack, IconButton, Image, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, useColorMode } from "@chakra-ui/react"
import { signOut } from "firebase/auth"
import { FiChevronDown, FiHome } from "react-icons/fi"
import { MdLogout, MdOutlineModeNight } from "react-icons/md"
import { BsSun } from "react-icons/bs"
import { theme } from "@/theme"
import { RiLoginCircleLine, RiLogoutCircleRLine } from "react-icons/ri"


export const Topbar = () => {

    const firebase_ctx = useFirebaseUserContext()
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <HStack
            position='sticky'
            zIndex='999'
            top='0'
            w='full'
            bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
            height='65px'
            px={{ base: 2, md: 4 }}
            // borderBottom='1px'
            // borderBottomColor='gray.200'
            justifyContent='space-between'
        >
            <HStack fontWeight='600' fontSize='20px' mr='4'>
                <Image
                    src='https://cdn-icons-png.flaticon.com/512/1376/1376355.png'
                    boxSize={{ base: '35px', md: '40px' }}
                />
                <Text
                    fontSize={{ base: 16, md: 20 }}
                // color='#2193b0'
                >
                    Menu điện tử cho nhà hàng
                </Text>
            </HStack>
            <HStack>
                <Box>
                    <IconButton
                        fontSize='xl'
                        color={colorMode == 'dark' ? 'gray.400' : 'gray.600'}
                        variant="ghost"
                        borderRadius='full'
                        aria-label='dark'
                        icon={colorMode == 'dark' ? <BsSun /> : <MdOutlineModeNight />}
                        onClick={toggleColorMode}
                    />
                </Box>
                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<FiChevronDown color={colorMode == 'dark' ? 'gray.400' : 'gray.600'} />}
                        borderRadius='full'
                        px='3'
                    >
                        {<Avatar size='xs' src={firebase_ctx.fuser?.photoURL ?? 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'} />}
                    </MenuButton>
                    <MenuList bg={colorMode == 'dark' ? '#242526' : 'white'}>
                        <VStack w='full' px='2'>
                            <VStack
                                spacing="2"
                                w='full'
                                my='2'
                            >
                                <Avatar
                                    size={"lg"}
                                    src={firebase_ctx.fuser?.photoURL ?? 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}
                                    mb='1'
                                />
                                <Text fontSize="sm" fontWeight="500">{firebase_ctx.fuser?.displayName}</Text>
                                <Text fontSize="xs" color={colorMode == 'dark' ? 'gray.400' : 'gray.600'}>
                                    {firebase_ctx.fuser?.email}
                                </Text>
                            </VStack>
                            {
                                firebase_ctx.fuser ?
                                    <Button
                                        display={{ base: 'none', md: 'block' }}
                                        w='full'
                                        leftIcon={<RiLogoutCircleRLine />}
                                        borderRadius='full'
                                        onClick={firebase_ctx.logout}
                                    >
                                        Đăng xuất
                                    </Button> :
                                    <Button
                                        display={{ base: 'none', md: 'block' }}
                                        w='full'
                                        leftIcon={<RiLoginCircleLine />}
                                        borderRadius='full'
                                        onClick={firebase_ctx.open_login_modal}
                                    >
                                        Đăng nhập
                                    </Button>
                            }
                        </VStack>
                    </MenuList>
                </Menu>
            </HStack>
        </HStack>
    )
}