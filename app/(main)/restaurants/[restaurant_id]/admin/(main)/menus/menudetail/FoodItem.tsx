import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Image, Tag, useColorMode } from "@chakra-ui/react"


export const FoodItem = () => {

    const { colorMode } = useColorMode()

    return (
        <VStack
            w='full'
            pb='4'
            borderRadius='10px'
            _hover={{
                bg: colorMode == 'dark' ? '#2F3031' : '#f0f1f1'
            }}
            cursor='pointer'
            // onClick={onClick}
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
            boxShadow='sm'
        >
            <Image
                borderTopRadius='10px'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToDygOmQKcr4VkjRlVnULVsBCaRfM1c7rtSg&usqp=CAU'
                maxH='200px'
                w='full'
            />
            <VStack w='full' align='flex-start' px='2' spacing='0'>
                <Text textTransform='uppercase' noOfLines={2}>Mẹt Bún Ninh Bình</Text>
                <Text fontSize='14px' opacity='0.7' noOfLines={1}>Từ vùng quê Ning Bình </Text>
            </VStack>
            <HStack w='full' px='2' justifyContent='space-between'>
                <Tag colorScheme='red'>174.4993 đ</Tag>
                <Text>100</Text>
            </HStack>
        </VStack>
    )
}