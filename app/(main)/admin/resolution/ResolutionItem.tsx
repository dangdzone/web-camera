import { Resolution } from "@/type"
import { Center, Text, VStack } from "@chakra-ui/layout"
import { SmartQueryItem } from "@livequery/client"

export type ResolutionItem = {
    resolution: SmartQueryItem<Resolution>,
    onClick?: () => void
}

export const ResolutionItem = ({ resolution, onClick }: ResolutionItem) => {
    return (
        <Center
            w='full'
            minH='125px'
            borderRadius='10px'
            onClick={onClick}
            py='5' px='2'
            border='1px'
            borderColor='blackAlpha.200'
            _hover={{
                bg: 'blackAlpha.200',
            }}
            cursor='pointer'
        >
            <VStack>
                <Text fontWeight='700'>{resolution.name}</Text>
                <Text textAlign='center'>{resolution.size}</Text>
            </VStack>
        </Center>
    )
}