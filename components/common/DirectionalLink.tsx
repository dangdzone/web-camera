import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, HStack, Stack, Text } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/react"
import Link from "next/link"
import { FiChevronRight, FiChevronsRight } from "react-icons/fi"
import { MdChevronRight } from "react-icons/md"

export type DirectionalLink = {
    directional: Array<{
        name: string,
        icon?: JSX.Element,
        href?: string
    }>
}

export const DirectionalLink = ({ directional }: DirectionalLink) => {
    return (
        <HStack
            w='full' p='2'
            divider={<div><FiChevronRight style={{ marginRight: '7px' }} /></div>}
            bg='blackAlpha.100'
            borderRadius='10px'
            minW='200px'
            overflowX={{ base: 'scroll', md: 'auto' }}
        >
            {
                directional.map((item, i, arr) => {
                    return (
                        <Link href={item.href || ''} key={i}>
                            <HStack pr='7px' _hover={{ color: arr.length - 1 == i ? 'none' : '#4299E1' }}>
                                {item.icon}
                                <Text fontSize='14px' whiteSpace='nowrap'>{item.name}</Text>
                            </HStack>
                        </Link>
                    )
                })
            }
        </HStack>
    )
}