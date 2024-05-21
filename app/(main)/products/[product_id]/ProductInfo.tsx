import { ProductInfoList } from "@/text"
import { Center, HStack, Text } from "@chakra-ui/layout"

export type ProductInfo = {
    info: { name: string, content: string }
}

export const ProductInfo = ({ info }: ProductInfo) => {

    const info_icon = Object.entries(ProductInfoList).filter(([name_id]) => name_id == info.name)

    return (
        <HStack w='full'>
            {
                info_icon.map(([_id, { icon, name }]) => (
                    <Center key={_id} p='2' bg='blackAlpha.100' borderRadius='7px'>{icon}</Center>
                ))
            }
            <Text fontSize='15px' lineHeight='1.2' color='blackAlpha.800'>{info.content}</Text>
        </HStack>
    )
}