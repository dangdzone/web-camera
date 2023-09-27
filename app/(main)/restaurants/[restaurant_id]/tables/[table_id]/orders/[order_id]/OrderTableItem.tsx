import { HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout"
import { Button, IconButton, Image, Input, Tag, useNumberInput } from "@chakra-ui/react"
import { RiDeleteBinLine } from "react-icons/ri"


export const OrderTableItem = () => {

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            defaultValue: 1,
            min: 0,
        })
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        <HStack py='2' spacing='4' w='full'>
            <Image alignSelf='flex-start' boxSize='80px' borderRadius='5px' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToDygOmQKcr4VkjRlVnULVsBCaRfM1c7rtSg&usqp=CAU' />
            <HStack w='full'>
                <SimpleGrid w='full' columns={[1, 1, 2, 2]} spacing='4'>
                    <VStack w='full' align='flex-start' spacing='2'>
                        <Text textTransform='uppercase'>Mẹt Bún Ninh Bình</Text>
                        <Tag colorScheme='red' size='sm'>174.4993 đ</Tag>
                    </VStack>
                    <VStack w='full' align='flex-start'>
                        <HStack>
                            <HStack>
                                <Button size={{ base: 'sm', md: 'md' }} {...dec}>-</Button>
                                <Input size={{ base: 'sm', md: 'md' }} w='70px' {...input} />
                                <Button size={{ base: 'sm', md: 'md' }} {...inc}>+</Button>
                            </HStack>
                        </HStack>
                        <HStack>
                            <Text>Tạm tính</Text>
                            <Tag colorScheme='pink' size='sm'>174.4993 đ</Tag>
                        </HStack>
                    </VStack>
                </SimpleGrid>
                <IconButton aria-label="delete" variant='ghost' size='sm' icon={<RiDeleteBinLine />} />
            </HStack>
        </HStack>
    )
}