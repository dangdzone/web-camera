'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { MemberLink } from "@/components/common/MemberLink"
import { Divider, Stack, VStack } from "@chakra-ui/layout"
import { PropsWithChildren } from "react"
import { LuMapPin } from "react-icons/lu"
import { MdListAlt } from "react-icons/md"
import { RiHome2Line } from "react-icons/ri"

export default function MemberLayout({ children }: PropsWithChildren) {
    return (
        <VStack w='full' spacing='5' py='5'>
            <DirectionalLink directional={[
                { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                { name: 'Thành viên' },
            ]} />
            <Stack w='full' flexDir={{base: 'column', md: 'row'}} spacing='5'>
                <Stack minW='250px'>
                    <MemberLink directional={[
                        { name: 'Tổng quan', href: '', icon: <RiHome2Line /> },
                        { name: 'Lịch sử đơn hàng', href: 'histories', icon: <MdListAlt /> },
                        { name: 'Địa chỉ giao hàng', href: 'addresses', icon: <LuMapPin /> },
                    ]} />
                </Stack>
                <Divider height={'100%'} display={{base: 'none', md: 'flex'}} orientation='vertical' />
                <Divider display={{base: 'flex', md: 'none'}} />
                <Stack w='full'>
                    {children}
                </Stack>
            </Stack>
        </VStack>
    )
}

