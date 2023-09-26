'use client'

import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Avatar, Button, IconButton, Menu, MenuButton, MenuList, useColorMode } from "@chakra-ui/react"
import Link from "next/link"
import { BsSun } from "react-icons/bs"
import { FiChevronDown } from "react-icons/fi"
import { MdOutlineModeNight } from "react-icons/md"
import { RiLogoutCircleRLine, RiLoginCircleLine } from "react-icons/ri"

export const TopbarAdmin = () => {

    const { colorMode, toggleColorMode } = useColorMode()
    const firebase_ctx = useFirebaseUserContext()

    return (
        <HStack
            w='full'
            h='65px'
            px={{ base: '2', md: '4' }}
            py='3'
            bg={colorMode == 'dark' ? '#03346a' : '#0665D0'}
            justifyContent='space-between'
            color='white'
            zIndex='999'
        >
            <VStack w='full' align='flex-start' spacing='0'>
                <Text fontWeight='600' textTransform='uppercase'>Cơ sở 1</Text>
                <Text opacity='0.8' fontSize='13px'>Số 5 Hà Đông, Hà Nội</Text>
            </VStack>
            <HStack>
                <IconButton
                    fontSize='lg'
                    // color={colorMode == 'dark' ? 'gray.400' : 'gray.300'}
                    // variant="ghost"
                    borderRadius='full'
                    aria-label='dark'
                    icon={colorMode == 'dark' ? <BsSun /> : <MdOutlineModeNight />}
                    onClick={toggleColorMode}
                />
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
                                <Text fontSize="sm" fontWeight="500" color={colorMode == 'dark' ? 'gray.300' : 'gray.700'}>{firebase_ctx.fuser?.displayName}</Text>
                                <Text fontSize="xs" color={colorMode == 'dark' ? 'gray.400' : 'gray.600'}>
                                    {firebase_ctx.fuser?.email}
                                </Text>
                            </VStack>
                            <Link href='/?index=0' style={{ width: '100%' }}>
                                <Button w='full'>Danh sách nhà hàng</Button>
                            </Link>
                            {
                                firebase_ctx.fuser ?
                                    <Button
                                        display={{ base: 'none', md: 'block' }}
                                        w='full'
                                        leftIcon={<RiLogoutCircleRLine />}
                                        onClick={firebase_ctx.logout}
                                    >
                                        Đăng xuất
                                    </Button> :
                                    <Button
                                        display={{ base: 'none', md: 'block' }}
                                        w='full'
                                        leftIcon={<RiLoginCircleLine />}
                                        onClick={firebase_ctx.open_login_modal}
                                    >
                                        Đăng nhập
                                    </Button>
                            }
                        </VStack>
                    </MenuList>
                </Menu>
            </HStack>
        </HStack >
    )
}

