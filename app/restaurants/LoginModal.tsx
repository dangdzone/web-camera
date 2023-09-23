
import { Text } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, VStack, useColorMode, useToast } from "@chakra-ui/react"
import { useEffect } from "react"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { LoginDetail } from "../(auth)/login/LoginDetail"

export type LoginModal = {
    onClose: () => void
}

export const LoginModal = (props: LoginModal) => {

    const toast = useToast()
    const { colorMode } = useColorMode()
    const { fuser, loading } = useFirebaseUserContext()

    useEffect(() => {
        if (!loading && fuser) {
            toast({
                title: 'Đăng nhập thành công !',
                position: 'top-right',
                status: 'success',
                duration: 3000,
            })
        }
    })

    return (
        <Modal
            isOpen={true}
            onClose={props.onClose}
            size='xl'
        >
            <ModalOverlay />
            <ModalContent mx='2' bg={colorMode == 'dark' ? '#242526' : 'white'}>
                <ModalCloseButton borderRadius='full' />
                <ModalBody p='0' py='10'>
                    <VStack w='full' px='2' py='6' spacing='10'>
                        <VStack w='full' spacing='2' justifyContent='center'>
                            <Text fontWeight='400' fontSize='3xl' color='teal.500'>Welcome back!</Text>
                            <Text fontWeight='400' opacity='0.8' alignItems='center'>Đăng nhập để sử dụng dịch vụ của chúng tôi!</Text>
                        </VStack>
                        <LoginDetail />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}