'use client'
import { DirectionalLink } from "@/components/common/DirectionalLink";
import { Product } from "@/type";
import { Center, Divider, HStack, ListItem, Stack, Text, UnorderedList, VStack } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import { useDocumentData } from "@livequery/react";
import { useParams } from "next/navigation";
import { BiCartAdd } from "react-icons/bi";
import { RiHome2Line } from "react-icons/ri";
import { ProductInfo } from "./ProductInfo";
import { ProductSpecification } from "./ProductSpecification";
import { ProductIdPageLoading } from "@/components/loading/ProductIdPageLoading";

export default function ProductIdPage() {

    const params = useParams()
    const product = useDocumentData<Product>(`products/${params.product_id}`)

    if (product.loading) return <ProductIdPageLoading />

    return (
        <Stack w='full' spacing='5'>
            <HStack>
                <DirectionalLink directional={[
                    { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                    { name: 'Sản phẩm', href: '/' },
                    { name: `${product.item?.code}` },
                ]} />
            </HStack>
            <Text fontSize='18px' fontWeight='700'>{product.item?.name}</Text>
            <Stack w='full' spacing='5' flexDirection='row'>
                <Center w='full' py='10' borderRadius='20px' border='1px' borderColor='blackAlpha.200'>
                    <Image maxH='250px' src={product.item?.image} />
                </Center>
                <Stack w='full' spacing='4'>
                    <HStack>
                        <Text fontWeight='700' fontSize='20px' color='red.600'>
                            {product.item?.price.toLocaleString()}đ
                        </Text>
                        <Text fontWeight='700' textDecoration='line-through' color='blackAlpha.600'>
                            {product.item?.advertising_price.toLocaleString()}đ
                        </Text>
                    </HStack>
                    <HStack>
                        <Button w='full' size='lg' colorScheme="red" borderRadius='10px' p='7'>
                            <VStack spacing='1'>
                                <Text fontSize='15px' fontWeight='700'>MUA NGAY</Text>
                                <Text fontSize='14px' fontWeight='400'>Thanh toán online và giao hàng trong ngày</Text>
                            </VStack>
                        </Button>
                        <Button size='lg' p='6' variant='outline' colorScheme="red" border='2px' borderColor='red.500' borderRadius='10px'>
                            <VStack spacing='1' color='red.500'>
                                <BiCartAdd size='20px' />
                                <Text fontSize='12px'>Thêm giỏ hàng</Text>
                            </VStack>
                        </Button>
                    </HStack>
                    <Stack w='fulll' spacing='4' pt='3'>
                        <Text fontWeight='600' fontSize='18px'>Thông tin sản phẩm</Text>
                        <Stack w='full'>
                            {
                                product.item?.infos.map((info, i) => (
                                    <ProductInfo key={info.name} info={info} />
                                ))
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Divider my='5' />
            <Stack w='full' spacing='5' flexDirection='row'>
                <Stack w='60%' >
                    <Stack w='full' border='1px' borderColor='blackAlpha.200' borderRadius='10px'>
                        <Text fontWeight='600' fontSize='18px' p='3' color='red.500' borderTopRadius='10px' bg='red.50'>Đặc điểm nổi bật</Text>
                        <UnorderedList spacing={3} p='3'>
                            {
                                product.item?.outstandings.map((outstanding, i) => (
                                    <ListItem key={i}>
                                        {outstanding.name}
                                    </ListItem>
                                ))
                            }
                        </UnorderedList>
                    </Stack>
                </Stack>
                <Stack w='40%' >
                    <Text fontWeight='600' fontSize='18px' py='3'>Thông số kĩ thuật</Text>
                    <Stack w='full' spacing='5' px='2' py='4' boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' borderRadius='10px'>
                        {
                            product.item?.specifications.map((specification, i) => (
                                <ProductSpecification key={i} specification={specification} />
                            ))
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}