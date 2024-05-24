import { VStack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export type MemberLink = {
    directional: Array<{
        name: string
        href: string
        icon: JSX.Element
    }>
}

export const MemberLink = ({ directional }: MemberLink) => {

    const path = usePathname()

    return (
        <VStack w='full'>
            {
                directional.map((item, i) => {
                    const active = i == 0 ? path == '/member' : path == `/member/${item.href}`
                    return (
                        <Link key={i} href={`/member/${item.href}`} style={{ width: '100%' }}>
                            <Button
                                w='100%' leftIcon={item.icon}
                                variant='outline'
                                justifyContent='flex-start'
                                bg={active ? 'red.50' : 'white'}
                                border={active ? '1px' : '0px'}
                                borderColor={active ? 'red.500' : 'blackAlpha.300'}
                                colorScheme="red"
                                borderRadius='10px'
                            >
                                {item.name}
                            </Button>
                        </Link>
                    )
                })
            }
        </VStack>
    )
}