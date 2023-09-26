import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Avatar, Box, Button, HStack, IconButton, Image, Menu, MenuButton, MenuList, Text, VStack, useColorMode } from "@chakra-ui/react"
import { FiChevronDown } from "react-icons/fi"
import { MdOutlineModeNight } from "react-icons/md"
import { BsSun } from "react-icons/bs"
import { RiLoginCircleLine, RiLogoutCircleRLine } from "react-icons/ri"


export const Topbar = () => {

    const firebase_ctx = useFirebaseUserContext()
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <HStack
            zIndex='999'
            w='full'
            bg={colorMode == 'dark' ? '#03346a' : '#0665D0'}
            height='65px'
            px={{ base: 2, md: 4 }}
            color='white'
            justifyContent='space-between'
            py='3'
        >
            <HStack>
                <Image
                    src='https://cdn-icons-png.flaticon.com/512/1792/1792902.png'
                    boxSize={{ base: '25px', md: '30px' }}
                />
                <Text fontSize={{ base: 14, md: 18 }}>
                    Menu điện tử cho nhà hàng
                </Text>
            </HStack>
            <HStack>
                <Box>
                    <IconButton
                        fontSize='lg'
                        bg='whiteAlpha.200'
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
                        bg='whiteAlpha.200'
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
                                <Text fontSize="sm" fontWeight="600" color={colorMode == 'dark' ? 'gray.300' : 'gray.600'}>{firebase_ctx.fuser?.displayName}</Text>
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