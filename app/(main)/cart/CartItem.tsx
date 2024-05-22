import { Cart, Product } from "@/type"
import { HStack, Stack, Text } from "@chakra-ui/layout"
import { Button, Checkbox, IconButton, Image, useToast } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"
import { useDocumentData, useLiveQueryContext } from "@livequery/react"
import Link from "next/link"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { RiDeleteBinLine } from "react-icons/ri"

export type CartItem = {
    cart: SmartQueryItem<Cart>
}

export const CartItem = ({ cart }: CartItem) => {

    const toast = useToast()
    const { transporter } = useLiveQueryContext()
    const { item: product } = useDocumentData<Product>(`products/${cart.product_id}`)
    // const $carts = useCollectionData<Cart>('carts')

    const { register, handleSubmit, watch, control, formState } = useForm<Cart>({
        defaultValues: {
            id: cart.id,
            amount: cart.amount ?? 1,
            product_id: cart.product_id,
        }
    })

    // Cập nhật lại cart khi thay đổi số lượng
    const amount = watch('amount');
    useEffect(() => {
        if (amount !== undefined) {
            const updateAmount = async () => {
                await cart.__update({ amount: amount, product_id: cart.product_id })
            }
            updateAmount()
        }
    }, [amount])

    // Thêm và cập nhật thông tin
    async function onSubmit(data: Cart) {
        if (cart) {
            cart.__update(data)
        } else {
            await transporter.add(`carts`, data)
        }
    }

    // Xóa thông tin
    function remove() {
        cart?.__remove()
        toast({
            title: 'Đã xóa !',
            description: `Sản phẩm ${product.code} đã được xóa.`,
            status: 'success',
            duration: 2000,
            variant: 'subtle',
            position: 'top-right'
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Stack w='full' flexDirection='row' spacing='4' border='1px' borderColor='blackAlpha.200' borderRadius='10px' p='4'>
                <Image maxH='100px' src={product?.image} />
                <Stack w='full'>
                    <Stack w='full' justifyContent='space-between' flexDirection='row'>
                        <Link href={`/products/${product?.id}`} style={{ width: '75%' }}>
                            <Text fontWeight='600'>{product?.name}</Text>
                        </Link>
                        <IconButton size='sm' borderRadius='10px' onClick={remove} aria-label="delete" colorScheme="red" variant='ghost' icon={<RiDeleteBinLine size='20px' />} />
                    </Stack>
                    <HStack fontSize='14px'>
                        <Text>Mã sản phẩm :</Text>
                        <Text>{product?.code}</Text>
                    </HStack>
                    <Stack flexDirection='row' justifyContent='space-between'>
                        <HStack>
                            <Text fontWeight='700' color='red.500'>{product?.price.toLocaleString()}đ</Text>
                            <Text textDecoration='line-through' color='blackAlpha.700' fontSize='14px'>{product?.advertising_price.toLocaleString()}đ</Text>
                        </HStack>
                        <Controller
                            name="amount"
                            control={control}
                            render={({ field }) => (
                                <HStack>
                                    <Button size='sm' borderRadius='10px' isDisabled={field.value == 1} onClick={() => field.onChange(field.value - 1)} >-</Button>
                                    <Button variant='unstyled' size='sm' borderRadius='full'>{field.value}</Button>
                                    <Button size='sm' borderRadius='10px' onClick={() => field.onChange(field.value + 1)}>+</Button>
                                </HStack>
                            )}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </form>
    )
}