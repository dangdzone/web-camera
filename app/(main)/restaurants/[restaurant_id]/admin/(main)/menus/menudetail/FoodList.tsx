import { HStack, SimpleGrid, VStack, Wrap } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { FoodItem } from "./FoodItem"
import { useState } from "react"
import { FoodModal } from "./FoodModal"



export const FoodList = () => {

    const [active_food, set_active_food] = useState<undefined | null>(null)

    return (
        <VStack w='full' spacing='5' align='flex-start'>
            {
                active_food !== null && (
                    <FoodModal onClose={() => set_active_food(null)}/>
                )
            }
            <HStack w='full' justifyContent='flex-end'>
                <Button size='sm' onClick={() => set_active_food(undefined)}>Thêm món mới</Button>
            </HStack>
            <Wrap spacing={4}>
                <Button colorScheme='red' size='sm'>Tất cả</Button>
                <Button colorScheme='red' size='sm'>Khai vị</Button>
                <Button colorScheme='red' size='sm'>Tráng miệng</Button>
            </Wrap>
            <SimpleGrid w='full' columns={[2, 2, 3, 4, 4]} spacing='4'>
                {
                    new Array(5).fill(1).map((_, i) => (
                        <FoodItem key={i} onClick={() => set_active_food(undefined)} />
                    ))
                }
            </SimpleGrid>
        </VStack>
    )
}