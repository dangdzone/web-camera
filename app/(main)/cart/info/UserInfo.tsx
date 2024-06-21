import { useFirebaseUserContext } from "@/hooks/useFirebaseUser"
import { Stack, Text } from "@chakra-ui/layout"


export const UserInfo = () => {

    const { fuser } = useFirebaseUserContext()

    return (
        <Stack w='full' p='4' borderRadius='10px' spacing={{base: '4', md: '24'}} flexDirection={{base: 'column', md: 'row'}} border='1px' borderColor='blackAlpha.200' bg='blackAlpha.50'>
            <Stack spacing='1'>
                <Text fontSize='12px' fontWeight='600' color='blackAlpha.600'>TÊN</Text>
                <Text fontWeight='500'>{fuser?.displayName}</Text>
            </Stack>
            <Stack spacing='1'>
                <Text fontSize='12px' fontWeight='600' color='blackAlpha.600'>EMAIL</Text>
                <Text fontWeight='500'>{fuser?.email}</Text>
            </Stack>
        </Stack>
    )
}