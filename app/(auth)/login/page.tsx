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

    const { colorMode } = useColorMode()
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
            router.push(`/restaurants`)
        }
    })

    return (
        <Center minH={'100vh'} bg={colorMode == 'dark' ? '#18191A' : '#f0f1f1'}  >
            <SimpleGrid
                columns={[1, 1, 2, 2]}
                maxW='820px'
                minH='400px'
                spacing='0'
                bg={colorMode == 'dark' ? '#242526' : 'white'}
                borderRadius='20px'
                m='2'
                px='2'
                // border='1px solid #38cab3'
                boxShadow='md'
            >
                <VStack alignSelf='center' display={{ base: 'none', md: 'block' }} pl='10'>
                    <Image
                        borderRadius='10px'
                        // src='https://cdni.iconscout.com/illustration/premium/thumb/content-creator-making-live-session-with-fans-4743506-3943461.png?f=webp'
                        src='https://dvdtuhoc.com/phan-mem-live-stream-ban-hang/imager_2_11822_700.jpg'
                    />
                </VStack>
                <VStack
                    h='full'
                    w='full'
                    px='2'
                    py='10'
                    borderRightRadius='10px'
                    align={'center'}
                    justify={'center'}
                    spacing='8'
                >
                    <Stack align={'center'} spacing={3}>
                        <HStack color='teal.500'>
                            <Text fontWeight='400' fontSize='3xl'>Nhóm 10</Text>
                        </HStack>
                        <Text align={'center'} fontSize={{ base: 'sm', md: 'md' }} fontWeight='400' color={'gray.500'}>
                            Chào mừng bạn đến với Menu cho nhà hàng...
                        </Text>
                    </Stack>
                    <LoginDetail />
                </VStack>
            </SimpleGrid>
        </Center>
    );
}