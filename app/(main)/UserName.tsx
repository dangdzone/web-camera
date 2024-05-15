import { FirebaseAuth } from "@/config/firebase"
import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Avatar, AvatarBadge, Button, Divider, HStack, Menu, MenuButton, MenuList, Stack, Text, VStack } from "@chakra-ui/react"
import { signOut } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaRegCircleUser } from "react-icons/fa6"
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import { RiLogoutCircleRLine } from "react-icons/ri"
export const UserName = () => {

    const { fuser } = useFirebaseUserContext()
    const router = useRouter()
    const logout = async () => {
        await signOut(FirebaseAuth)
        router.push(`/login`)
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                borderRadius='full'
                variant='ghost'
                px='0'
            >
                {<Avatar size='sm' src={fuser?.photoURL ?? 'https://www.svgrepo.com/show/382099/female-avatar-girl-face-woman-user-2.svg'} />}
            </MenuButton>
            <MenuList border='none' boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px' borderRadius='10px'>
                <Stack w='full' p='2' divider={<Divider />}>
                    <HStack w='full' pb='2' px='2'>
                        <Avatar
                            size={"lg"}
                            mr='2'
                            src={fuser?.photoURL ?? 'https://www.svgrepo.com/show/382099/female-avatar-girl-face-woman-user-2.svg'}
                        >
                            {fuser ? <AvatarBadge boxSize='1.3rem' bg='green.500' /> : <AvatarBadge boxSize='1.3rem' bg='tomato' />}
                        </Avatar>
                        <Stack w='full' spacing='0' color='black'>
                            {
                                fuser?.displayName && (
                                    <Text
                                        fontSize="sm"
                                        fontWeight="600"
                                        noOfLines={1}
                                        maxW='170px'
                                    >
                                        {fuser.displayName}
                                    </Text>
                                )
                            }
                            {
                                fuser?.email && (
                                    <Text
                                        fontSize="sm"
                                        noOfLines={1}
                                    >
                                        {fuser.email}
                                    </Text>
                                )
                            }
                        </Stack>
                    </HStack>
                    <Link href={`/user`} style={{ width: '100%' }}>
                        <Button
                            w='full'
                            leftIcon={<FaRegCircleUser />}
                            variant='ghost'
                            justifyContent='flex-start'
                        >
                            Thông tin cá nhân
                        </Button>
                    </Link>
                    <Link href={`/admin`} style={{ width: '100%' }}>
                        <Button
                            w='full'
                            leftIcon={<MdOutlineAdminPanelSettings />}
                            variant='ghost'
                            justifyContent='flex-start'
                        >
                            Admin
                        </Button>
                    </Link>
                    {
                        fuser && (
                            <Button
                                w='full'
                                leftIcon={<RiLogoutCircleRLine />}
                                onClick={logout}
                                variant='ghost'
                                justifyContent='flex-start'
                            >
                                Đăng xuất
                            </Button>
                        )
                    }
                </Stack>
            </MenuList>
        </Menu>
    )
}