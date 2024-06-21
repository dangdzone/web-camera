"use client"

import {
    Stack,
    Text,
    Center,
    HStack,
    VStack,
    Image,
    useColorMode,
    SimpleGrid,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFirebaseUserContext } from '@/hooks/useFirebaseUser';
import { LoginDetail } from './LoginDetail';

export default function LoginPage() {

    const toast = useToast()
    const router = useRouter()
    const { fuser, loading } = useFirebaseUserContext()

    useEffect(() => {
        if (!loading && fuser) {
            toast({
                title: 'Đăng nhập thành công !',
                position: 'top-right',
                status: 'success',
                duration: 3000,
            })
            router.push(`/`)
        }
    })

    return (
        <Stack w='full' justifyContent='center' flexDirection='row'>
            <VStack w='full' maxW='xl' pt='20' spacing='10'>
                <Image maxH='150px' src='https://www.certifiedfinancialguardian.com/images/blog-wp-login.png' />
                <VStack w='full' spacing='7'>
                    <Text fontSize='25px' fontWeight='600'>Đăng nhập</Text>
                    <LoginDetail />
                </VStack>
            </VStack>
        </Stack>
    );
}