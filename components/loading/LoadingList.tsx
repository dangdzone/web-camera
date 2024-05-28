
import { HStack, Skeleton, VStack } from "@chakra-ui/react"

export type LoadingList = {
    date_loading?: boolean
}

export const LoadingList = (props: LoadingList) => {
    return (
        <VStack w='full' spacing='4'>
            {
                props.date_loading && (
                    <HStack w='full'>
                        <Skeleton h='30px' w='150px' borderRadius='10px' />
                    </HStack>
                )
            }
            {
                new Array(2).fill(0).map((item, i) => (
                    <Skeleton key={i} height='65px' w='full' borderRadius='10px' />
                ))
            }
        </VStack>
    )
}