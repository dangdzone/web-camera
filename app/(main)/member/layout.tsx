'use client'

import { DirectionalLink } from "@/components/common/DirectionalLink"
import { MemberLink } from "@/components/common/MemberLink"
import { Divider, Stack, VStack } from "@chakra-ui/layout"
import { PropsWithChildren } from "react"
import { MdListAlt } from "react-icons/md"
import { RiHome2Line } from "react-icons/ri"

export default function MemberLayout({ children }: PropsWithChildren) {
    return (
        <VStack w='full' spacing='5' py='5'>
            <DirectionalLink directional={[
                { name: 'Trang chủ', href: '/', icon: <RiHome2Line /> },
                { name: 'Thành viên' },
            ]} />
            <Stack w='full' flexDirection='row' spacing='5'>
                <Stack minW='250px'>
                    <MemberLink directional={[
                        { name: 'Tổng quan', href: '', icon: <RiHome2Line /> },
                        { name: 'Lịch sử đơn hàng', href: 'histories', icon: <MdListAlt /> },
                    ]} />
                </Stack>
                <Divider height={'100%'} orientation='vertical' />
                <Stack w='full'>
                    {children}
                </Stack>
            </Stack>
        </VStack>
    )
}

