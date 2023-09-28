import { HStack, Text } from "@chakra-ui/layout"
import { useColorMode } from "@chakra-ui/react"


export const CategoryItem = () => {

    const { colorMode } = useColorMode()

    return (
        <HStack
            w='full'
            p='4'
            borderRadius='10px'
            _hover={{
                bg: colorMode == 'dark' ? '#2F3031' : '#f0f1f1'
            }}
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
            boxShadow='sm'
            cursor='pointer'
        >
            <Text>Khai vị</Text>
        </HStack>
    )
}