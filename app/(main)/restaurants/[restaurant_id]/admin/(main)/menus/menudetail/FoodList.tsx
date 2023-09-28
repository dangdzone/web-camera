import { HStack, SimpleGrid, VStack, Wrap } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { FoodItem } from "./FoodItem"



export const FoodList = () => {
    return (
        <VStack w='full' spacing='5' align='flex-start'>
            <HStack w='full' justifyContent='flex-end'>
                <Button size='sm'>Thêm món mới</Button>
            </HStack>
            <Wrap spacing={4}>
                <Button colorScheme='red' size='sm'>Tất cả</Button>
                <Button colorScheme='red' size='sm'>Khai vị</Button>
                <Button colorScheme='red' size='sm'>Tráng miệng</Button>
            </Wrap>
            <SimpleGrid w='full' columns={[2, 2, 3, 4, 4]} spacing='4'>
                {
                    new Array(5).fill(1).map((_, i) => (
                        <FoodItem key={i} />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}