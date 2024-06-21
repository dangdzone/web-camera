import { Brand } from "@/type"
import { Center, Stack, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { SmartQueryItem } from "@livequery/client"

export type BrandItem = {
    brand: SmartQueryItem<Brand>,
    onClick?: () => void
}

export const BrandItem = ({ brand, onClick }: BrandItem) => {
    return (
        <Stack
            w='full'
            minH='100px'
            onClick={onClick}
            border='1px'
            borderColor='blackAlpha.200'
            borderRadius='10px'
            spacing='0'
            cursor='pointer'
            _hover={{
                borderColor: 'blackAlpha.300'
            }}
        >
            <Text p='2' bg='blackAlpha.100' borderTopRadius='10px' fontWeight='600' >{brand.name}</Text>
            <Center w='full' h='100%'>
                <Image src={brand.image} />
            </Center>
        </Stack>
    )
}