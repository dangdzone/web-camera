import { Category } from "@/type"
import { Stack, Text } from "@chakra-ui/layout"
import { SmartQueryItem } from "@livequery/client"

export type CategoryItemBox = {
    category: SmartQueryItem<Category>,
}

export const CategoryItemBox = ({ category}: CategoryItemBox) => {
    return (
        <Stack
            bgImage={category.image}
            borderRadius='10px'
            minH='125px' 
            backgroundSize='cover'
            backgroundPosition='center'
            backgroundRepeat='no-repeat'
            _hover={{
                cursor: 'pointer',
                transform: 'scale(1.02)',
                transition: 'all 0.3s'
            }}
            spacing='0'
        >
            <Text p='2' fontSize='14px' color='white' fontWeight='600' bg='blackAlpha.700' borderTopRadius='10px'>{category.name}</Text>
        </Stack>
    )
}