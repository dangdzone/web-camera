'use client'

import { Box, Flex, HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { Button, Collapse, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { theme } from "@/theme"
import { BsSun } from "react-icons/bs"
import { MdLogout, MdOutlineModeNight } from "react-icons/md"
import { PropsWithChildren } from "react"


export const TopbarAdmin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const MenuList = ['Trang chủ', 'Đơn hàng', 'Bàn ăn']
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <HStack
            w='full'
            h='65px'
            px={{ base: '2', md: '4' }}
            bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}
            justifyContent='space-between'
        >
            <HStack as={'nav'} display={{ base: 'none', md: 'flex' }} spacing='10'>
                <Text fontWeight='600' textTransform='uppercase'>Cơ sở 1</Text>
                <HStack>
                    {MenuList.map((menu) => (
                        <Button
                            key={menu}
                            variant='ghost'
                            size='sm'
                        >
                            {menu}
                        </Button>
                    ))}
                </HStack>
            </HStack>


            <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
            />
            {
                isOpen ? (
                    <Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent bg={colorMode == 'dark' ? theme.backgrounds[200].dark : 'white'}>
                            <DrawerCloseButton />
                            <DrawerBody>
                                <VStack mt='7' align='flex-start' spacing='3'>
                                    {MenuList.map((menu) => (
                                        <Text key={menu}>{menu}</Text>
                                    ))}
                                </VStack>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                ) : null
            }
            <IconButton
                fontSize='xl'
                color={colorMode == 'dark' ? 'gray.400' : 'gray.600'}
                variant="ghost"
                borderRadius='full'
                aria-label='dark'
                icon={colorMode == 'dark' ? <BsSun /> : <MdOutlineModeNight />}
                onClick={toggleColorMode}
            />
        </HStack >
    )
}


// const DrawerModal = (props: PropsWithChildren) => {
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     return (
//         <Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
//             <DrawerOverlay />
//             <DrawerContent>
//                 <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
//                 <DrawerBody>
//                 </DrawerBody>
//             </DrawerContent>
//         </Drawer>
//     )
// }
