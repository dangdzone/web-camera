'use client'

import {
    Heading,
    Stack,
    Text,
    Button,
    Box,
    VStack,
    Icon,
    SimpleGrid,
    Center,
    HStack,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { FcCameraIdentification, FcCurrencyExchange, FcMindMap, FcOvertime, FcSportsMode, FcTimeline } from 'react-icons/fc';
import Link from 'next/link';



interface FeatureProps {
    title: string,
    text: string,
    icon: ReactElement,
}

const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
        <VStack
            py='5'
            px='2'
            border='1px'
            borderColor='gray.200'
            borderRadius='10px'
            _hover={{
                transform: 'translateY(-5px)',
                transition: 'all 0.3s',
                boxShadow: '0 5px 10px 0 rgb(0 0 0 / 15%)'
            }}
        >
            <Center
                w={16}
                h={16}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}
            >
                {icon}
            </Center>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </VStack>
    );
};

export default function IndexPage() {
    const ListName = [
        {
            name: 'ThS. Nguyễn Hồng Thanh',
            position: 'Giảng viên hướng dẫn'
        },
        {
            name: 'Nguyễn Văn Đang',
            position: 'Nhóm Trưởng'
        },
        {
            name: 'Bùi Hương Giang',
            position: 'Thành viên'
        },
        {
            name: 'Đinh Thị Thu Phương',
            position: 'Thành viên'
        },
    ]
    return (
        <Stack
            textAlign={'center'}
            align={'center'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
        >
            <VStack w='full' spacing={10}>
                <Heading
                    fontWeight={900}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                    px='2'
                >
                   	Công nghệ Web{' - '} Nhóm 10 {' - '}
                    <Text as={'span'} color={'teal.500'} lineHeight='1.5'>
                        Menu điện tử cho nhà hàng Nét Huế.
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'5xl'} fontSize={{ base: 'lg', md: '2xl' }} fontWeight={500} px='2'>
                    Giải pháp thay thế menu trong các nhà hàng Nét Huế, vận hành hàng trăm yêu cầu gọi món cùng một lúc nhanh gọn, chính xác.
                </Text>
                <Stack spacing={3} direction={'row'}>
                    <Link href='/login'>
                        <Button
                            px={8}
                            colorScheme='teal'
                            variant='solid'
                            rightIcon={<ArrowForwardIcon />}
                            size='lg'
                            boxShadow='md'
                        >
                            Bắt đầu
                        </Button>
                    </Link>
                </Stack>
            </VStack>
            <Box p={4} pt='10'>
                <SimpleGrid columns={[1, 1, 2, 2, 3, 3]} spacing={10}>
                    <Feature
                        icon={<Icon as={FcCameraIdentification} w={10} h={10} />}
                        title={'Quét mã gọi món tại bàn'}
                        text={
                            'Nhân viên lên order hoặc khách hàng order trên menu điện tử bằng QR Code tại bàn. Khi hoàn tất, order được tự động chuyển xuống bếp/ bar, hóa đơn được chuyển đến quầy thu ngân.'
                        }
                    />
                    <Feature
                        icon={<Icon as={FcMindMap} w={10} h={10} />}
                        title={'Tạo nhiều chi nhánh, cửa hàng'}
                        text={
                            'Phần mềm hỗ trợ cho chủ cửa hàng có thể mở rộng chi nhánh, cửa hàng ngay lập tức, không mất thời gian về việc setup, tiết kiệm được thời gian, công sức, mang lại hiệu quả cao.'
                        }
                    />
                    <Feature
                        icon={<Icon as={FcTimeline} w={10} h={10} />}
                        title={'Theo dõi trạng thái món ăn'}
                        text={
                            'Khi khách hàng order trên phần mềm, khách hàng sẽ được thấy trạng thái từng món ăn và khách hàng sẽ biết được tiến độ phục vụ món của nhà hàng, tránh lên thiếu món.'
                        }
                    />
                    <Feature
                        icon={<Icon as={FcSportsMode} w={10} h={10} />}
                        title={'Lên món nhanh, chính xác'}
                        text={
                            'Sau khi nhận order trên phần mềm, nhân viên bếp/bar ngay lập tức nhận và chế biến món, phục vụ không cần xuống bếp đưa order giấy, tiết kiệm đến 70% thời gian phục vụ.'
                        }
                    />
                    <Feature
                        icon={<Icon as={FcOvertime} w={10} h={10} />}
                        title={'Quản lý menu riêng cho từng cửa hàng'}
                        text={
                            'Mỗi nhà hàng có thể quản lý riêng menu để phục vụ cho khách hàng, tạo sự linh hoạt, nhanh chóng.'
                        }
                    />
                    <Feature
                        icon={<Icon as={FcCurrencyExchange} w={10} h={10} />}
                        title={'Có thể tạo được nhiều order trong bàn cùng lúc'}
                        text={
                            'Mỗi bàn sẽ đều có 1 mã qr để tạo đơn hàng, đặc biệt có thể tạo được rất nhiều order trong bàn cùng 1 thời gian'
                        }
                    />
                </SimpleGrid>
            </Box>
            {/* <Stack w='full' spacing='4' p='2'>
                {
                    ListName.map(a => (
                        <HStack w='full' justifyContent='space-between'>
                            <Text>{a.position}</Text>
                            <HStack w='50%'>
                                <Text>{a.name}</Text>
                            </HStack>
                        </HStack>
                    ))
                }
            </Stack> */}
        </Stack>

    );
}