import { SimpleGrid, Stack } from "@chakra-ui/layout"
import { CameraItem } from "./CameraItem"


export const CameraList = () => {
    return (
        <SimpleGrid w='full' columns={[1,2, 3, 4]} spacing='4'>
            {
                new Array(10).fill(0).map((_, i) => (
                    <CameraItem key={i} />
                ))
            }
        </SimpleGrid>
    )
}