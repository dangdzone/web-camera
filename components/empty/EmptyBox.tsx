import { Box, Text, VStack } from "@chakra-ui/layout"
import { BsMenuUp } from "react-icons/bs"

export type EmptyBox = {
    boxSize?: string
}

export const EmptyBox = ({ boxSize }: EmptyBox) => {
    return (
        <VStack w='full'>
            <Box fontSize='30px' opacity='0.5'><BsMenuUp /></Box>
            <Text textAlign='center'>Không có dữ liệu</Text>
        </VStack>
    )
}