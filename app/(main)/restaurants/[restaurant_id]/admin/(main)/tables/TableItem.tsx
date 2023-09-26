import { Box, HStack, Text } from "@chakra-ui/layout"
import { Tag, useColorMode } from "@chakra-ui/react"
import { BsCheckCircleFill } from "react-icons/bs"


export const TableItem = () => {

    const { colorMode } = useColorMode()

    return (
        <HStack
            w='full'
            p='4'
            borderRadius='10px'
            border='1px'
            borderColor={colorMode == 'dark' ? '#2F3031' : '#f0f1f1'}
            _hover={{
                bg: colorMode == 'dark' ? '#2F3031' : '#f0f1f1'
            }}
            spacing='4'
        >
            <Tag variant='outline' borderRadius='full'>1</Tag>
            <HStack w='full' justifyContent='space-between'>
                <Text fontWeight='600'>Bàn 3A</Text>
                <Box color='blue.500'>
                    <BsCheckCircleFill />
                </Box>
            </HStack>
        </HStack>
    )
}