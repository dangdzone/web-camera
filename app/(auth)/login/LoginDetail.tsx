
import { FirebaseAuth } from "@/config/firebase"
import { Text } from "@chakra-ui/layout"
import { Button, HStack, Input, VStack } from "@chakra-ui/react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"

export const LoginDetail = () => {

    // Đăng nhập với nhân viên
    const [staff_login_active, set_staff_login_active] = useState<boolean>(false)

    return (
        <VStack w='full' spacing='5'>
            {
                staff_login_active !== false && (
                    <VStack w={{ base: '90%', md: '80%' }}>
                        <VStack w='full'>
                            <HStack w='full'>
                                <Text>E-mail</Text>
                            </HStack>
                            <Input />
                        </VStack>
                        <VStack w='full'>
                            <HStack w='full'>
                                <Text>Password</Text>
                            </HStack>
                            <Input />
                        </VStack>
                        <VStack w='full' pt='2'>
                            <Button w='full' colorScheme='teal'>Đăng nhập</Button>
                        </VStack>
                    </VStack>
                )
            }
            <VStack w='full'>
                <Button
                    w={{ base: '90%', md: '80%' }}
                    variant={'outline'}
                    leftIcon={<FcGoogle />}
                    onClick={() => signInWithPopup(FirebaseAuth, new GoogleAuthProvider)}
                >
                    Đăng nhập với Google
                </Button>
            </VStack>
            {/* <Text
                cursor='pointer'
                color='teal'
                opacity='0.7'
                _hover={{ opacity: '1' }}
                onClick={() => set_staff_login_active(true)}
                display={staff_login_active == true ? 'none' : 'block'}
            >
                Đăng nhập với nhân viên ?
            </Text> */}
        </VStack>
    )
}