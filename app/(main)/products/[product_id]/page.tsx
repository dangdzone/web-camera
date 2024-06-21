'use client'
import { DirectionalLink } from "@/components/common/DirectionalLink";
import { Cart, Product } from "@/type";
import { Center, Divider, HStack, ListItem, Stack, Text, UnorderedList, VStack } from "@chakra-ui/layout";
import { Button, Image, useToast } from "@chakra-ui/react";
import { useCollectionData, useDocumentData, useLiveQueryContext, useMonitor } from "@livequery/react";
import { useParams } from "next/navigation";
import { BiCartAdd } from "react-icons/bi";
import { RiHome2Line } from "react-icons/ri";
import { ProductInfo } from "./ProductInfo";
import { ProductSpecification } from "./ProductSpecification";
import { ProductIdPageLoading } from "@/components/loading/ProductIdPageLoading";
import { useForm } from "react-hook-form";
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser";
import Link from "next/link";

export default function ProductIdPage() {

    const toast = useToast()
    const params = useParams()
    const { fuser } = useFirebaseUserContext()

    const product = useDocumentData<Product>(`products/${params.product_id}`)
    const $carts = useCollectionData<Cart>(fuser && `customers/${fuser?.uid}/carts`)
    // Tìm sản phẩm trong carts có product_id == product_id trong products
    const cart_item = $carts.items.filter(a => a.product_id == params.product_id).length
    // Lấy số lượng 1 sản phẩm trong cart
    const cart_item_amount = $carts.items.filter(a => a.product_id == params.product_id)[0]?.amount

    const { handleSubmit } = useForm<Cart>({
        defaultValues: {
            customer_id: fuser?.uid,
            product_id: params.product_id as string,
            amount: 1
        }
    })

    const { transporter } = useLiveQueryContext()
    const onSubmit = useMonitor(async data => {
        if (cart_item > 0) {
            // Check xem số lượng của sản phẩm trong cart so với số lượng trong kho 
            const check_amount = cart_item_amount < product.item.amount

            if (check_amount) {
                await transporter.update(`customers/${fuser?.uid}/carts`, {
                    ...data,
                })
                toast({
                    title: 'Thành công !',
                    description: "Bạn đã thêm sản phẩm này vào giỏ hàng.",
                    status: 'success',
                    duration: 1000,
                    variant: 'subtle',
                    position: 'top-right'
                })
            } else {
                toast({
                    title: 'Thất bại !',
                    description: "Trong giỏ hàng không còn số lượng đủ.",
                    status: 'error',
                    duration: 1000,
                    variant: 'subtle',
                    position: 'top-right'
                })
            }
        } else {
            await transporter.add(`customers/${fuser?.uid}/carts`, {
                ...data
            })
            toast({
                title: 'Thêm thành công !',
                description: "Bạn đã thêm sản phẩm này vào giỏ hàng.",
                status: 'success',
                duration: 1000,
                variant: 'subtle',
                position: 'top-right'
            })
        }
    })

    if (product.loading) return <ProductIdPageLoading />

    return (
        <Stack w='full' spacing='5'>
            <DirectionalLink directional={[
                { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                { name: 'Sản phẩm', href: '/' },
                { name: `${product.item?.code}` },
            ]} />
            <Text fontSize='18px' fontWeight='700'>{product.item?.name}</Text>
            <Stack w='full' spacing='5' flexDirection={{ base: 'column', md: 'row' }}>
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
                        <Link href={`/products/${params.product_id}/create-order`} style={{ width: '100%' }}>
                            <Button w='full' size='lg' colorScheme="red" borderRadius='10px' py='7' px='1'>
                                <VStack spacing='1'>
                                    <Text fontSize='15px' fontWeight='700'>MUA NGAY</Text>
                                    <Text fontSize={{base: '10px', md: '14px'}} fontWeight='400'>Thanh toán online và giao hàng trong ngày</Text>
                                </VStack>
                            </Button>
                        </Link>
                        <form onSubmit={handleSubmit(onSubmit.excute)}>
                            <Button type="submit" isDisabled={!fuser} size='lg' p='6' variant='outline' colorScheme="red" border='2px' borderColor='red.500' borderRadius='10px'>
                                <VStack spacing='1' color='red.500'>
                                    <BiCartAdd size='20px' />
                                    <Text fontSize='12px'>Thêm giỏ hàng</Text>
                                </VStack>
                            </Button>
                        </form>
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
            <Stack w='full' spacing='5' flexDirection={{ base: 'column', md: 'row' }}>
                <Stack w={{ base: '100%', md: '60%' }} >
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
                <Stack w={{ base: '100%', md: '40%' }}  >
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