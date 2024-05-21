import { HStack, SimpleGrid, Stack } from "@chakra-ui/layout"
import { Skeleton } from "@chakra-ui/react"


export const MainPageLoading = () => {
    return (
        // <Stack w='full' spacing='7' py='5'>
        //     <HStack w='full'>
        //         <Skeleton w='full' height='90px' borderRadius='10px' />
        //         <Skeleton w='full' height='90px' borderRadius='10px' />
        //     </HStack>
        //     <Stack w='full' spacing='5'>
        //         <Skeleton w='10%' height='30px' borderRadius='10px' />
        //         <SimpleGrid w='full' spacing='2' columns={[2, 3, 5, 6, 7, 8]}>
        //             {
        //                 new Array(9).fill(0).map((_, i) => (
        //                     <Skeleton key={i} w='full' height='125px' borderRadius='10px' />
        //                 ))
        //             }
        //         </SimpleGrid>
        //     </Stack>
        //     <Stack w='full' spacing='5'>
        //         <Skeleton w='10%' height='30px' borderRadius='10px' />
        //         <HStack w='full' flexWrap='wrap'>
        //             {
        //                 new Array(9).fill(0).map((_, i) => (
        //                     <Skeleton key={i} w='100px' height='45px' borderRadius='10px' />
        //                 ))
        //             }
        //         </HStack>
        //     </Stack>
        // </Stack>
        <SimpleGrid w='full' spacing='4' columns={[1, 2, 3, 4]}>
            {
                new Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} w='full' height='350px' borderRadius='10px' />
                ))
            }
        </SimpleGrid>
    )
}