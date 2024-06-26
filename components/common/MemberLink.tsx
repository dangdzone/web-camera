import { Stack } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
        <Stack w='full' flexDir={{base: 'row', md: 'column'}} minW='200px' overflowX={{ base: 'scroll', md: 'auto' }}>
            {
                directional.map((item, i) => {
                    const active = i == 0 ? path == '/member' : path.startsWith(`/member/${item.href}`)
                    return (
                        <Link key={i} href={`/member/${item.href}`} style={{ width: '100%' }}>
                            <Button
                                w='100%' leftIcon={item.icon}
                                variant='outline'
                                justifyContent='flex-start'
                                bg={active ? 'red.50' : 'white'}
                                border={active ? '1px' : '0px'}
                                borderColor={active ? 'red.500' : 'blackAlpha.300'}
                                colorScheme={active ? 'red' : 'gray'}
                                borderRadius='10px'
                            >
                                {item.name}
                            </Button>
                        </Link>
                    )
                })
            }
        </Stack>
    )
}