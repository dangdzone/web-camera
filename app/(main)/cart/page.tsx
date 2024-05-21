'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { Stack } from "@chakra-ui/layout"
import { RiHome2Line } from "react-icons/ri"

export default function CartPage() {
    return (
        <Stack w='full' spacing='5' py='5'>
            <DirectionalLink directional={[
                { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                { name: 'Giỏ hàng' },
            ]} />
            
        </Stack>
    )
}