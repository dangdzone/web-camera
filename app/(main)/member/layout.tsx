'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { MemberLink } from "@/components/common/MemberLink"
import { Stack, VStack } from "@chakra-ui/layout"
import { PropsWithChildren } from "react"
import { LuUser2 } from "react-icons/lu"
import { MdListAlt } from "react-icons/md"
import { RiHome2Line } from "react-icons/ri"

export default function MemberLayout({ children }: PropsWithChildren) {
    return (
        <VStack w='full' spacing='5' py='5'>
            <DirectionalLink directional={[
                { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                { name: 'Lịch sử đơn hàng' },
            ]} />
            <Stack w='full' flexDirection='row' spacing='5'>
                <Stack minW='250px'>
                    <MemberLink directional={[
                        {name: 'Tổng quan', href: '', icon: <RiHome2Line />},
                        {name: 'Lịch sử đơn hàng', href: 'orders', icon: <MdListAlt />},
                        {name: 'Tài khoản của bạn', href: 'user', icon: <LuUser2 />}
                    ]} />
                </Stack>
                {children}
            </Stack>
        </VStack>
    )
}

