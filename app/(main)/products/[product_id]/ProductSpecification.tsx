import { Divider, HStack, Stack, Text } from "@chakra-ui/layout"

export type ProductSpecification = {
    specification: {
        name: string,
        technicals: Array<{ name: string, content: string }>
    }
}

export const ProductSpecification = ({ specification }: ProductSpecification) => {
    return (
        <Stack w='full'>
            <Text fontWeight='600'>{specification?.name}</Text>
            <Stack w='full' border='1px' spacing='0' borderColor='blackAlpha.200' borderRadius='10px' divider={<Divider />}>
                {
                    specification?.technicals.map((technical, i, arr) => {
                        return (
                            <HStack
                                w='full'
                                key={i}
                                p='3'
                                bg={i % 2 == 0 ? 'blackAlpha.100' : 'white'}
                                borderTopRadius={i == 0 ? '10px' : '0px'}
                                borderBottomRadius={arr.length - 1 == i ? '10px' : '0px'}
                                fontSize='15px'
                            >
                                <Text w='40%' lineHeight='1.2'>{technical.name}</Text>
                                <Text w='60%' lineHeight='1.2'>{technical.content}</Text>
                            </HStack>
                        )
                    })
                }
            </Stack>
        </Stack>
    )
}