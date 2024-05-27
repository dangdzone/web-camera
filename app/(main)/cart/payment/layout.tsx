'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { PaymentInfoLink } from "@/components/common/PaymentInfoLink"
import { VStack } from "@chakra-ui/layout"
import { PropsWithChildren } from "react"
import { RiHome2Line } from "react-icons/ri"

export default function PaymentLayout({ children }: PropsWithChildren) {

    const PaymentInfoLinkMap = [
        { name: '1. Thông tin', href: '', active: false },
        { name: '2. Thanh toán', href: '', active: true },
    ]

    return (
        <VStack w='full' spacing='5' py='5'>
            <DirectionalLink directional={[
                { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                { name: 'Giỏ hàng', href: '/cart' },
                { name: 'Thanh toán' },
            ]} />

            <VStack w='full' maxW='2xl' spacing='5'>
                <PaymentInfoLink list={PaymentInfoLinkMap} />
                {children}
            </VStack>
        </VStack>
    )
}