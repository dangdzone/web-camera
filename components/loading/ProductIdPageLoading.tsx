import { Stack } from "@chakra-ui/layout"
import { Skeleton } from "@chakra-ui/react"

export const ProductIdPageLoading = () => {
    return (
        <Stack w='full' spacing='5'>
            <Skeleton height='40px' borderRadius='10px' />
            <Skeleton w='40%' height='25px' borderRadius='10px' />
            <Stack w='full' flexDirection='row'>
                <Skeleton w='full' height='300px' borderRadius='10px' />
                <Stack w='full' spacing='5'>
                    <Skeleton height='25px' borderRadius='10px' />
                    <Skeleton height='60px' borderRadius='10px' />
                    <Skeleton w='50%' height='25px' borderRadius='10px' />
                    <Stack w='full'>
                        <Skeleton height='25px' borderRadius='10px' />
                        <Skeleton height='25px' borderRadius='10px' />
                        <Skeleton height='25px' borderRadius='10px' />
                        <Skeleton height='25px' borderRadius='10px' />
                    </Stack>
                </Stack>
            </Stack>
            <Stack w='full' mt='16' flexDirection='row' spacing='5'>
                <Skeleton w='full' height='200px' borderRadius='10px' />
                <Stack w='full' spacing='4'>
                    <Skeleton w='50%' height='25px' borderRadius='10px' />
                    <Skeleton height='500px' borderRadius='10px' />
                </Stack>
            </Stack>
        </Stack>
    )
}