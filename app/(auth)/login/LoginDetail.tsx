
import { auth } from "@/config/firebase"
import { Button, VStack, useToast } from "@chakra-ui/react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"

export const LoginDetail = () => {

    const toast = useToast();

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider);
            toast({
                title: "Đăng nhập thành công.",
                status: "success",
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Đăng nhập không thành công.",
                status: "error",
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            });
        }
    };


    return (
        <VStack w='full'>
            <Button
                w={{ base: '90%', md: '80%' }}
                variant={'outline'}
                borderRadius='10px'
                leftIcon={<FcGoogle size='20px' />}
                // onClick={() => signInWithPopup(auth, new GoogleAuthProvider)}
                onClick={handleLogin}
            >
                Tiếp tục với Google
            </Button>
        </VStack>
    )
}