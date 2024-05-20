'use client'
import { DirectionalLink } from "@/components/common/DirectionalLink";
import { Product } from "@/type";
import { HStack, Stack, Text } from "@chakra-ui/layout";
import { useDocumentData } from "@livequery/react";
import { useParams } from "next/navigation";
import { RiHome4Line } from "react-icons/ri";

export default function ProductIdPage() {

    const params = useParams()
    const product = useDocumentData<Product>(`products/${params.product_id}`)

    return (
        <Stack w='full' spacing='5'>
            <HStack>
                <DirectionalLink directional={[
                    { name: 'Trang chủ', href: '/', icon: <RiHome4Line /> },
                    { name: 'Sản phẩm', href: '/'},
                    { name: `${product.item?.code}`},
                ]} />
            </HStack>
            <Stack >
                <Text fontSize='18px' fontWeight='700'>{product.item?.name}</Text>
            </Stack>
        </Stack>
    )
}