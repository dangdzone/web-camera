import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, useDisclosure, Text, VStack, Box, useColorMode } from "@chakra-ui/react"
import React, { useState } from "react"
import { FcCheckmark } from "react-icons/fc"


export type AlertModal = {
    title: string | JSX.Element,
    onClose: () => void
}

export const AlertModal = (props: AlertModal) => {

    const { colorMode } = useColorMode()
    const cancelRef = React.useRef()

    return (
        <AlertDialog
            motionPreset='slideInBottom'
            isOpen={true}
            leastDestructiveRef={cancelRef as any}
            onClose={props.onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>

                    <AlertDialogBody>
                        <VStack w='full' spacing='4' pt='5'>
                            <Box p='5' borderRadius='full' bg={colorMode == 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}>
                                <FcCheckmark size='30px' />
                            </Box>
                            <Text w='full' fontSize='20px' textAlign='center' fontWeight='600'>{props.title}</Text>
                        </VStack>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <VStack w='full' pb='5'>
                            <Button ref={cancelRef as any} onClick={props.onClose}>
                                Đóng
                            </Button>
                        </VStack>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}