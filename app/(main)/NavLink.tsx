import { NavLinkList } from "@/text"
import { Box, Text, VStack } from "@chakra-ui/layout"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavLink = () => {

    const path = usePathname()
    console.log({ path })
    return (
        <VStack
            spacing='2'
            py='5'
        >
            {
                Object.entries(NavLinkList).map(([name_id, { href, icon, name }]) => {

                    const active = path.startsWith(`/${href}`)

                    return (
                        <Link key={name_id} href={`/${href}`}>
                            <VStack
                                minW='80px'
                                py='4'
                                _hover={{
                                    bg: 'blackAlpha.200',
                                    cursor: 'pointer',
                                    ...active ? { bg: 'cyan.200' } : {}
                                }}
                                key={name_id}
                                spacing='1'
                                borderRadius='15px'
                                {...active ? { bg: 'cyan.100' } : {}}
                            >
                                <Box
                                    fontSize='20px'
                                    {...active ? { color: '#0987A0' } : {
                                        color: 'blackAlpha.700'
                                    }}
                                >
                                    {icon}
                                </Box>
                                <Text
                                    fontSize='14px'
                                    textAlign='center'
                                    fontWeight='400'
                                    {...active ? { color: '#0987A0' } : {
                                        color: 'blackAlpha.700'
                                    }}
                                >
                                    {name}
                                </Text>
                            </VStack>
                        </Link>
                    )
                })
            }
        </VStack>
    )
}