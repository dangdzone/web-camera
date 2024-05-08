'use client'
import { SimpleGrid, Stack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { CameraList } from "./category/CameraList";
import Link from "next/link";

export default function MainPage() {

    const CategoryCameraList = [
        { name: 'An ninh', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-camera-an-ninh_1.png' },
        { name: 'Action camera', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-action-cam_1.png' },
        { name: 'Hành trình', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-action-cam_1.png' },
        { name: 'Máy ảnh', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-may-anh.png' },
        { name: 'Flycam', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-flycam_1.png' },
        { name: 'Gimbal', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-gimbal_1.png' },
        { name: 'Tripod', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-tripods_1.png' },
        { name: 'Lắp đặt', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-camera-an-ninh-lap-dat_1.png' },
    ]

    return (
        <VStack w='full' py='5' spacing='5'>
            <SimpleGrid w='full' spacing='2' columns={[2]}>
                <Image borderRadius='5px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:80/plain/https://dashboard.cellphones.com.vn/storage/r50.png' />
                <Image borderRadius='5px' src='https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:80/plain/https://dashboard.cellphones.com.vn/storage/r100.png' />
            </SimpleGrid>
            <Stack w='full'>
                <Text fontWeight='bold' fontSize='18px' opacity='0.9'>Chọn camera</Text>
                <SimpleGrid w='full' spacing='2' columns={[4, 5, 6, 7, 8, 9]}>
                    {
                        CategoryCameraList.map((item, i) => (
                            <Link key={i} href={'/category/camera123'}>
                                <Stack
                                    bgImage={item.img}
                                    borderRadius='10px'
                                    minH='125px' backgroundSize='cover'
                                    backgroundPosition='center -25px'
                                    backgroundRepeat='no-repeat'
                                    boxShadow='md'
                                >
                                    <Text p='2' fontSize='14px' color='white' fontWeight='600'>{item.name}</Text>
                                </Stack>
                            </Link>
                        ))
                    }
                </SimpleGrid>
            </Stack>

            <Stack w='full'>
                <Text fontWeight='bold' fontSize='18px' opacity='0.9'>Chọn theo tiêu chí</Text>
                <Wrap>
                    <WrapItem
                        px='2' py='1'
                        borderRadius='10px'
                        border='1px'
                        borderColor='blackAlpha.300'
                    >
                        Độ phân giải
                    </WrapItem>
                    <WrapItem
                        px='2' py='1'
                        borderRadius='10px'
                        border='1px'
                        borderColor='red.500'
                        color='red.500'
                    >
                        Tiện ích
                    </WrapItem>
                </Wrap>
            </Stack>
            <Stack w='full'>
                <Text fontWeight='bold' fontSize='18px' opacity='0.9'>Sắp xếp theo</Text>
                <Wrap>
                    <WrapItem
                        px='2' py='1'
                        borderRadius='10px'
                        border='1px'
                        borderColor='blackAlpha.300'
                    >
                        Giá cao - thấp
                    </WrapItem>
                    <WrapItem
                        px='2' py='1'
                        borderRadius='10px'
                        border='1px'
                        borderColor='red.500'
                        color='red.500'
                    >
                        Giá thấp - cao
                    </WrapItem>
                </Wrap>
            </Stack>

            <CameraList />
        </VStack>
    )
}