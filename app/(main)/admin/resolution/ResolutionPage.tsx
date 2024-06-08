
import { Resolution } from "@/type"
import { Center, SimpleGrid, Stack, Text } from "@chakra-ui/layout"
import { SmartQueryItem } from "@livequery/client"
import { useCollectionData } from "@livequery/react"
import { useState } from "react"
import { ResolutionItem } from "./ResolutionItem"
import { ResolutionModal } from "./ResolutionModal"
import { FiPlus } from "react-icons/fi"
import { Skeleton } from "@chakra-ui/react"

export const ResolutionPage = () => {

    const [active_resolution, set_active_resolution] = useState<undefined | null | SmartQueryItem<Resolution>>(null)
    const $resolutions = useCollectionData<Resolution>('resolutions')

    return (
        <Stack w='full' spacing='7'>
            <Text fontWeight='700' fontSize='18px'>Độ phân giải</Text>
            {
                active_resolution !== null && (
                    <ResolutionModal resolution={active_resolution} onClose={() => set_active_resolution(null)} />
                )
            }
            <SimpleGrid spacing='4' columns={[1, 2, 4, 5, 6]}>
                {
                    $resolutions.items.map(resolution => (
                        <ResolutionItem key={resolution.id} resolution={resolution} onClick={() => set_active_resolution(resolution)} />
                    ))
                }
                {
                    $resolutions.loading ? new Array(5).fill(0).map((_, i) => (
                        <Skeleton key={i} borderRadius='10px' height='125px' />
                    )) : (
                        <Center
                            minH='125px'
                            bg='blackAlpha.50'
                            borderRadius='10px'
                            border='1px dashed'
                            borderColor='blackAlpha.200'
                            _hover={{ bg: 'blackAlpha.200' }}
                            onClick={() => set_active_resolution(undefined)}
                            cursor='pointer'
                        >
                            <FiPlus />
                        </Center>
                    )
                }

            </SimpleGrid>
        </Stack>
    )
}