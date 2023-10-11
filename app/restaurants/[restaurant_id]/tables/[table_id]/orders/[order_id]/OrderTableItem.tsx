import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { Button, IconButton, Image, Input, Tag, useNumberInput } from "@chakra-ui/react"
import { RiDeleteBinLine } from "react-icons/ri"


export const OrderTableItem = () => {


    return (
        <HStack py='2' spacing='4' w='full'>
            <Image alignSelf='flex-start' boxSize='80px' borderRadius='5px' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToDygOmQKcr4VkjRlVnULVsBCaRfM1c7rtSg&usqp=CAU' />
            <SimpleGrid w='full' spacing='2' columns={[1, 1, 2, 2]}>
                <VStack w='full' align='flex-start' spacing='2'>
                    <Text textTransform='uppercase'>Mẹt Bún Ninh Bình</Text>
                    <Tag colorScheme='red' size='sm'>174.4993 đ</Tag>
                </VStack>
                <VStack w='full' align='flex-start'>
                    <HStack>
                        <Text>Số lượng</Text>
                    </HStack>
                    <HStack>
                        <Text opacity='0.7'>Tạm tính</Text>
                        <Tag colorScheme='orange' size='sm'>174.4993 đ</Tag>
                    </HStack>
                </VStack>
            </SimpleGrid>
        </HStack>
    )
}