'use client'

import { AddressInfoModal } from "@/app/(main)/cart/info/AddressInfoModal"
import { UserInfo } from "@/app/(main)/cart/info/UserInfo"
import { AddressModal } from "@/app/(main)/member/addresses/AddressModal"
import { DirectionalLink } from "@/components/common/DirectionalLink"
import { FindLocationNames } from "@/components/common/FindLocationNames"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Address, Order, Product } from "@/type"
import { HStack, Stack, Text, VStack } from "@chakra-ui/layout"
import { Button, Image, Input, useDisclosure, useToast } from "@chakra-ui/react"
import { useCollectionData, useDocumentData, useLiveQueryContext } from "@livequery/react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { FiChevronRight, FiPlus } from "react-icons/fi"
import { RiHome2Line } from "react-icons/ri"


export default function CreateOrderPage() {

    const params = useParams()
    const product_id = params?.product_id
    const toast = useToast()
    const router = useRouter()
    const { fuser } = useFirebaseUserContext()
    const { transporter } = useLiveQueryContext()
    const $product = useDocumentData<Product>(product_id && `products/${product_id}`)

    const { watch, control, register, handleSubmit } = useForm<Order>({
        defaultValues: {
            amount: 1,
            note: ''
        }
    })

    const amount = watch("amount")
    const note = watch("note")

    const { items: $addresses } = useCollectionData<Address>(`customers/${fuser?.uid}/addresses`)
    const address_id_default = $addresses.find(a => a.default == true)?.id
    const [address_id, set_address_id] = useState<string>('')

    useEffect(() => {
        if (address_id_default) {
            set_address_id(address_id_default)
        }
    }, [address_id_default])

    const { item: $$address } = useDocumentData<Address>(address_id && `customers/${fuser?.uid}/addresses/${address_id}`)
    const provinceId = `${$$address?.province}`
    const districtId = `${$$address?.district}`
    const wardId = `${$$address?.ward}`
    const locationNames = FindLocationNames(provinceId, districtId, wardId)

    const AddressList = [
        { name: 'Họ và tên', value: $$address?.name },
        { name: 'Số điện thoại', value: $$address?.phone },
        { name: 'Địa chỉ', value: `${$$address?.street}, ${locationNames.wardName}, ${locationNames.districtName}, ${locationNames.provinceName}` }
    ]

    // Modal chọn address_id
    const $address_modal = useDisclosure()
    const [active_address_modal, set_active_address_modal] = useState<boolean>(false)
    const handleSetAddressId = (id: string) => {
        set_address_id(id);
    };

    // Tổng tiền
    const total = amount * $product.item?.advertising_price
    // Tổng tiền phải thanh toán (tạm tính)
    const totalPaid = amount * $product.item?.price

    const onSubmit: SubmitHandler<Partial<Order>> = async data => {
        const date = Date.now()
        const data_item = {
            code: `FG${date}`, // Mã đơn hàng
            status: 'created', // Đã tạo
            order_items: [{
                product_id,
                amount,
                select: true
            }],
            amount,
            total,
            discount: total - totalPaid,
            pay: totalPaid,
            shipping_fee: 0,
            customer_id: fuser?.uid, // ID khách hàng
            customer_info: { // Thông tin khách hàng tạo
                name: fuser?.displayName || '',
                email: fuser?.email || '',
                img: fuser?.photoURL || ''
            },
            address_id: address_id,
            note
        } as Order
        const new_order = await transporter.add<Order, { data: { item: Order } }>(`orders`, data_item)
        const order_id = new_order.data.item.id
        const ref = `/cart/payment/${order_id}`
        router.push(ref)
        toast({
            title: 'Đặt hàng thành công !',
            description: "Vui lòng thanh toán để nhận được hàng.",
            status: 'success',
            duration: 2000,
            variant: 'subtle',
            position: 'top-right'
        })
    }

    return (
        <VStack w='full' justifyContent='center' spacing='5'>
            <DirectionalLink directional={[
                { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                { name: 'Sản phẩm', href: '/' },
                { name: `${$product.item?.code}`, href: `/products/${product_id}` },
                { name: `Tạo đơn hàng` },
            ]} />
            <AddressModal {...$address_modal} />
            <VStack w='full' maxW='2xl'>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <Stack w='full' spacing='7'>
                        {
                            active_address_modal && (
                                <AddressInfoModal
                                    onClose={() => set_active_address_modal(false)}
                                    address={$addresses}
                                    onSetAddressId={handleSetAddressId}
                                    address_id_active={address_id}
                                />
                            )
                        }
                        <Stack w='full' flexDir='row' spacing='4' border='1px' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
                            <Image boxSize="90px" src={$product.item?.image} />
                            <Stack w='full' spacing='0'>
                                <Text fontWeight='600' fontSize='18px' >{$product.item?.name}</Text>
                                <HStack fontSize='14px'>
                                    <Text>Mã sản phẩm :</Text>
                                    <Text>{$product.item?.code}</Text>
                                </HStack>
                                <Stack w='full' flexDirection={{ base: 'column', md: 'row' }} justifyContent='space-between'>
                                    <HStack>
                                        <Text fontWeight='600' color='red.500'>{$product.item?.price.toLocaleString()}đ</Text>
                                        <Text textDecoration='line-through' color='blackAlpha.700' fontSize='14px'>{$product.item?.advertising_price.toLocaleString()}đ</Text>
                                    </HStack>
                                    <Controller
                                        name="amount"
                                        control={control}
                                        render={({ field }) => (
                                            <HStack>
                                                <Button size='sm' borderRadius='10px' isDisabled={field.value <= 1} onClick={() => field.onChange(field.value - 1)} >-</Button>
                                                <Button variant='unstyled' size='sm' borderRadius='full'>{field.value}</Button>
                                                <Button size='sm' borderRadius='10px' isDisabled={field.value >= $product.item?.amount} onClick={() => field.onChange(field.value + 1)}>+</Button>
                                            </HStack>
                                        )}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                        <VStack w='full' spacing='5'>
                            <Stack w='full' spacing='3'>
                                <Text>Thông tin khách khàng</Text>
                                <UserInfo />
                            </Stack>
                            <Stack w='full' spacing='3'>
                                <Text>Thông tin nhận hàng</Text>
                                <Stack w='full' px='4' py='7' borderRadius='10px' spacing='7' border='1px' borderColor='blackAlpha.200'>
                                    <Stack w='full' spacing='4'>
                                        <Text fontSize='12px' fontWeight='600' color='blackAlpha.600'>THÔNG TIN GIAO HÀNG</Text>
                                        <Stack bg='blackAlpha.50' p='2' borderRadius='10px' spacing='1'>
                                            {
                                                $addresses.length > 0 && AddressList.map((item, i) => (
                                                    <Stack fontSize='14px' key={i} flexDir='row'>
                                                        <Text whiteSpace='nowrap'>{item.name} :</Text>
                                                        <Text fontWeight='500' color='red.500'>{item.value}</Text>
                                                    </Stack>
                                                ))
                                            }
                                        </Stack>
                                        {
                                            $addresses.length > 1 && (
                                                <Button size='sm' colorScheme='red' rightIcon={<FiChevronRight />} variant='outline' borderRadius='10px' onClick={() => set_active_address_modal(true)}>
                                                    Chọn địa chỉ khác ({$addresses.length})
                                                </Button>
                                            )
                                        }
                                        <Button size='sm' variant='outline' leftIcon={<FiPlus />} borderRadius='10px' onClick={$address_modal.onOpen}>
                                            Thêm địa chỉ mới
                                        </Button>
                                    </Stack>
                                    <Stack w='full' spacing='0'>
                                        <Text fontSize='12px' fontWeight='600' color='blackAlpha.600'> GHI CHÚ KHÁC (NẾU CÓ)</Text>
                                        <Input variant='flushed' {...register('note')} onFocus={e => e.target.select()} />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </VStack>
                        {
                            fuser && $addresses.length > 0 && (
                                <VStack
                                    p='4' w='full'
                                    spacing='5'
                                    boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                                    borderRadius='10px'
                                    pos='sticky'
                                    bottom='0'
                                    zIndex='999'
                                    bg='#FFFFFF'
                                    border='1px'
                                    borderColor='blackAlpha.200'
                                >
                                    <HStack w='full' justifyContent='space-between'>
                                        <Text fontWeight='500' color='blackAlpha.800'>Tổng tiền tạm tính</Text>
                                        <Text fontWeight='600' color='red.500' fontSize='18px'>{totalPaid.toLocaleString()}đ</Text>
                                    </HStack>
                                    <Button w='full' colorScheme='red' borderRadius='10px' type="submit">
                                        Đặt hàng và thanh toán
                                    </Button>
                                </VStack>
                            )
                        }
                    </Stack>
                </form>
            </VStack>
        </VStack>
    )
}