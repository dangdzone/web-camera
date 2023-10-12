import { Category } from "@/types"
import { HStack, Text } from "@chakra-ui/layout"
import { useColorMode } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"

export type CategoryItem = {
    category: SmartQueryItem<Category>
    onClick?: () => void
}

export const CategoryItem = ({ onClick, category }: CategoryItem) => {

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
            onClick={onClick}
        >
            <Text fontWeight='600'>{category.name}</Text>
        </HStack>
    )
}