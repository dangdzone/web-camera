'use client'
import { HStack, Stack, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { IconButton, Image } from "@chakra-ui/react";
import { CameraList } from "./CameraList";
import { FiArrowLeft } from "react-icons/fi";

export default function PageTrongNha() {

    const ProducerList = [
        { name: 'ezviz', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/a/b/abcde_9_.png' },
        { name: 'imou', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/a/b/abcde_10_.png' },
        { name: 'xiaomi', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/a/b/abcde_11_.png' },
        { name: 'tapo', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/a/b/abcde_12_.png' },
        { name: 'yoosee', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/catalog/product/y/o/yoosee.png' },
        { name: 'tenda', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/a/b/abcde_5_.png' },
        { name: 'hikvision', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/a/b/abcde_13_.png' },
        { name: 'eufy', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/tmp/catalog/product/a/b/abcde_15_.png' },
    ]

    return (
        <Stack w='full' spacing='5'>
            <HStack w='full' py='4' borderBottom='1px' borderColor='blackAlpha.300'>
                <IconButton aria-label="back" icon={<FiArrowLeft size='20px' />} size='sm' variant='unstyled' />
                <Text fontWeight='700' fontSize='20px'>An ninh</Text>
            </HStack>
            <Wrap>
                {
                    ProducerList.map((item, i) => (
                        <WrapItem
                            key={item.name}
                            p='2'
                            borderRadius='5px'
                            border='1px'
                            borderColor='blackAlpha.300'
                            _hover={{
                                borderColor: 'cyan.500'
                            }}
                            cursor='pointer'
                        >
                            <Image maxH='20px' src={item.img} />
                        </WrapItem>
                    ))
                }
            </Wrap>
            <Stack>
                <Text fontWeight='600' opacity='0.8'>Chọn theo tiêu chí</Text>
                <Wrap>
                    <WrapItem
                        px='2' py='1'
                        borderRadius='5px'
                        border='1px'
                        borderColor='blackAlpha.300'
                    >
                        Độ phân giải
                    </WrapItem>
                    <WrapItem
                        px='2' py='1'
                        borderRadius='5px'
                        border='1px'
                        borderColor='red.500'
                        color='red.500'
                    >
                        Tiện ích
                    </WrapItem>
                </Wrap>
            </Stack>
            <Stack>
                <Text fontWeight='600' opacity='0.8'>Sắp xếp theo</Text>
                <Wrap>
                    <WrapItem
                        px='2' py='1'
                        borderRadius='5px'
                        border='1px'
                        borderColor='blackAlpha.300'
                    >
                        Giá cao - thấp
                    </WrapItem>
                    <WrapItem
                        px='2' py='1'
                        borderRadius='5px'
                        border='1px'
                        borderColor='red.500'
                        color='red.500'
                    >
                        Giá thấp - cao
                    </WrapItem>
                </Wrap>
            </Stack>
            
            <CameraList />
        </Stack>
    )
}