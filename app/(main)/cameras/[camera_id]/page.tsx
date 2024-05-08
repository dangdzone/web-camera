'use client'
import { Box, Center, HStack, Stack, Text, VStack } from "@chakra-ui/layout";
import { IconButton, Image } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

export default function CameraId() {
    return (
        <Stack w='full'>
            <HStack w='full' py='4' borderBottom='1px' borderColor='blackAlpha.300'>
                <IconButton aria-label="back" icon={<FiArrowLeft size='20px' />} size='sm' variant='unstyled' />
                <Text fontWeight='700' fontSize='20px'>Camera IP WiFi ngoài trời EZVIZ H8c 2K</Text>
            </HStack>
            <Stack w='full' flexDirection='row' spacing='5'>
                <Center borderRadius='10px' w='50%' minH='400px' bgGradient='linear-gradient(to right, #4ca1af, #c4e0e5)'>
                    <Image borderRadius='10px' maxH='300px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/a/camera-ip-wifi-ezviz-h8c-1080p-full-color.png' />
                </Center>
                <Stack>
                    <Text fontWeight='700' color='red.500' fontSize='20px'>1.800.555 đ</Text>
                </Stack>
            </Stack>

        </Stack>
    )
}