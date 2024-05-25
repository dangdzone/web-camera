
import { FirebaseAuth } from "@/config/firebase"
import { Button, VStack } from "@chakra-ui/react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"

export const LoginDetail = () => {

    return (
        <VStack w='full'>
            <Button
                w={{ base: '90%', md: '80%' }}
                variant={'outline'}
                borderRadius='10px'
                leftIcon={<FcGoogle size='20px' />}
                onClick={() => signInWithPopup(FirebaseAuth, new GoogleAuthProvider)}
            >
                Tiếp tục với Google
            </Button>
        </VStack>
    )
}